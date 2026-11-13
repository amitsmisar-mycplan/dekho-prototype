-- Run as postgres after 003_watch_checkins.sql. No credentials belong in this file.
begin;
alter table public.polls add column if not exists toss boolean not null default false;
alter table public.polls add column if not exists winner_id text;
alter table public.polls add constraint polls_toss_winner check
 ((not toss and winner_id is null) or (toss and winner_id is not null and winner_id = any(title_ids) and closed_at is not null));
grant update (toss, winner_id) on public.polls to dekho_poll_api;
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
    'ballots', ballots, 'toss', p.toss, 'winnerId', p.winner_id);
end $$;
create or replace function public.checkin_winner(p_id text) returns text language sql stable security definer set search_path='' as $$
 select coalesce((select winner_id from public.polls where id=p_id and toss), (select choice.id from public.polls p cross join lateral unnest(p.title_ids) with ordinality choice(id,position) left join public.votes v on v.poll_id=p.id and v.title_id=choice.id where p.id=p_id group by choice.id,choice.position order by coalesce(sum(v.value),0) desc, coalesce(('{"panchayat": 8.0, "scam-1992": 8.2, "12th-fail": 8.0, "kota-factory": 8.0, "paatal-lok": 7.5, "drishyam-2": 7.8, "the-family-man": 7.8, "laapataa-ladies": 8.0, "stree-2": 6.8, "andhadhun": 7.7, "dangal": 7.9, "gully-boy": 7.3, "article-15": 7.5, "badhaai-ho": 7.2, "tumbbad": 7.5, "piku": 7.0, "masaan": 7.0, "darlings": 6.9, "oppenheimer": 8.1, "severance": 8.4, "knives-out": 7.8, "glass-onion": 7.0, "dune": 7.8, "dune-part-two": 8.2, "everything-everywhere-all-at-once": 7.8, "the-martian": 7.7, "arrival": 7.6, "get-out": 7.6, "stranger-things": 8.6, "ted-lasso": 8.4, "manjummel-boys": 7.8, "kumbalangi-nights": 8.0, "drishyam-2-malayalam": 7.6, "joji": 7.4, "anjaam-pathiraa": 7.7, "iratta": 7.0, "aavesham": 7.4, "premam": 7.4, "jailer": 6.7, "super-deluxe": 7.7, "vikram": 7.6, "kaithi": 7.5, "soorarai-pottru": 7.8, "jai-bhim": 7.5, "96": 7.6, "rrr": 7.7, "pushpa-the-rise": 7.1, "baahubali-2-the-conclusion": 7.4, "jersey": 8.0, "sita-ramam": 7.8, "mahanati": 7.6, "hit-the-first-case": 6.9, "kantara": 7.2, "k-g-f-chapter-1": 7.4, "777-charlie": 7.6, "praktan": 6.8, "belaseshe": 7.2, "vinci-da": 7.0, "sairat": 7.5, "court": 6.9, "chintu-ka-birthday": 7.0, "ramprasad-ki-tehrvi": 7.1, "qarib-qarib-singlle": 7.2, "bareilly-ki-barfi": 7.3, "nil-battey-sannata": 7.4, "mukkabaaz": 7.5, "trapped": 7.6, "axone": 7.7}'::jsonb->>choice.id)::numeric,0) desc,choice.position limit 1))
$$;

-- The same lock serialises votes, closure, check-ins and the once-only toss.
create function public.toss_poll(p_id text) returns jsonb language plpgsql security definer set search_path='' as $$
declare p public.polls; candidates text[]; chosen text;
begin
 perform pg_advisory_xact_lock(hashtextextended('poll:'||p_id,0));
 select * into p from public.polls where id=p_id;
 if not found or p.creator_device_id is distinct from public.poll_device_id() then raise exception 'Only the creator can toss'; end if;
 if p.toss then return public.read_poll(p_id); end if;
 if exists(select 1 from public.checkins where poll_id=p_id) then raise exception 'A check-in has already been saved'; end if;
 if not exists(select 1 from public.votes where poll_id=p_id) then raise exception 'No votes yet'; end if;
 with scores as (
  select c.id, coalesce(sum(v.value),0) as score from unnest(p.title_ids) c(id)
  left join public.votes v on v.poll_id=p_id and v.title_id=c.id group by c.id
 ) select array_agg(id order by id) into candidates from scores where score=(select max(score) from scores);
 if cardinality(candidates)<2 then raise exception 'There is no tie'; end if;
 chosen:=candidates[1+floor(random()*cardinality(candidates))::integer];
 update public.polls set toss=true,winner_id=chosen,closed_at=coalesce(closed_at,clock_timestamp()) where id=p_id;
 return public.read_poll(p_id);
end $$;
grant create on schema public to dekho_poll_api;
alter function public.toss_poll(text) owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.toss_poll(text) from public,anon,authenticated;
grant execute on function public.toss_poll(text) to anon,authenticated;
notify pgrst,'reload schema';
commit;
