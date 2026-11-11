# Movie-night prototype — P0

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

## P0 boundaries

Original CSS illustration and gradient poster placeholders only. No catalog or real ratings/availability, onboarding, title routes, search, poll creation, voting, real sharing or backend. Preferences/watchlist state scaffolding and the interactive sample shortlist use Zustand localStorage persistence. Future catalog and poll access must go through the interfaces described in AGENTS.md. No poll state or data bypasses those interfaces in P0. Analytics has a console-only typed adapter; confetti is installed for the future winner reveal.

Components are in `components/ui/index.tsx`: Button, Chip, ProviderChip, PosterCard, Sheet, Toast, SectionHeader and AvatarStack. Sheets trap keyboard focus, support Escape/backdrop/close-button dismissal, and restore focus. The app shell becomes inert for the shortlist modal. Reduced motion disables springs, drift, shimmer and press scaling. Provider colours are lightened for readable text on dark surfaces.

No remote is configured, so this checkout has no pull request or deployment. No credentials or external services are needed for P0.

## P0 verification

Lint, strict typecheck and production build pass. Browser walkthrough checked 390px mobile (no horizontal overflow), the 390×844 desktop frame, sample shortlist persistence across reload, mood selection, modal focus wrapping, Escape dismissal and toast feedback, with no reported browser warnings/errors. Main text and CTA contrast pairs were checked above 4.5:1. Reduced motion is implemented but not browser-emulated in this pass.

A PostCSS override patches the Next.js 15 transitive dependency without upgrading the framework major. The production dependency audit is clean; npm still reports six moderate development-only advisories stemming from typescript-eslint’s nested minimatch dependency. These do not ship in the app bundle.
