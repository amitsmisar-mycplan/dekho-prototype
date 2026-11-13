# Movie-night prototype — P0 + P1 + P2 + P3

Next.js 15 App Router, strict TypeScript, React 19, Tailwind CSS v4, motion, Zustand, lucide-react and canvas-confetti. Bricolage Grotesque, Inter and Mukta are loaded through next/font.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. New devices see the splash, then `/welcome`; finish or skip the optional name before continuing. Visit `/kit` to review the complete component gallery. Choose mood chips, tap + on sample posters, open Shortlist in the navigation, drag the sheet closed, and trigger a toast. Refresh to verify the shortlist persists. The first-visit splash lasts 900ms; clear the `dekho-splash-seen` localStorage key to replay it. Reduced-motion users skip it.

`/` is personalized Home, `/search` searches titles and people, and `/me` manages saved preferences. Desktop shows a centred 390px-wide phone (844px tall when space allows) over a drifting abstract poster wall. Smaller desktop windows shorten the frame; mobile fills the screen.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
```

The first build needs network access to download Google fonts. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_BRAND=WatchAdda` to try the alternate brand, then restart development or rebuild. Brand copy and the colour configuration live in `lib/brand.ts`; CSS token defaults are in `app/globals.css`.

## P0 scope (completed)

Original CSS illustration and gradient poster placeholders only. P0 introduced no catalog, onboarding, title routes, search, poll creation, voting, sharing or backend. P1 adds the seeded data layer and catalog lab described below. Preferences/watchlist state scaffolding and the interactive sample shortlist use Zustand localStorage persistence. Catalog access goes through lib/data/index.ts. Future poll access must go through the interface described in AGENTS.md. No poll state or data bypasses those interfaces in P0. Analytics has a console-only typed adapter; confetti is installed for the future winner reveal.

Components are in `components/ui/index.tsx`: Button, Chip, ProviderChip, PosterCard, Sheet, Toast, SectionHeader and AvatarStack. Sheets trap keyboard focus, support Escape/backdrop/close-button dismissal, and restore focus. The app shell becomes inert for the shortlist modal. Reduced motion disables springs, drift, shimmer and press scaling. Provider colours are lightened for readable text on dark surfaces.

The repository is connected to GitHub. Local previews need no credentials or external services; deployment is separate from pushing a branch.

## P0 verification

Lint, strict typecheck and production build pass. Browser walkthrough checked 390px mobile (no horizontal overflow), the 390×844 desktop frame, sample shortlist persistence across reload, mood selection, modal focus wrapping, Escape dismissal and toast feedback, with no reported browser warnings/errors. Main text and CTA contrast pairs were checked above 4.5:1. Reduced motion is implemented but not browser-emulated in this pass.

A PostCSS override patches the Next.js 15 transitive dependency without upgrading the framework major. The production dependency audit is clean; npm still reports six moderate development-only advisories stemming from typescript-eslint’s nested minimatch dependency. These do not ship in the app bundle.

## P1 — seeded catalog and data layer

Open `/kit/catalog` (also linked near the top of `/kit`). Search `panchayath`, `lapata ladies`, `Fahadh Faasil` or `Timothée Chalamet`. Select a title, choose a service, and press **Show matches** to inspect the five recommendations and offer ordering. This is a development review surface; Home and Search now provide the primary discovery experience.

The catalog has exactly 60 real title identities: 18 Hindi, 12 English, 8 Malayalam, 7 Tamil, 7 Telugu, 3 Kannada, 3 Bengali and 2 Marathi. All 10 requested providers are present. Original synopses and manually seeded metadata are included; ratings, certifications, availability, prices and season counts are **illustrative snapshots, not verified current facts**. Language arrays only assert the original language. Series director credits use a representative lead director. Homepages are fallback links, not title-specific deep links. No availability was scraped or fetched.

All catalog/provider JSON imports are confined to `lib/data/index.ts`. Its `DataSource` interface is async so a future network implementation can replace `JsonDataSource` without changing callers. It exposes the five required methods plus `listTitles`, `listProviders` and `getCatalogInfo` for discovery/attribution. Unknown titles return `null` or empty lists. Returned objects are defensive copies. Runtime validation rejects duplicate IDs/slugs, invalid metadata, missing provider references and unsafe URLs.

Search normalizes case, diacritics, whitespace and punctuation, then ranks exact title/alias/cast matches, prefixes and substrings ahead of token-level edit-distance matches. All query tokens must match. Queries are capped at 160 characters; blank queries return no results. No search dependency was added.

Similarity is deterministic:

- Genres: Jaccard overlap × 0.40.
- Languages: Jaccard overlap × 0.25.
- People: (0.5 for the same director + 0.5 × cast Jaccard overlap) × 0.25.
- Rating: matching integer rating bands (`floor(rating)`) × 0.10.

Scores are rounded to six decimals. A zero-genre-overlap pair is capped at 0.35. Recommendation lists require at least one shared genre (the cap alone cannot prevent a language-only match entering a sparse top five). The source is excluded, zero-score matches are omitted, and equal scores sort by stable ID. Reasons describe actual shared director/cast/languages/genres/rating band; they are not generated by AI. Scores are similarity signals, not predicted enjoyment percentages.

`getProviders` accepts provider IDs and orders your services first, then stream/free/rent/buy. Rent/buy remain extra-charge offers even when you subscribe to that provider. Missing deep links fall back to provider homepages. `getMoodPicks` strictly matches the mood and selected languages, then ranks included streaming/free offers ahead of alternatives and uses rating/ID to break ties. Empty language/service preferences impose no language constraint; no compatible mood/language combination returns an empty list rather than unrelated recommendations.

### Tests and optional artwork

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run seed:tmdb
```

Vitest is the test-only addition explicitly specified in P1. Tests cover seed integrity, aliases/typos/cast search, weighted ranking, explanation accuracy, stable ordering, defensive copying, provider sorting/homepage fallback, mood preferences, and safe artwork matching.

The optional importer needs Node 22.18+ (tested on Node 24). Supply `TMDB_API_KEY` through your local environment; it is never public or logged. To use a gitignored `.env.local`, run:

```sh
node --env-file=.env.local --experimental-strip-types scripts/seed-tmdb.ts
```

Without a key, the importer exits successfully without changing files. With a key it uses TMDb movie/TV search, accepts only a unique normalized-title + year + original-language match, and saves **only missing poster/backdrop paths**. Ambiguous results are skipped; a network failure leaves the catalog unchanged. Writes use a temporary file and atomic rename. Existing artwork and all other metadata are preserved. Credentials are not logged. This script is not part of build or CI and no live API import was run for P1.

`PosterCard` uses `https://image.tmdb.org/t/p/w500` when `posterPath` exists and falls back to the gradient/title on missing or failed images. The image loads lazily in the browser without server proxying. TMDb attribution is visible in the footer and catalog lab.

Importer references: [movie search](https://developer.themoviedb.org/reference/search-movie), [TV search](https://developer.themoviedb.org/reference/search-tv), [image URL format](https://developer.themoviedb.org/docs/image-basics).

### P1 verification and sample rankings

20 Vitest tests, lint, strict typecheck and production build pass. Browser checks verified `panchayath` → Panchayat, Prime Video rent/buy ordering with ₹149/₹499 sample prices and explicit extra-charge labels, no horizontal overflow at 390px, and no reported browser warnings/errors. The no-key artwork command was verified to leave the catalog unchanged. Live artwork download was not exercised.

Top five matches, in order:

| Source | Recommendations |
| --- | --- |
| Drishyam 2 (Hindi) | Article 15; Paatal Lok; Scam 1992; Andhadhun; Drishyam 2 (Malayalam) |
| Drishyam 2 (Malayalam) | Iratta; Joji; Anjaam Pathiraa; Manjummel Boys; Article 15 |
| Vikram | Kaithi; Super Deluxe; Jai Bhim; Jailer; Vinci Da |
| Knives Out | Glass Onion; Everything Everywhere All at Once; Arrival; Get Out; Severance |
| Panchayat | Kota Factory; Laapataa Ladies; 12th Fail; Badhaai Ho; Darlings |
| 12th Fail | Kota Factory; Laapataa Ladies; Panchayat; Scam 1992; Gully Boy |

The broader final matches are a visible limitation of the fixed weighted formula and this small catalog, rather than personalized recommendations.

## Pre-merge fixes

All seeded offers and provider directory records now have `verifiedAt: null`; assignments and prices are unchanged. Use [the 60-title availability checklist](scripts/availability-checklist.md) to hand-correct offers and record sources. Confirmed verification dates accept `YYYY-MM-DD`.

In `/kit/catalog`, choose Panchayat and Netflix, then **Show matches**: the lab explicitly says “Not on Netflix · streaming on Prime Video”, based on the illustrative seed. No message appears without a selected service or when any selected service has an offer (rentals still show their extra-charge label).

The scroll container now reserves the nav height plus its floating gap and the device safe-area inset, sharing the same CSS tokens as the nav. This keeps the final item clear on both mobile and the desktop phone frame.

Pre-merge validation: all 24 tests, lint, typecheck and production build pass. Browser checks confirmed the missing-service message and final footer item clearing the nav at 390px and 1280px. The safe-area inset is included in both nav position and scroll padding. The catalog selector also resets when a linked title changes, preventing stale dropdown values.


## P2 — onboarding and saved preferences

### Review the flow

1. Open `/` or `/welcome` on a fresh device. After the first-visit splash, choose any of the ten services; an empty selection is allowed.
2. Continue to language selection. Hindi and English are preselected for a fresh setup. Choose any mix, or deselect everything for no language preference.
3. Continue to the optional name and eight initial-based gradient avatars. Finish, or **Skip for now** to leave the name empty. A one-second “Ready. Chalo, kya dekhein?” screen leads to Home. Reduced-motion users get static transitions and the same readable completion screen.
4. Visit `/me` to see the saved name/avatar, services and languages. **Edit services** opens `/welcome?edit=services` with only steps 1–2. Saving returns to `/me`; name/avatar and saved lists remain unchanged. Cancel on the first edit step leaves without saving.
5. Open `/kit/catalog`. Nonempty saved services replace the service dropdown, and nonempty saved languages filter search results and recommendations. Multiple selected services are supported. Each empty preference independently exposes a fallback dropdown; selecting a fallback does not overwrite saved preferences. An explicitly inspected title can still be outside your preferred languages.

Preferences and an `onboardingComplete` flag live in the existing `dekho-prototype-v0` Zustand localStorage record. Explicit hydration prevents first-render redirects from misreading returning users. Old P0/P1 records keep their lists and preferences, gain the default avatar, and go through onboarding once. Completed users opening `/welcome` are returned to Home; the explicit edit link is the exception.

### Reset and replay

Go to `/me` → **Reset onboarding**. This clears only the onboarding completion flag and preferences, restores Hindi + English defaults, clears the splash marker, and reloads `/welcome`. **Shortlist and watchlist are preserved.** The button is also the recommended way to replay the splash; clearing all site data is unnecessary. During incomplete setup, a reload starts again at step one; draft changes are committed only on completion or **Save preferences**.

### Analytics and validation

`track()` logs `onboarding_step` (step number and setup/edit mode), `onboarding_complete` (service/language IDs, avatar ID and whether the name was skipped), and `preferences_edit`. The name itself is not included in analytics. This remains a console-only adapter.

All 34 tests, lint, strict typecheck and production build pass. Added persistence tests exercise real Zustand storage, restoration, old-record compatibility, skipping, edit/reset preservation, malformed values and per-field catalog fallback priority. Browser walkthroughs at 390px verified all three steps, default language selections, avatar/name persistence after reload, the one-second finish screen, returning-user bypass, two-step editing, fallback dropdowns, optional name skipping and reset. Saved Hindi/Malayalam preferences produced 26 catalog results; an empty-language Tamil fallback produced seven. No browser errors/warnings were reported. Desktop phone framing was also inspected. Reduced motion is implemented, but OS-level reduced-motion emulation was not part of this pass.

The preview remains local. Catalog availability/prices/ratings remain illustrative; accounts, polling and the full title experience remain later-phase work. The catalog lab now runs its data-source calls on the client to apply local preferences without introducing a backend or putting saved preferences into shareable URLs.


## P3 — Home and Search

- `/`: greeting uses device-local day/time and your first name. Five eligible hero picks advance every six seconds, with swipe, previous/next and pause controls. Reduced motion disables autoplay and poster motion. Rails snap horizontally and show actual seeded provider labels; rentals never count as subscription access.
- Tap **Laugh**, **Edge-of-seat**, **Family**, **Feel-good** or **Mind-bender** for up to four picks from `getMoodPicks`. **Put these to the group** replaces the shortlist, capped at four. Open **Shortlist** to inspect/remove titles.
- `/search`: autofocus, 120ms debounce, title and people groups, alternate spelling support and six persisted recent searches. Try `panchayath`, `Fahadh`, or an unmatched phrase. Search spans languages so an explicit title request is not hidden by preferred-language filters.
- Tap any catalog poster to open `/t/[slug]` with a shared poster transition. This is a P4 placeholder with synopsis, seeded availability and shortlist controls.
- `/me` → **Edit services**: reordered provider tiles, selected brand wash, family/phone-plan hint and **None yet, show me free stuff**. Free-only clears subscriptions; choosing a provider clears free-only. Save after the language step. Name/avatar remain unchanged. `/me` → **Reset onboarding** replays all three steps.

Free-only is persisted and applied to Home, mood picks, Search and the catalog lab. It also overrides any stale service dropdown URL. The unmodified seed has only one free title (Jersey, Telugu), so some language/mood combinations show an honest empty state and fewer than five hero picks. Availability corrections belong in the existing checklist, not invented discovery results.

Trending is a static editorial list. The conditional glass poll banner reads `getOpenPoll()` through `lib/polls`; that P3 seam returns null, so no fabricated poll is shown. Poll storage, creation, voting and live subscriptions remain future work. Posters use palette artwork unless TMDb paths have been seeded. No dependencies or backend were added.

P3 validation: lint, strict typecheck, all 42 tests and production build pass. Added tests cover included-service versus rental access, free-only filtering and migration, deterministic hero/trending choices, people grouping, greetings, recent-search persistence and shortlist limits. Browser verification covers mobile Home, mood picks into the shortlist, alias search, people results, saved recents and poster navigation. User preferences are preserved during review.


## P4 — title decisions and Home polish

Open `/t/drishyam-2`: **More like this** pins “Original Malayalam version” first. The Malayalam page derives the reverse Hindi remake link from the same `remakeOf` field. Other recommendations respect the default service toggle; the pinned version is a labelled exception. Turn the toggle off to see up to eight explainable matches. Similarity numbers remain confined to the lab.

With Netflix, Prime Video and SonyLIV saved, `/t/vikram` demonstrates “Not on your apps · streaming on Sun NXT”. `/t/oppenheimer` demonstrates Stream/Rent/Buy and INR prices; Prime rentals are explicitly extra. Watch buttons open a new tab and log `watch_click`. Provider-homepage fallbacks are disclosed.

The compact hero, TMDb score ring, group score, watch rows and recommendations come before the expandable synopsis, cast initials and personal take. Sticky shortlist/watchlist/share actions sit above navigation. Shortlist additions fly to the tray unless reduced motion is enabled. Watchlist and personal thumbs/takes persist locally. Group support means the percentage of valid votes choosing this title among local polls containing it; it is never inferred from the personal rating. With no votes it displays “No group votes yet”. The local PollStore now implements the adapter contract with BroadcastChannel notifications; poll creation/voting screens and the open-poll banner remain future work.

Share uses Web Share when available. Cancelling does nothing; unsupported/failed sharing exposes a WhatsApp link. `/t/[slug]/opengraph-image` renders a 1200×630 PNG with poster/palette, title and provider. Set `NEXT_PUBLIC_SITE_URL` to the deployment origin before a public build. Localhost links are local previews and are not reachable by friends on other devices.

Home has a + Shortlist hero action, icon/accent mood chips, larger contrast-safe eyebrows and a greeting above the hero. The availability disclaimer is retained in the footer and watch section. Eight illustrative Hindi free-tier titles were added (MX Player/ZEE5), so default Hindi/English free-only preferences have five hero picks and populated rails. See the appended availability checklist; existing provider assignments were not changed. Other language combinations can still have fewer or no matches.

Artwork import was skipped because `.env.local` and its TMDb key were absent. All artwork remains the existing palette fallback; cast circles are initials, not fetched photos. No new dependencies. P4 checks: lint, typecheck, 49 tests and production build. Browser verification covers remake pin/filter, shortlist badge, watchlist persistence and mobile layout; the generated OG PNG is checked separately at runtime.

## P4b — generated key art

`/kit` now starts with **The whole cinema wall**, one grid containing all 68 catalog titles (no pagination). Posters link to their title pages. Home, Search, the catalog lab, similar-title rails, shared-element transitions and fly-to-tray all use the same `components/poster/GeneratedPoster.tsx` renderer. The old sphere/orbit placeholder has been removed.

Each ID deterministically seeds three mesh-gradient blob positions, grain and a small motif rotation. Catalog palettes combine with the first mood’s accent. Primary genres select slashes, offset rectangles, rising circles, a horizon, rings or overlapping circles; action maps to slashes, fantasy to rings, family to circles, and other genres to the horizon. Film title lockups balance into two or three lines (single-word titles remain whole), using Bricolage Grotesque 800. Series add their actual `SERIES · S1–Sn` band. Language/year and an included-service provider-colour dot complete the poster. Rental-only access does not earn a dot.

Home and title-page backdrops reuse the same composition at 16:9, with a larger motif and smaller title. The title page masks the backdrop’s left edge behind its foreground identity. SVG grain is 7%; vignette and dark text backing keep the lockup readable. There is no artwork motion to disable; existing interaction animations still respect reduced motion.

TMDb image fields remain in the catalog for a future adapter, but are deliberately not used for rendering. No image network requests or artwork import are made, including the OG image route. The share card reuses the SVG shape layer with server-rendered text because the OG renderer cannot consume SVG text nodes. No dependencies were added; the Vitest config enables TSX rendering tests with the existing compiler.

Validation: lint, strict typecheck, all 53 tests and production build pass. Tests exercise all 68 titles, deterministic composition, mood/genre mappings, title wrapping, unique SVG definition IDs, metadata, series bands, service labels and absence of external image tags. Browser checks confirm all 68 grid entries, no horizontal overflow at 390px, text inside poster bounds, provider dots and shared-element navigation. The generated OG endpoint was checked as a 1200×630 PNG. Catalog availability and ratings remain illustrative; no content/provider assignments changed in this task.

### P4b poster refinements

Variation now independently seeds four motif anchors, 0.8–1.3 scale, −20° to +20° rotation and −35° to +35° palette hue shift. Five deep colour families (red, blue, teal, violet, gold) broaden the catalog palette; the first-mood accent is retained at lower mesh opacity. A hue bucket means colour family plus a ten-degree shift band. The regression test checks global anchor/bucket uniqueness within every primary genre, which also covers any six-card row and any ordering of that genre in the current catalog.

The fitted title lockup uses glyph-width estimates and SVG text lengths, a maximum of three lines, and ellipses when necessary. A ResizeObserver maintains at least an 18px title size at the rendered poster width. The hook-free SVG layer lives in `PosterArtwork.tsx` so the OG route can reuse the same design without browser hooks. The Family Man, Manjummel Boys, and Everything Everywhere All at Once remain complete at 138px rail width and in the mobile kit grid. Original full titles remain available to assistive technology even when a small thumbnail truncates its art text.

Corner edition numbers and visible title captions below grid/rail cards are removed; title captions are visually hidden, provider chips remain, and Search retains its text rows. `/kit` shows the updated 68-title grid. Lint, typecheck, all 58 tests and build pass. Browser checks found no overflowing title lockups across all 68 cards; the long-title OG route returns a valid 1200×630 PNG.

## P5 — shortlist and poll creation

From `/`, open a title such as `/t/aavesham`, add it to the shortlist, then choose **Find more like this**. Swipe right to add, left to skip, or up to save to your watchlist; equivalent buttons are provided. The deck stops at four. Detail pages start at the hero without the header or bottom navigation; their action bar includes a tray badge, and Back returns to the previous screen. Provider watch buttons fill each row.

Open the shortlist badge from Home or a title. Drag a grip to reorder, swipe sideways to remove, or use the labelled move/remove buttons. A fifth pick opens the “4 is plenty, yaar” swap chooser. With two to four picks, **Ask the group** opens `/poll/new`. Edit the weekday-based name, choose a deadline (or custom local date/time), and add an optional note. The live preview preserves shortlist order. **Copy link** or **Send to WhatsApp** creates one poll through PollStore with an eight-character, cryptographically random NanoID-style ID and opens `/p/[id]/result` with “Waiting for votes... 0 so far”. WhatsApp opens a composed message for the user to send.

The share URL includes a validated, encoded snapshot of the poll name, note, picks and deadline, never votes. This lets `/p/[id]` show a no-signup voting preview in a fresh browser and lets `/p/[id]/opengraph-image?poll=…` render the actual 1200×630 fanned poster image without a backend. Use the complete generated URL; an ID alone is not a remotely stored poll. Snapshot text is public to anyone with that URL. Existing local votes are preserved when a snapshot is imported again.

**Prototype limits:** votes persist in localStorage and update same-browser tabs through BroadcastChannel. Different devices do not aggregate votes yet. Localhost links cannot be opened by friends or WhatsApp crawlers; deploy and set `NEXT_PUBLIC_SITE_URL` before testing public previews. The Home open-poll banner remains stubbed, and final winner celebrations belong to the next phase. Availability remains illustrative. No dependencies or backend were added.

Validation: lint, strict typecheck, all 65 tests and production build pass. Added tests cover shortlist swapping/reordering, gesture thresholds, poll validation and IDs, Unicode share snapshots, vote preservation, deadlines and subscription cleanup. The 390px browser walkthrough verified swiping, drag reorder, removal, fifth-pick replacement, automatic deck completion, custom-deadline validation and creation from Copy link. Original preferences and the original shortlist were restored after testing. `docs/p5-waiting.png` records the created poll; `docs/p5-poll-og.png` is its rendered OG image.

### P5 OG refinements

Open `/kit/og` for 2-, 3- and 4-title previews; click any card for the full 1200×630 PNG. A dashed overlay marks the centered 630×630 crop. The posters have no overlap, stay inside that crop, and receive distinct motifs even when their genres match. Poll details use a white bold wordmark with marigold dot, a two-line name, the full title list, and an India-time deadline chip. The decorative button is removed.

The renderer embeds bundled Bricolage Grotesque 800 and Inter 400/600 TTF data from `public/fonts` (Google Fonts, accompanying OFL licenses). Next's production trace includes all three fonts, so no runtime font fetch is required. `docs/p5-poll-og.png` is the updated four-title render. Sharing and vote-storage limitations above remain unchanged. Validation: lint, typecheck, 69 tests and production build; runtime inspection of all three image variants. All 68 catalog titles retain their full text in OG poster lockups.

## P6 — vote together, pick a winner

Public `/p/[id]` and `/p/[id]/result` routes now use a separate server layout: no app-shell hydration, splash, onboarding, signup or bottom navigation. The voter route's production **First Load JS is 115 KB**, below the 120 KB target. Posters render on the server; the voter gets only the poll's options, and confetti loads only for the reveal. Normal app routes moved under the URL-transparent `(app)` route group. The title OG endpoint remains `/t/[slug]/opengraph-image`.

Each voter can thumbs-up or thumbs-down each option and edit their choice. After rating all options, they can send one optional 80-character thought for the whole poll. The first vote asks for a first name; a local browser identity remembers it across polls/tabs. Votes update through `PollStore.subscribe` and BroadcastChannel. The live tally shows up/down counts, net scores and initials avatars. Creator identity/name is captured at poll creation. **Call it** belongs to that local creator identity; deadline expiry or Call it locks further edits. The winner has the highest net score, then highest TMDb rating, then original shortlist order if both tie. No votes produces an empty result, never a fabricated winner.

### One-browser demo

1. Start at `/`, add 2–4 titles, open the shortlist and choose **Ask the group**.
2. At `/poll/new`, set a name/deadline and use **Copy link** to create the poll and open its result screen.
3. Choose **Open voter view**, tap a thumb, enter your first name, and vote on every option without another name prompt. Send an optional **Any thoughts?** message, then tap **Done** to open the live tally. A second tab showing the same result updates live.
4. Return to the result URL and append `&demo=1` (or `?demo=1` if it has no query). **Simulate friends** adds four named voters/takes at 1.5-second intervals over six seconds. It is absent without `demo=1`.
5. Tap **Call it** as the creator. The full-screen reveal pulses, zooms the winning poster, fires confetti, shows every winner take, and offers a provider-coloured Watch button. Reduced motion skips the drumroll, zoom and confetti. The X button returns to the complete tally; **Show the winner** replays the reveal.
6. **Share result** generates a 1200×630 PNG and a 1080×1920 story PNG. Supported browsers open the Web Share file sheet; download links and a WhatsApp link are also offered. WhatsApp's fallback shares a portable result URL; attach the downloaded card manually when needed. No messages are sent automatically.

The flame badge counts completed polls by the same creator with at least one overlapping voter name (trimmed and case-insensitive); it appears from the second shared night onward. Names and takes remain local unless the user chooses to share a result snapshot. Images show up to three takes in landscape/six in a story, explicitly noting additional takes in the link; the result page always shows every take for the winner. Result snapshots have their own OG image metadata and work without access to the creator's local storage.

**Still local/stubbed:** there is no server poll database, account authentication, cross-device vote aggregation or native app install. Creator checks are a prototype browser-identity check, not an authenticated permission system. The quiet **Get the app** link opens the web Home. `getOpenPoll()` for the Home banner remains a null seam. Public WhatsApp previews need deployment plus `NEXT_PUBLIC_SITE_URL`; localhost cannot be fetched by friends or WhatsApp. Availability remains illustrative.

Validation: lint, typecheck, 79 tests and production build pass. Tests cover per-title editing, net-score/TMDb tie-breaks, creator/deadline locking, input bounds, identity persistence, overlap counting, Unicode result snapshots and countdowns. Browser testing at 390px covered name-once voting, cross-tab tally updates, the six-second simulation, Call it, the complete winner-take list, and creation of both image sizes. Saved artifacts: `docs/p6-voter.png`, `docs/p6-winner.png`, `docs/p6-result-card.png`, `docs/p6-result-story.png`. The P6 branch was rebuilt on `origin/main` after P5 merged; only P6 commits remain above main.

### P6 review fixes

PR #9 was rebased with `git rebase --onto origin/main ab01e15 codex/p6-vote-results`, replaying only the P6 commit and removing duplicate P5 history. Main’s P5 OG grid remains 200×300 posters within the central 630×630 crop, without the left tagline.

Poll creation snapshots the onboarding name, falling back to “A friend”. Voter cards use 72px posters with inline thumbs; the sticky bar reports completed cards and enables Done only after all are rated. One optional poll thought is stored on the voter’s ballot and edited through Send. Older per-card takes migrate to the first non-empty take, with ratings preserved. Results show all poll thoughts once under the winner, and the winner summary reads “5 of 5 said yes” (including “said not tonight” when needed). Season labels are singular/plural on both vote and title pages.

## P8 — Supabase polls setup

1. In the project root, keep `.env.local` (ignored by Git) with your **Project URL** in `NEXT_PUBLIC_SUPABASE_URL` and your **anon/publishable key** in `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never use the service-role key. No account login or Supabase Auth is needed.
2. Open your Supabase project dashboard → **SQL Editor** → **New query**. Open `supabase/migrations/001_polls.sql` locally, copy its complete contents, paste, and **Run** as the default `postgres` role. It creates the three tables, indexes, RLS, the internal non-login RPC role, quota-protected creation and Realtime triggers in one transaction. Run it once on a project without these tables. If it reports an error, the transaction rolls back; share the error text (not credentials) before retrying.
3. Leave **Realtime public channels** enabled in the project's Realtime settings. The migration emits public Broadcast invalidations on `poll:<id>` for votes, takes and closure. No row data or private device IDs are broadcast; clients refetch the authorized poll snapshot after an event. There is no need to add sensitive tables to the Postgres Changes publication.
4. Restart the app after saving environment variables (`npm run dev`, or rebuild then `npm run start`). Supabase mode is selected only when both variables are set; otherwise `/me` shows **local demo mode**. Configured-but-unavailable Supabase never silently falls back to separate local polls.
5. After the migration, run `npm run verify:supabase` to exercise the real project with two independent device identities. The script prints only test outcomes and its disposable poll ID, never keys or private device IDs. It creates one clearly labelled verification poll and closes it after checking votes, takes, permissions and Realtime. You may delete that test poll in Table Editor afterward.

### Device identity and access

A random private UUID in localStorage is a bearer capability for this installation. It travels only in an HTTPS `x-dekho-device` request header. Public read RPCs return `this-device` for the caller's own rows and one-way hashes for everyone else; share links contain only poll IDs. Database device IDs are not exposed by public table reads or Realtime. The internal `dekho_poll_api` database role has no login and cannot bypass RLS; it is not a user account. Only the narrowly scoped RPCs are callable by the anon key. Poll creation is serialized and capped at 20 per private device per UTC day. Clearing storage creates a new identity, so this is a device-level abuse guard, not a person-level anti-bot system. Losing the creator's browser storage also loses the ability to close that poll early.

### Test on two phones

1. Deploy this branch to a publicly reachable **HTTPS** URL with both Supabase environment variables set to the same project, and set `NEXT_PUBLIC_SITE_URL` to that deployment URL. Rebuild after changing public environment variables. `localhost:3000` is only the computer itself; it is not a shareable phone URL.
2. On phone A, finish onboarding, shortlist 2–4 titles and open `/poll/new`. If your saved name is empty or a placeholder, enter your name in the inline field. Create the poll with **Copy link** or **Send to WhatsApp**. The voting URL is now just `/p/<eight-character-id>`.
3. On phone B, open that link in WhatsApp or a browser. No onboarding or signup appears. Vote on every card, give a first name on your first vote, optionally send **Any thoughts?**, then press **Done**.
4. Keep phone A's results screen open: phone B's votes and take should appear live. Edit a vote on B and verify the tally changes without adding a second voter. Returning to the same browser retains that voter's identity.
5. On A, press **Call it**. Both phones should show the same winner, and further votes/takes should be rejected. B must not have the creator's Call it control. Deadline expiry also closes voting.

For a deeper database check, `npm run verify:supabase -- --quota` runs the two-device checks and verifies the twenty-first creation is rejected. It leaves twenty clearly labelled, closed verification polls; remove only those test rows manually if desired. The normal command leaves just one. The scripts never print credentials or private device IDs.

The P8 implementation includes the existing P6 voting/results commits because P6 was not yet on `main` when this branch was started; P5 history is not duplicated. Cloud mode replaces the earlier P5/P6 local-only limits above. Existing local demo polls are not uploaded automatically: create new polls after enabling Supabase. Simulated friends remain available only in local demo mode. Home's open-poll banner remains stubbed; catalog availability is still illustrative. No catalog data changed.

Implementation references: [Supabase database functions](https://supabase.com/docs/guides/database/functions) and [Realtime Broadcast](https://supabase.com/docs/guides/realtime/broadcast).

Validation: lint, strict typecheck, 85 tests and production build pass. The voter route reports 117 KB First Load JS; Supabase is a separate lazy chunk downloaded when the cloud adapter initializes, so total cloud-session JavaScript is larger. After the manual migration, `npm run verify:supabase -- --quota` passed against the configured project: independent device votes and editable takes, public reads without private UUID disclosure, creator-only closure, complete-ballot/80-character guards, closed-poll write rejection, Realtime vote/take/closure delivery, and rejection of the twenty-first poll. The production voter/results routes also render the cloud poll from an ID-only URL, and its OG route returns a 1200×630 PNG. The check left twenty labelled, closed verification polls for optional manual cleanup. These are automated independent-client and route checks; a physical two-phone walkthrough remains the deployment acceptance check above.

## P7 — profile and polish

Open `/me` after onboarding. Edit your name and one of eight avatars, edit services/languages, browse or remove saved Watchlist titles, and open your own polls. **Open** and **Finished** groups use the same net-vote/TMDb tie-break as the result screen; finished polls show the winner or the honest no-votes state. Loading uses shimmer, failed history requests have a retry, and empty sections explain their next action.

Apply `supabase/migrations/002_my_polls.sql` after `001_polls.sql`, using **SQL Editor → New query → Run as postgres**. The new `my_polls()` RPC accepts no device ID argument: it filters `creator_device_id` using the private request-header capability and returns safe read snapshots. The configured project has this migration applied. Live verification passed for owned history, exclusion of another device's history, anonymous empty history, private-ID protection, votes/takes, Realtime and creator closure. `npm run verify:supabase` now checks this RPC too.

The brand selector reads both names from `lib/brand.ts` and changes interactive UI/share copy for this tester tab using sessionStorage. Reloads retain the selection; a fresh independent tab uses the deployment brand. Server metadata, OG cards and installed-app identity continue to use `NEXT_PUBLIC_BRAND`, so a tester switch does not rename other people's shared links. **Reset prototype** asks for confirmation and removes only this prototype's preferences, lists, searches, local polls, voter identity, private device capability, splash flag and tester brand. Shared database polls remain, but resetting loses this device's existing votes/creator controls. Unrelated origin storage is preserved.

The polish pass adds route-specific skeletons, app/public-poll error boundaries, a designed missing-poll state and closed/no-votes handling. Page/sheet/shared-poster transitions use one spring. Reduced motion disables carousel auto-advance, card tilt and confetti/reveal motion. Visible keyboard focus and 44px touch targets are enforced. Generated art has accessible image labels; image elements have alt text. Stale future-phase copy, seeded/debug labels and legacy placeholder profile names are removed from user routes; the lab remains at `/kit`.

`/manifest.webmanifest` supplies standalone install metadata, theme colour and generated 192/512px PNG icons, including a maskable icon; iOS gets a 180px icon and standalone metadata. Test **Add to Home Screen** on the HTTPS deployment. This adds install presentation, not offline voting or a service-worker cache: live polls still need a connection. Actual OS installation on a physical phone was not available in this browser environment.

### Mobile verification

Lighthouse **13.6.0**, production build on localhost, mobile simulated throttling (4× CPU), isolated Chrome profile with completed onboarding, cold page audits. The voter audit used a real open Supabase poll. The audited final run had no accessibility failures and CLS **0** on all three routes:

| Route | Performance | Accessibility |
| --- | ---: | ---: |
| `/` | 91 | 100 |
| `/t/aavesham` | 100 | 100 |
| `/p/[id]` | 100 | 100 |

Results and exact throttling/metrics are saved in `docs/audits/mobile-summary.json`. Scores vary by hardware and deployment latency; these are local lab measurements, not field performance guarantees. Home improved from 68 by deferring offscreen SVG rails, disabling speculative poster-route prefetch and avoiding unnecessary Devanagari font preloads. Sized placeholders and an initial personalized greeting avoid content shifts.

To repeat without adding audit tools to the app stack:

```sh
npm install --prefix /tmp/dekho-audit --no-save lighthouse chrome-launcher puppeteer-core
npm run build
npm run start -- --port 3001
# In another terminal; use a real, open test poll ID:
AUDIT_POLL_ID=YOUR_POLL_ID node scripts/audit-mobile.mjs
```

Use `AUDIT_ORIGIN` for another deployment, `LIGHTHOUSE_TOOLS_DIR` for another tool directory, and `CHROME_PATH` if Chrome is not auto-discovered. The script modifies only its disposable browser profile and writes a credential-free summary, never raw network headers.

Lint, strict typecheck, 90 tests and production build pass. Isolated 390×844 interaction checks covered profile editing, avatar selection, saved Watchlist, creator history, brand persistence, history network failure/retry, missing/closed poll states, reduced-motion carousel/deck/reveal, manifest/icon sizes and confirmed reset. Eight route layouts had no horizontal overflow, missing image alt text or undersized visible action targets. Screenshots: `docs/p7-profile.png`, `docs/p7-missing-poll.png`, `docs/p7-closed-poll.png`, `docs/p7-finished-poll.png`. The labelled audit polls are closed and can be removed manually. No catalog data changed. The existing Home open-poll banner remains a stub; availability remains illustrative.

## P7b — India copy and named groups

`lib/copy.ts` is the source for all authored interface copy, grouped by screen, including accessibility labels, errors, metadata and share-card text. `hinglish` is selected only when saved viewing languages include Hindi; otherwise the UI uses `indianEnglish`. Unknown public visitors and server-rendered share cards start with Indian English. Each screen has at most one optional Hinglish phrase; buttons and error messages are Hindi-free in both tones. “Paisa vasool” and “timepass” appear only in the Hinglish variants to honour the no-Hindi-in-Indian-English requirement. Film/web-series titles, synopses, proper names from the catalogue, brand names and user-entered content remain data rather than translated UI copy. Catalog data has not changed.

Review every copy entry in **`docs/copy-review.md`**. Regenerate it after editing copy with `npm run copy:review`. The table has both tones and placeholders for values inserted at runtime. npm dev/build/typecheck/test lifecycle scripts generate ignored per-screen modules in `.generated/copy` from this single source, keeping unrelated copy out of the voter bundle. The generator uses the existing TypeScript compiler; no extra dependency is required. The tests prevent literal JSX prose/labels/placeholders returning to components, check both tones and keep each screen to one optional Hinglish entry. Existing `NEXT_PUBLIC_BRAND` and the tester brand selector continue to work.

### Apply named groups

In Supabase **SQL Editor → New query**, paste the entire **`supabase/migrations/002_groups.sql`** and **Run as postgres**, after `001_polls.sql` and `002_my_polls.sql`. The requested filename intentionally also begins with `002`; these migrations are applied manually in this documented order. Do not run a numeric-version migration runner against both `002` files without first assigning unique versions.

This adds `group_name`, includes it and `createdAt` in read snapshots, replaces `create_poll` with a backwards-compatible optional final `p_group_name` argument, and updates group streaks. The existing quota, private-device ownership and RLS remain in place. Older clients can still create unnamed polls; these appear under **Earlier movie nights**, never an invented group. Existing data is retained.

At `/poll/new`, enter a group (up to 60 characters) or choose a recent chip. The latest eight distinct names persist locally; cloud-owned polls also supply recent names on a returning device. Names are trimmed, internal whitespace is collapsed, and case variants belong to the same group. `/me` groups owned polls by name and shows `College gang · 4 movie nights · last: Aavesham`, with open/finished polls beneath. The count includes completed polls with votes, not empty or still-open polls. “Last” uses the latest completion time and the existing net-vote/TMDb tie-break. Group identity is scoped to the creator: another creator's identically named group is separate.

WhatsApp's draft starts `College gang, vote for tonight’s picture 🎬` followed by the link. The app adds one emoji. The voter/result pages show the group name, result snapshots preserve it, and the streak badge uses the named group.

### Demo and validation

1. Select Malayalam + English in `/welcome?edit=services`, then check Home, Search, `/me` and `/poll/new`: there is no Hindi interface copy. Add Hindi and repeat to see the single optional Hinglish phrase per screen.
2. Shortlist two titles, open `/poll/new`, enter **College gang**, and create the poll. Return later to see the recent-group chip.
3. Vote, optionally add a thought, tap Done and Call it. Open `/me` to see the group's completed-night count and last winner. A new **Flatmates** poll stays in its own group.
4. After applying the migration, run `node scripts/verify-groups.mjs`. It checks group readback across devices, case/space matching, creator/group isolation, exclusion of empty/open polls, history and the name-length limit. It leaves six clearly labelled closed test polls for optional removal.

Lint, typecheck, 98 tests and build pass. The isolated 390px local-fallback walkthrough verified both tones, group chips, a WhatsApp draft intercepted without sending/opening it, voting, language switching and grouped finished history. Screenshots are `docs/p7b-poll-group.png` and `docs/p7b-group-history.png`. The named-groups migration was subsequently applied during P10; live verification now passes for creation/readback, group and creator isolation, history and name limits. Environment files and credentials were neither modified nor committed. The voter route is 121 KB First Load JS after generating per-screen copy modules; the earlier P6 sub-120 KB budget is not retained in this build, and the earlier P7 Lighthouse scores have not been reasserted for it.

## P10 — After the film

Run the full `supabase/migrations/003_watch_checkins.sql` in Supabase **SQL Editor → New query → Run as postgres** after the existing migrations. A check-in is unique per poll and voting device. `watched = null` means **Not yet**, `false` means **Skipped it**, and `true` requires a rating of -1 / 1 / 2. The optional take is capped at 80 characters. The private device capability and non-bypass RLS role are reused; public reads expose aliases, never private device UUIDs. Only a device that voted can write its own check-in, and only once voting has finished. Realtime broadcasts contain only invalidation IDs; results reload safe snapshots and also recover missed events by polling.

Home discovers finished polls this device voted in through `my_checkin_polls()`. Six hours after the earlier of creator closure or deadline, it asks **Did you watch {title}?**. **Not yet** snoozes that prompt for 24 hours, including in demo mode; **Skipped it** dismisses it without contributing a rating. A watched rating dismisses it and contributes to **Your groups** on the title page. That percentage now means positive post-watch ratings (up or loved), scoped to nights this device participated in, rather than pre-watch voting preferences. No votes means no winner and no check-in prompt.

The result page includes **Group verdict**, watched/loved totals out of all distinct voters, and watched takes. **Share the verdict** creates 1200×630 and 1080×1920 PNGs using the bundled display/UI fonts and generated poster art. The highest-rated take is shown first, with creation time breaking ties. Native file sharing is used where supported; otherwise downloads and a WhatsApp link are offered. WhatsApp links share the live result page; attach a downloaded image manually if desired. No messages are sent automatically. Downloading a card or invoking a share exposes **Pick the next one**, which preserves saved preferences, replaces the shortlist with three similar films, carries the group into `/poll/new`, and needs no onboarding. The user still reviews and creates the new poll.

The database resolves the same winner as the app: net thumbs, then TMDb rating, then original option order. `checkin_winner()` contains a frozen rating map from the existing catalogue; if catalogue ratings or titles change later, update that map in a new migration. No catalogue data changed in this task. Local fallback implements the same check-in flow and clears its check-ins on Reset prototype. The six-hour delay is a UI reminder delay, not a write-security restriction: demo bypass never bypasses voter ownership or poll completion.

### Demo without waiting

1. On one browser/device, shortlist at least two films and create a poll at `/poll/new`.
2. Open its voter page, enter your name and vote. Return to `/p/[id]/result` and tap **Call it** (or let its deadline expire).
3. Visit `/?demo=1`: the check-in appears immediately for that voting device. Tap **Yes**, choose **Loved it**, optionally add a line, and save. Without `demo=1`, wait six hours. **Not yet** waits another 24 hours; **Skipped it** dismisses the card.
4. Open `/p/[id]/result?demo=1`, close the winner reveal, and scroll to **Group verdict**. This route can also collect an eligible check-in. A second voting phone sees the live verdict update after saving its own response.
5. Tap **Share the verdict**, share or download a card, then **Pick the next one**. `/poll/new` opens with three similar titles and the same group. The winner's title page shows the post-watch group rating.

Run `node scripts/verify-checkins.mjs` for live checks: creates one labelled closed test poll across two isolated voting devices, verifies nonvoter rejection, finished-only writes, upsert isolation, safe aliases, winner selection, participant-only group ratings, discovery and take limits. Test polls remain for optional removal in Table Editor. The browser walkthrough intercepts WhatsApp navigation; it sends nothing. Screenshots/cards: `docs/p10-home-checkin.png`, `docs/p10-verdict.png`, `docs/p10-verdict-wide.png`, `docs/p10-verdict-story.png`.

Validation: lint, strict typecheck, **103 tests**, and production build pass. Live Supabase verification passed for the new check-in RPCs/RLS; an isolated 390×844 browser passed Home timing/demo, saving, verdict updates from a second device, both PNG dimensions, WhatsApp fallback interception, three next picks, preserved group name, creation of the next cloud poll and the title rating. Native OS share-sheet delivery was not exercised; the fallback was verified without sending messages. Voter First Load JS remains 121 KB (the existing slightly-over-120 KB limitation); no fresh Lighthouse claims. `003_watch_checkins.sql` is confirmed applied. The older `002_groups.sql` migration is also now confirmed applied: its live group verification passed. Credentials and catalogue data were not changed.

### P10 verdict-card polish and credential audit

`/kit/og` now previews **loved / liked / split** verdicts in wide and story formats. Headlines use a strict majority of watched ratings: loved first, then total positive (up + loved), otherwise split. The large stat uses all poll voters as its denominator. Attributed takes are limited to one on wide cards and two on story cards. All three next posters use the same `getSimilar(winner, 3)` call as the next-poll CTA. The winner's motif rotates away from its default/poll-first motif. Poster, headline and stat stay within the central 630×630 region of both image sizes; long lockups fit up to three lines with ellipsis when needed. Kit previews are illustrative fixtures; real shares use check-in counts and names.

Lint, typecheck, **104 tests** and production build pass. Browser checks cover all six preview images, exact output dimensions, long-content rendering and the 390px kit with no overflow. See `docs/p10-verdict-wide-screenshot.png` and `docs/p10-verdict-story.png`.

The redacted credential audit is in `docs/p10-security-audit.md`. No service-role key, database password or PostgreSQL connection string was detected in the audited tracked history. Local environment and Supabase CLI config/state are ignored. The user applied SQL in the Dashboard as postgres; the agent used only the public anon key in ignored `.env.local` for API verification, never a migration credential.

## P7c — Voice and moments

Read `docs/voice.md` for the friend-with-a-plan voice, the serious-copy boundaries, and the adaptations of the supplied ten-row starter table. `lib/copy.ts` remains the only authored copy source. `docs/copy-review.md` now exports every entry with **Context**, Indian English and Hinglish; `docs/voice-examples.md` compares 15 representative changes.

`lib/copy/moments.ts` picks three greeting and three poll-share variants for Friday evening, weekday night, weekend afternoon, late night and an everyday fallback. Boundaries use browser-local time. Each channel rotates separately in sessionStorage (memory fallback if blocked); identical templates are avoided even across context boundaries. Home changes on another visit or a new time context, not on each minute/render. Unknown users and image routes remain Indian English; saved Hindi enables Roman Hinglish in client screens and explicit WhatsApp drafts. No messages are sent by this change.

Plain actions, prices, privacy and deletion copy are retained. Errors avoid jokes, including the supplied direct Hindi vote-failure translation. An offline status now explains that a connection is needed to load films and send votes. Shimmer remains the loading treatment. Waiting counts and late-voter winners are real values; tie text describes the existing TMDb tie-break, not a non-existent coin toss. A post-watch prompt does not assume yesterday.

The wide verdict card puts the attributed take directly beneath the main stat, removes the redundant watched footer and vertical dividers, and keeps **Vote on the next one** on one line. `/kit/og` exercises the same endpoint for all three verdict variants; the story layout retains its two-take presentation. Previews are fixtures; live shares use actual check-ins.

Demo: set English only in `/welcome?edit=services`, visit Home twice for different context lines, then try an empty Shortlist, Search with no matches and `/me` with no saved films. Add Hindi and repeat. Open a poll to see the creator invitation, real progress bar, waiting/tie copy; visit a finished poll from a nonvoting browser to see the late-voter line. Use `/?demo=1` for the post-watch prompt. Open `/kit/og` and click a wide image to review the new layout. The clock must be in the relevant time window for timed lines; unit tests cover all boundaries without changing the machine clock.

Validation: lint, strict typecheck, **108 tests** and production build pass. An isolated 390px cloud browser walkthrough verified rotating Friday greetings, both voices, empty shortlist/search/profile states, offline status, real waiting counts, tie/late-voter wording, a simulated vote failure, winner copy and the wide card. Test polls were labelled and closed. Screenshots are `docs/p7c-home-english.png`, `docs/p7c-home-hinglish.png`, `docs/p7c-search-hinglish.png`, and `docs/p7c-verdict-wide.png`. No new backend or content fixtures were added outside the existing kit; no catalogue data or credentials changed. Voter First Load JS is 122 KB; the earlier sub-120 KB goal remains unmet, and no new Lighthouse score is claimed.
