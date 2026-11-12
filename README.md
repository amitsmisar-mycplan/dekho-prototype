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
