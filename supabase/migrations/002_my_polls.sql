-- Run after 001_polls.sql in Supabase SQL Editor as postgres.
-- The private header capability determines ownership; callers cannot supply another ID.
begin;
create or replace function public.my_polls() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(public.read_poll(p.id) order by p.created_at desc), '[]'::jsonb)
  from public.polls p
  where p.creator_device_id = public.poll_device_id()
$$;
grant create on schema public to dekho_poll_api;
alter function public.my_polls() owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.my_polls() from public, anon, authenticated;
grant execute on function public.my_polls() to anon, authenticated;
notify pgrst, 'reload schema';
commit;
