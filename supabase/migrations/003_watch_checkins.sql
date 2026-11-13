-- Run after 001_polls.sql, 002_my_polls.sql and 002_groups.sql, as postgres.
begin;
create table public.checkins (
 id uuid primary key default gen_random_uuid(),
 poll_id text not null references public.polls(id) on delete cascade,
 title_id text not null,
 voter_name text not null check(char_length(btrim(voter_name)) between 1 and 40),
 voter_device_id uuid not null,
 watched boolean, -- NULL = Not yet, false = Skipped it
 rating smallint check(rating in (-1,1,2)),
 take text not null default '' check(char_length(take)<=80),
 created_at timestamptz not null default now(),
 unique(poll_id,voter_device_id),
 check((watched is true and rating is not null) or (watched is not true and rating is null and take=''))
);
alter table public.checkins enable row level security;
revoke all on public.checkins from public,anon,authenticated;
grant select,insert,update on public.checkins to dekho_poll_api;
create policy checkins_read on public.checkins for select to dekho_poll_api using(true);
create policy checkins_insert on public.checkins for insert to dekho_poll_api with check(
 voter_device_id=public.poll_device_id() and exists(select 1 from public.votes v where v.poll_id=checkins.poll_id and v.voter_device_id=public.poll_device_id())
 and exists(select 1 from public.polls p where p.id=checkins.poll_id and (p.closed_at is not null or p.deadline<=now()) and checkins.title_id=any(p.title_ids)));
create policy checkins_update on public.checkins for update to dekho_poll_api using(voter_device_id=public.poll_device_id()) with check(voter_device_id=public.poll_device_id());

create function public.read_checkins(p_id text) returns jsonb language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg(jsonb_build_object('device',public.poll_device_alias(voter_device_id),'titleId',title_id,'name',voter_name,'watched',watched,'rating',rating,'take',take,'createdAt',created_at) order by created_at),'[]'::jsonb) from public.checkins where poll_id=p_id
$$;
create function public.my_checkin_polls() returns jsonb language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg(public.read_poll(p.id) order by least(p.closed_at,p.deadline) desc),'[]'::jsonb) from public.polls p
 where (p.closed_at is not null or p.deadline<=now()) and exists(select 1 from public.votes v where v.poll_id=p.id and v.voter_device_id=public.poll_device_id())
$$;

-- Frozen catalogue ratings for the same net-vote/TMDb/order tie-break as the app.
create function public.checkin_winner(p_id text) returns text language sql stable security definer set search_path='' as $$
 select choice.id from public.polls p cross join lateral unnest(p.title_ids) with ordinality choice(id,position) left join public.votes v on v.poll_id=p.id and v.title_id=choice.id where p.id=p_id group by choice.id,choice.position order by coalesce(sum(v.value),0) desc, coalesce(('{"panchayat": 8.0, "scam-1992": 8.2, "12th-fail": 8.0, "kota-factory": 8.0, "paatal-lok": 7.5, "drishyam-2": 7.8, "the-family-man": 7.8, "laapataa-ladies": 8.0, "stree-2": 6.8, "andhadhun": 7.7, "dangal": 7.9, "gully-boy": 7.3, "article-15": 7.5, "badhaai-ho": 7.2, "tumbbad": 7.5, "piku": 7.0, "masaan": 7.0, "darlings": 6.9, "oppenheimer": 8.1, "severance": 8.4, "knives-out": 7.8, "glass-onion": 7.0, "dune": 7.8, "dune-part-two": 8.2, "everything-everywhere-all-at-once": 7.8, "the-martian": 7.7, "arrival": 7.6, "get-out": 7.6, "stranger-things": 8.6, "ted-lasso": 8.4, "manjummel-boys": 7.8, "kumbalangi-nights": 8.0, "drishyam-2-malayalam": 7.6, "joji": 7.4, "anjaam-pathiraa": 7.7, "iratta": 7.0, "aavesham": 7.4, "premam": 7.4, "jailer": 6.7, "super-deluxe": 7.7, "vikram": 7.6, "kaithi": 7.5, "soorarai-pottru": 7.8, "jai-bhim": 7.5, "96": 7.6, "rrr": 7.7, "pushpa-the-rise": 7.1, "baahubali-2-the-conclusion": 7.4, "jersey": 8.0, "sita-ramam": 7.8, "mahanati": 7.6, "hit-the-first-case": 6.9, "kantara": 7.2, "k-g-f-chapter-1": 7.4, "777-charlie": 7.6, "praktan": 6.8, "belaseshe": 7.2, "vinci-da": 7.0, "sairat": 7.5, "court": 6.9, "chintu-ka-birthday": 7.0, "ramprasad-ki-tehrvi": 7.1, "qarib-qarib-singlle": 7.2, "bareilly-ki-barfi": 7.3, "nil-battey-sannata": 7.4, "mukkabaaz": 7.5, "trapped": 7.6, "axone": 7.7}'::jsonb->>choice.id)::numeric,0) desc,choice.position limit 1
$$;
create function public.checkin_on_poll(p_id text,p_watched boolean,p_rating smallint,p_take text) returns void language plpgsql security definer set search_path='' as $$
declare device uuid:=public.poll_device_id(); voter text; winner text;
begin
 perform pg_advisory_xact_lock(hashtextextended('poll:'||p_id,0));
 if not exists(select 1 from public.polls where id=p_id and (closed_at is not null or deadline<=clock_timestamp())) then raise exception 'Poll must be finished'; end if;
 select voter_name into voter from public.votes where poll_id=p_id and voter_device_id=device order by created_at desc limit 1;
 if voter is null then raise exception 'Vote on this device before checking in'; end if;
 winner:=public.checkin_winner(p_id);
 insert into public.checkins(poll_id,title_id,voter_name,voter_device_id,watched,rating,take)
 values(p_id,winner,voter,device,p_watched,p_rating,btrim(coalesce(p_take,'')))
 on conflict(poll_id,voter_device_id) do update set watched=excluded.watched,rating=excluded.rating,take=excluded.take,created_at=now();
end $$;
-- Post-watch satisfaction, not pre-watch poll preferences. Only nights this device
-- participated in contribute to "Your groups".
create or replace function public.poll_group_rating(p_title_id text) returns jsonb language sql stable security definer set search_path='' as $$
 select case when count(*)=0 then null else jsonb_build_object('votes',count(*),'percent',round(100.0*count(*) filter(where c.rating>0)/count(*))) end
 from public.checkins c where c.title_id=p_title_id and c.watched is true
 and exists(select 1 from public.votes v where v.poll_id=c.poll_id and v.voter_device_id=public.poll_device_id())
$$;
grant create on schema public to dekho_poll_api;
alter function public.read_checkins(text) owner to dekho_poll_api;
alter function public.my_checkin_polls() owner to dekho_poll_api;
alter function public.checkin_winner(text) owner to dekho_poll_api;
alter function public.checkin_on_poll(text,boolean,smallint,text) owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.read_checkins(text),public.my_checkin_polls(),public.checkin_winner(text),public.checkin_on_poll(text,boolean,smallint,text) from public,anon,authenticated;
grant execute on function public.read_checkins(text),public.my_checkin_polls(),public.checkin_on_poll(text,boolean,smallint,text) to anon,authenticated;
create trigger checkin_changed after insert or update on public.checkins for each row execute function public.notify_poll_change();
notify pgrst,'reload schema';
commit;
