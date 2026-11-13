-- Run this entire file once in the Supabase SQL editor. No Supabase Auth is used.
-- Device UUIDs are private bearer capabilities, NEVER public identity fields.
-- A non-login database role lets the RPCs remain subject to RLS.
begin;

do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'dekho_poll_api') then
    create role dekho_poll_api nologin noinherit nobypassrls;
  end if;
end $$;
grant dekho_poll_api to postgres;
grant usage on schema public to dekho_poll_api;
grant create on schema public to dekho_poll_api; -- needed for function ownership; revoked below

create table public.polls (
  id text primary key check (id ~ '^[A-Za-z0-9_-]{8}$'),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  note text not null default '' check (char_length(note) <= 240),
  creator_name text not null check (char_length(btrim(creator_name)) between 1 and 40),
  creator_device_id uuid not null,
  title_ids text[] not null check (cardinality(title_ids) between 2 and 4),
  deadline timestamptz not null,
  closed_at timestamptz,
  created_at timestamptz not null default now()
);
create index polls_creator_day on public.polls (creator_device_id, created_at);
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id text not null references public.polls(id) on delete cascade,
  voter_name text not null check (char_length(btrim(voter_name)) between 1 and 40),
  voter_device_id uuid not null,
  title_id text not null,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  unique (poll_id, voter_device_id, title_id)
);
create table public.takes (
  id uuid primary key default gen_random_uuid(),
  poll_id text not null references public.polls(id) on delete cascade,
  voter_name text not null check (char_length(btrim(voter_name)) between 1 and 40),
  voter_device_id uuid not null,
  text text not null check (char_length(text) <= 80),
  created_at timestamptz not null default now(),
  unique (poll_id, voter_device_id)
);

create function public.poll_device_id() returns uuid language plpgsql stable
set search_path = '' as $$
declare value text;
begin
  value := nullif(current_setting('request.headers', true), '')::jsonb ->> 'x-dekho-device';
  if value is null or value !~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then return null; end if;
  return value::uuid;
end $$;
create function public.poll_device_alias(device uuid) returns text language sql stable
set search_path = '' as $$
  select case when device = public.poll_device_id() then 'this-device'
    else encode(sha256(convert_to(device::text, 'UTF8')), 'hex') end
$$;
create function public.poll_is_open(p_id text) returns boolean language sql stable
set search_path = '' as $$
  select exists(select 1 from public.polls where id = p_id and closed_at is null and deadline > now())
$$;

alter table public.polls enable row level security;
alter table public.votes enable row level security;
alter table public.takes enable row level security;
-- No direct browser access: public read RPCs below expose only safe aliases.
revoke all on public.polls, public.votes, public.takes from public, anon, authenticated;
grant select, insert on public.polls to dekho_poll_api;
grant update (closed_at) on public.polls to dekho_poll_api;
grant select, insert, update on public.votes, public.takes to dekho_poll_api;
create policy polls_read on public.polls for select to dekho_poll_api using (true);
create policy polls_create on public.polls for insert to dekho_poll_api with check (creator_device_id = public.poll_device_id() and deadline > now() and closed_at is null);
create policy polls_close on public.polls for update to dekho_poll_api using (creator_device_id = public.poll_device_id()) with check (creator_device_id = public.poll_device_id());
create policy votes_read on public.votes for select to dekho_poll_api using (true);
create policy votes_insert on public.votes for insert to dekho_poll_api with check (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id) and title_id = any ((select title_ids from public.polls where id = poll_id)::text[]));
create policy votes_update on public.votes for update to dekho_poll_api using (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id)) with check (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id) and title_id = any ((select title_ids from public.polls where id = poll_id)::text[]));
create policy takes_read on public.takes for select to dekho_poll_api using (true);
create policy takes_insert on public.takes for insert to dekho_poll_api with check (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id));
create policy takes_update on public.takes for update to dekho_poll_api using (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id)) with check (voter_device_id = public.poll_device_id() and public.poll_is_open(poll_id));

create function public.read_poll(p_id text) returns jsonb language plpgsql security definer
set search_path = '' as $$
declare p public.polls; ballots jsonb;
begin
  select * into p from public.polls where id = p_id;
  if not found then return null; end if;
  select coalesce(jsonb_object_agg(public.poll_device_alias(b.voter_device_id), jsonb_build_object(
    'name', b.voter_name, 'take', coalesce(t.text, ''), 'ratings', b.ratings)), '{}'::jsonb)
  into ballots from (
    select voter_device_id, max(voter_name) as voter_name,
      jsonb_object_agg(title_id, jsonb_build_object('score', value)) as ratings
    from public.votes where poll_id = p_id group by voter_device_id
  ) b left join public.takes t on t.poll_id = p_id and t.voter_device_id = b.voter_device_id;
  return jsonb_build_object('id', p.id, 'name', p.name, 'note', p.note, 'titleIds', p.title_ids,
    'deadline', p.deadline, 'closedAt', p.closed_at, 'expectedVoters', 0, 'votes', '{}'::jsonb,
    'creator', jsonb_build_object('id', public.poll_device_alias(p.creator_device_id), 'name', p.creator_name),
    'ballots', ballots);
end $$;

create function public.create_poll(p_id text, p_name text, p_note text, p_creator_name text, p_title_ids text[], p_deadline timestamptz)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare device uuid := public.poll_device_id(); start_day timestamptz := date_trunc('day', now() at time zone 'UTC') at time zone 'UTC';
begin
  if device is null then raise exception 'A device identity is required'; end if;
  if p_creator_name is null or btrim(p_creator_name) = '' or lower(btrim(p_creator_name)) in ('watchtogether', 'a friend', 'your friend') then raise exception 'Please enter your name'; end if;
  if p_title_ids is null or cardinality(p_title_ids) not between 2 and 4 or (select count(distinct x) from unnest(p_title_ids) x) <> cardinality(p_title_ids) or exists(select 1 from unnest(p_title_ids) x where x is null or x !~ '^[a-z0-9-]{1,100}$') then raise exception 'Choose two to four distinct titles'; end if;
  if p_deadline is null or p_deadline <= now() then raise exception 'Choose a future deadline'; end if;
  -- Serialize this device's creates so concurrent calls cannot pass the quota together.
  perform pg_advisory_xact_lock(hashtextextended(device::text, 0));
  if (select count(*) from public.polls where creator_device_id = device and created_at >= start_day) >= 20 then
    raise exception '20 polls per device per day. Try again tomorrow (UTC).';
  end if;
  insert into public.polls(id, name, note, creator_name, creator_device_id, title_ids, deadline)
    values(p_id, btrim(p_name), coalesce(p_note, ''), btrim(p_creator_name), device, p_title_ids, p_deadline);
  return public.read_poll(p_id);
end $$;

create function public.vote_on_poll(p_id text, p_title_id text, p_voter_name text, p_value smallint)
returns void language plpgsql security definer set search_path = '' as $$
declare p public.polls; device uuid := public.poll_device_id();
begin
  -- Serialize votes/takes with closure. Deadline is evaluated AFTER acquiring the lock.
  perform pg_advisory_xact_lock(hashtextextended('poll:' || p_id, 0));
  select * into p from public.polls where id = p_id;
  if not found or p.closed_at is not null or p.deadline <= clock_timestamp() then raise exception 'Voting is closed'; end if;
  if device is null then raise exception 'A device identity is required'; end if;
  if p_title_id is null or not (p_title_id = any(p.title_ids)) then raise exception 'Unknown poll option'; end if;
  insert into public.votes(poll_id, voter_name, voter_device_id, title_id, value)
    values(p_id, btrim(p_voter_name), device, p_title_id, p_value)
    on conflict(poll_id, voter_device_id, title_id) do update set value = excluded.value, voter_name = excluded.voter_name;
end $$;
create function public.take_on_poll(p_id text, p_text text) returns void language plpgsql security definer set search_path = '' as $$
declare p public.polls; device uuid := public.poll_device_id(); voter text;
begin
  perform pg_advisory_xact_lock(hashtextextended('poll:' || p_id, 0));
  select * into p from public.polls where id = p_id;
  if not found or p.closed_at is not null or p.deadline <= clock_timestamp() then raise exception 'Voting is closed'; end if;
  if device is null then raise exception 'A device identity is required'; end if;
  if (select count(*) from public.votes where poll_id = p_id and voter_device_id = device) <> cardinality(p.title_ids) then raise exception 'Vote on every pick first'; end if;
  select voter_name into voter from public.votes where poll_id = p_id and voter_device_id = device order by created_at desc limit 1;
  insert into public.takes(poll_id, voter_name, voter_device_id, text) values(p_id, voter, device, btrim(p_text))
    on conflict(poll_id, voter_device_id) do update set text = excluded.text, voter_name = excluded.voter_name;
end $$;
create function public.close_poll(p_id text) returns void language plpgsql security definer set search_path = '' as $$
declare p public.polls;
begin
  perform pg_advisory_xact_lock(hashtextextended('poll:' || p_id, 0));
  select * into p from public.polls where id = p_id;
  if not found or public.poll_device_id() is null or p.creator_device_id <> public.poll_device_id() then raise exception 'Only the creator can call it'; end if;
  update public.polls set closed_at = coalesce(closed_at, clock_timestamp()) where id = p_id;
end $$;
create function public.poll_streak(p_id text) returns integer language sql stable security definer set search_path = '' as $$
  select count(*)::integer from public.polls p join public.polls current_poll on current_poll.id = p_id and p.creator_device_id = current_poll.creator_device_id
  where (p.closed_at is not null or p.deadline <= now()) and exists (
    select 1 from public.votes a join public.votes b on lower(btrim(a.voter_name)) = lower(btrim(b.voter_name))
    where a.poll_id = p.id and b.poll_id = p_id)
$$;
create function public.poll_group_rating(p_title_id text) returns jsonb language sql stable security definer set search_path = '' as $$
  select case when count(*) = 0 then null else jsonb_build_object('votes', count(*), 'percent', round(100.0 * count(*) filter(where value = 1) / count(*))) end
  from public.votes where title_id = p_title_id
$$;

-- Definer RPCs use a NON-OWNER/NON-BYPASSRLS role; the policies above really apply.
alter function public.read_poll(text) owner to dekho_poll_api;
alter function public.create_poll(text,text,text,text,text[],timestamptz) owner to dekho_poll_api;
alter function public.vote_on_poll(text,text,text,smallint) owner to dekho_poll_api;
alter function public.take_on_poll(text,text) owner to dekho_poll_api;
alter function public.close_poll(text) owner to dekho_poll_api;
alter function public.poll_streak(text) owner to dekho_poll_api;
alter function public.poll_group_rating(text) owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.poll_device_id(), public.poll_device_alias(uuid), public.poll_is_open(text) from public, anon, authenticated;
grant execute on function public.poll_device_id(), public.poll_device_alias(uuid), public.poll_is_open(text) to dekho_poll_api;
revoke all on function public.read_poll(text), public.create_poll(text,text,text,text,text[],timestamptz), public.vote_on_poll(text,text,text,smallint), public.take_on_poll(text,text), public.close_poll(text), public.poll_streak(text), public.poll_group_rating(text) from public, anon, authenticated;
grant execute on function public.read_poll(text), public.create_poll(text,text,text,text,text[],timestamptz), public.vote_on_poll(text,text,text,smallint), public.take_on_poll(text,text), public.close_poll(text), public.poll_streak(text), public.poll_group_rating(text) to anon, authenticated;
-- read_poll is also invoked by create_poll under the internal role.
grant execute on function public.read_poll(text) to dekho_poll_api;

-- Only invalidation events enter Realtime. Never broadcast rows containing device UUIDs.
create function public.notify_poll_change() returns trigger language plpgsql security definer set search_path = '' as $$
declare poll_id text;
begin
  if tg_table_name = 'polls' then poll_id := new.id; else poll_id := new.poll_id; end if;
  perform realtime.send(jsonb_build_object('poll_id', poll_id), tg_table_name, 'poll:' || poll_id, false);
  return new;
end $$;
revoke all on function public.notify_poll_change() from public, anon, authenticated;
create trigger poll_changed after update on public.polls for each row execute function public.notify_poll_change();
create trigger vote_changed after insert or update on public.votes for each row execute function public.notify_poll_change();
create trigger take_changed after insert or update on public.takes for each row execute function public.notify_poll_change();
notify pgrst, 'reload schema';
commit;
