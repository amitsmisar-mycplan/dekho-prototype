# P10 credential audit — 13 November 2026

No Supabase service-role key, database password or PostgreSQL connection string was detected in the audited repository/history. At baseline commit `770447f`, after fetching origin, the audit scanned all 395 unique Git blobs reachable from local refs and reflogs, including deleted historical files, and searched `git log --all --reflog -p` without printing matching lines or secret values.

| History search | Matches | Explanation |
| --- | ---: | --- |
| `service_role` | 3 | Verification scripts reject privileged keys; no service-role JWT was found. |
| `postgres://` | 0 | No PostgreSQL URI found. |
| `postgresql://` | 0 | No PostgreSQL URI found. |
| `SUPABASE_DB_PASSWORD`, `DATABASE_PASSWORD`, `DB_PASSWORD`, `PGPASSWORD` | 0 | No password-variable references/assignments found. |

JWT-looking tokens were decoded locally to inspect their role without displaying tokens. Supabase secret-key patterns, literal password assignments and database URIs were checked. No sensitive password/service-role variables were configured in `.env.local`. The only tracked environment/config file was `.env.example`, containing public branding/localhost defaults and an empty commented artwork-key example. This is a pattern/value audit, not proof that an arbitrary unlabelled string could never be a password.

`.gitignore` explicitly protects `.env.local`, all `.env*` except `.env.example`, `supabase/.temp/`, `supabase/.branches/`, `supabase/.cache/`, `supabase/.env*`, `supabase/config.toml`, and `.supabase/`. Ignore behavior was confirmed with `git check-ignore`; none of those local CLI/env files are tracked. SQL migrations remain tracked.

## Who applied the migrations

The user ran the migration SQL manually in Supabase SQL Editor, as requested, using the Dashboard's `postgres` execution role. The agent did **not** apply migrations, use a database password, use a service-role key, or store either credential. The agent cannot identify the user's Dashboard login credential or its storage from this repository.

For API verification only, the scripts read `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from ignored `.env.local` through `@next/env`. The key's JWT role was checked and is `anon`. The scripts use random per-device UUIDs with the existing capability-based RPC contract; these are not database passwords. No credential value was printed or committed. The public anon key is intentionally used by the app's browser client; authorization rests on the database policies/RPCs.
