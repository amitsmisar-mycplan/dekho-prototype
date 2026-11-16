-- Run manually as postgres AFTER 005_availability_guard.sql.
-- The requested 005 prefix is shared; these files are applied manually, not by CLI version order.
begin;
create table public.availability_reports (
 id uuid primary key default gen_random_uuid(),
 title_id text not null check(title_id ~ '^[a-z0-9-]{1,100}$'),
 provider_id text check(provider_id ~ '^[a-z0-9-]{1,100}$'),
 reason text not null check(reason in ('could_not_play','wrong_app','wrong_language','free_elsewhere')),
 note text not null default '' check(char_length(note)<=500),
 device_id uuid not null,
 tester_tag text not null default '' check(char_length(tester_tag)<=40),
 created_at timestamptz not null default now()
);
alter table public.availability_reports enable row level security;
revoke all on public.availability_reports from anon,authenticated;
grant insert on public.availability_reports to dekho_poll_api;
create policy report_own_device on public.availability_reports for insert to dekho_poll_api
 with check(device_id=public.poll_device_id());
-- Reports and private device capabilities are not publicly readable.
create function public.report_availability(p_title_id text,p_provider_id text,p_reason text,p_note text default '',p_tester_tag text default '')
returns void language plpgsql security definer set search_path='' as $$
declare device uuid:=public.poll_device_id();
begin
 if device is null then raise exception 'A device identity is required'; end if;
 insert into public.availability_reports(title_id,provider_id,reason,note,device_id,tester_tag)
 values(p_title_id,p_provider_id,p_reason,btrim(p_note),device,btrim(p_tester_tag));
end $$;
grant create on schema public to dekho_poll_api;
alter function public.report_availability(text,text,text,text,text) owner to dekho_poll_api;
revoke create on schema public from dekho_poll_api;
revoke all on function public.report_availability(text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.report_availability(text,text,text,text,text) to anon,authenticated;
-- Extend the existing insert-only guard; preserve historical polls and results.
create or replace function public.guard_poll_availability() returns trigger
language plpgsql set search_path='' as $$
begin
 if new.title_ids && array['article-15','praktan','super-deluxe','ramprasad-ki-tehrvi','belaseshe','court']::text[] then
  raise exception 'A poll title is not streaming in India';
 end if;
 return new;
end $$;
notify pgrst,'reload schema';
commit;
