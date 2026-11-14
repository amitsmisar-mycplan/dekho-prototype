-- Run as postgres. Existing polls and their results are preserved.
-- Catalogue corrections must also guard direct RPC calls from stale clients.
begin;
create or replace function public.guard_poll_availability() returns trigger
language plpgsql set search_path='' as $$
begin
 if new.title_ids && array['article-15','praktan','super-deluxe','ramprasad-ki-tehrvi']::text[] then
  raise exception 'A poll title is not streaming in India';
 end if;
 return new;
end $$;
revoke all on function public.guard_poll_availability() from public,anon,authenticated;
create trigger poll_availability_guard before insert on public.polls
for each row execute function public.guard_poll_availability();
commit;
