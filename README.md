# Movie-night prototype — P0 + P1

Next.js 15 App Router, strict TypeScript, React 19, Tailwind CSS v4, motion, Zustand, lucide-react and canvas-confetti. Bricolage Grotesque, Inter and Mukta are loaded through next/font.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Visit `/kit` to review the complete component gallery. Choose mood chips, tap + on sample posters, open Shortlist in the navigation, drag the sheet closed, and trigger a toast. Refresh to verify the shortlist persists. The first-visit splash lasts 900ms; clear the `dekho-splash-seen` localStorage key to replay it. Reduced-motion users skip it.

`/` is the foundation preview; `/search` and `/me` are explicitly labelled future-feature states. Desktop shows a centred 390px-wide phone (844px tall when space allows) over a drifting abstract poster wall. Smaller desktop windows shorten the frame; mobile fills the screen.

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

No remote is configured, so this checkout has no pull request or deployment. No credentials or external services are needed for P0.

## P0 verification

Lint, strict typecheck and production build pass. Browser walkthrough checked 390px mobile (no horizontal overflow), the 390×844 desktop frame, sample shortlist persistence across reload, mood selection, modal focus wrapping, Escape dismissal and toast feedback, with no reported browser warnings/errors. Main text and CTA contrast pairs were checked above 4.5:1. Reduced motion is implemented but not browser-emulated in this pass.

A PostCSS override patches the Next.js 15 transitive dependency without upgrading the framework major. The production dependency audit is clean; npm still reports six moderate development-only advisories stemming from typescript-eslint’s nested minimatch dependency. These do not ship in the app bundle.

## P1 — seeded catalog and data layer

Open `/kit/catalog` (also linked near the top of `/kit`). Search `panchayath`, `lapata ladies`, `Fahadh Faasil` or `Timothée Chalamet`. Select a title, choose a service, and press **Show matches** to inspect the five recommendations and offer ordering. This is a development review surface; `/search`, onboarding and the full title screen remain later tasks.

The catalog has exactly 60 real title identities: 18 Hindi, 12 English, 8 Malayalam, 7 Tamil, 7 Telugu, 3 Kannada, 3 Bengali and 2 Marathi. All 10 requested providers are present. Original synopses and manually seeded metadata are included; ratings, certifications, availability, prices and season counts are **illustrative snapshots, not verified current facts**. Language arrays only assert the original language. Series director credits use a representative lead director. Homepages are fallback links, not title-specific deep links. No availability was scraped or fetched.

All catalog/provider JSON imports are confined to `lib/data/index.ts`. Its `DataSource` interface is async so a future network implementation can replace `JsonDataSource` without changing callers. It exposes the five required methods plus `listTitles`, `listProviders` and `getCatalogInfo` for discovery/attribution. Unknown titles return `null` or empty lists. Returned objects are defensive copies. Runtime validation rejects duplicate IDs/slugs, invalid metadata, missing provider references and unsafe URLs.

Search normalizes case, diacritics, whitespace and punctuation, then ranks exact title/alias/cast matches, prefixes and substrings ahead of token-level edit-distance matches. All query tokens must match. Queries are capped at 160 characters; blank queries return no results. No search dependency was added.

Similarity is deterministic:

- Genres: Jaccard overlap × 0.40.
- Languages: Jaccard overlap × 0.25.
- People: (0.5 for the same director + 0.5 × cast Jaccard overlap) × 0.25.
- Rating: matching integer rating bands (`floor(rating)`) × 0.10.

Scores are rounded to six decimals. The source is excluded, zero-score matches are omitted, and equal scores sort by stable ID. Reasons describe actual shared director/cast/languages/genres/rating band; they are not generated by AI. Scores are similarity signals, not predicted enjoyment percentages.

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
| Drishyam 2 (Malayalam) | Iratta; Joji; Anjaam Pathiraa; Manjummel Boys; Article 15 |
| Vikram | Kaithi; Super Deluxe; Jai Bhim; Jailer; 96 |
| Knives Out | Glass Onion; Everything Everywhere All at Once; Arrival; Get Out; Dune |

The broader final matches are a visible limitation of the fixed weighted formula and this small catalog, rather than personalized recommendations.
