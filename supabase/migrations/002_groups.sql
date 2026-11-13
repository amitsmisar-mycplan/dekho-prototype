-- Run after 001_polls.sql and 002_my_polls.sql. The filename is requested;
-- these files are applied manually, not by a numeric-version migration runner.
begin;
alter table public.polls add column if not exists group_name text not null default '' check (char_length(group_name) <= 60);
create index if not exists polls_creator_group on public.polls (creator_device_id, lower(group_name), created_at desc);
-- Remove the old signature to avoid PostgREST overload ambiguity. The new optional
-- final argument keeps older six-argument clients working with unnamed groups.
drop function public.create_poll(text,text,text,text,text[],timestamptz);
create or replace function public.read_poll(p_id text) returns jsonb language plpgsql security definer
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
    'groupName', p.group_name, 'createdAt', p.created_at, 'deadline', p.deadline, 'closedAt', p.closed_at, 'expectedVoters', 0, 'votes', '{}'::jsonb,
    'creator', jsonb_build_object('id', public.poll_device_alias(p.creator_device_id), 'name', p.creator_name),
    'ballots', ballots);
end $$;

create function public.create_poll(p_id text, p_name text, p_note text, p_creator_name text, p_title_ids text[], p_deadline timestamptz, p_group_name text default '')
returns jsonb language plpgsql security definer set search_path = '' as $$
declare device uuid := public.poll_device_id(); start_day timestamptz := date_trunc('day', now() at time zone 'UTC') at time zone 'UTC';
begin
  if char_length(btrim(coalesce(p_group_name, ''))) > 60 then raise exception 'Group name must be 60 characters or fewer'; end if;
  if device is null then raise exception 'A device identity is required'; end if;
  if p_creator_name is null or btrim(p_creator_name) = '' or lower(btrim(p_creator_name)) in ('watchtogether', 'a friend', 'your friend') then raise exception 'Please enter your name'; end if;
  if p_title_ids is null or cardinality(p_title_ids) not between 2 and 4 or (select count(distinct x) from unnest(p_title_ids) x) <> cardinality(p_title_ids) or exists(select 1 from unnest(p_title_ids) x where x is null or x !~ '^[a-z0-9-]{1,100}$') then raise exception 'Choose two to four distinct titles'; end if;
  if p_deadline is null or p_deadline <= now() then raise exception 'Choose a future deadline'; end if;
  -- Serialize this device's creates so concurrent calls cannot pass the quota together.
  perform pg_advisory_xact_lock(hashtextextended(device::text, 0));
  if (select count(*) from public.polls where creator_device_id = device and created_at >= start_day) >= 20 then
    raise exception '20 polls per device per day. Try again tomorrow (UTC).';
  end if;
  insert into public.polls(id, name, note, creator_name, creator_device_id, title_ids, deadline, group_name)
    values(p_id, btrim(p_name), coalesce(p_note, ''), btrim(p_creator_name), device, p_title_ids, p_deadline, regexp_replace(btrim(coalesce(p_group_name, '')), '\s+', ' ', 'g'));
  return public.read_poll(p_id);
end $$;


create or replace function public.poll_streak(p_id text) returns integer language sql stable security definer set search_path = '' as $$
 select count(*)::integer from public.polls p
 join public.polls current_poll on current_poll.id = p_id and p.creator_device_id = current_poll.creator_device_id
 where lower(btrim(p.group_name)) = lower(btrim(current_poll.group_name))
 and (p.closed_at is not null or p.deadline <= now())
 and exists (select 1 from public.votes v where v.poll_id = p.id)
$$;
grant create on schema public to dekho_poll_api;
alter function public.create_poll(text,text,text,text,text[],timestamptz,text) owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.create_poll(text,text,text,text,text[],timestamptz,text) from public, anon, authenticated;
grant execute on function public.create_poll(text,text,text,text,text[],timestamptz,text) to anon, authenticated;
notify pgrst, 'reload schema';
commit;
