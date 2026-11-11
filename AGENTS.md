# Dekho prototype — agent guide

## What this is
A clickable, mobile-first web prototype of Dekho: an India-only app that helps a
group decide what to watch tonight. Core loop: search a title -> see similar titles
with ratings -> see where to watch in India on your services -> shortlist 2-4 ->
share a poll link to WhatsApp -> friends vote in the browser with no signup ->
winner revealed with a "Watch on [provider]" link and a shareable result card.
The goal is UI/UX feedback from real people, so polish and feel matter more than
backend completeness.

## Stack (do not add others without asking)
- Next.js 15 App Router, TypeScript strict, React Server Components where natural
- Tailwind CSS v4, CSS variables for design tokens in app/globals.css
- motion (Framer Motion) for animation; canvas-confetti for the winner reveal
- lucide-react icons; next/font for Bricolage Grotesque, Inter, Mukta
- State: Zustand with localStorage persistence (prefs, shortlist, watchlist, polls)
- No backend in v0. All data via lib/data (see below). Supabase comes later.

## Commands
- npm install
- npm run dev        (http://localhost:3000)
- npm run lint
- npm run typecheck  (tsc --noEmit)
- npm run build      (must pass before any PR)

## Architecture rules
- All catalog access goes through lib/data/index.ts which exports a DataSource
  interface (searchTitles, getTitle, getSimilar, getProviders, getMoodPicks).
  v0 implementation reads data/catalog.json. Never import the JSON from components.
- All poll access goes through lib/polls/index.ts (PollStore interface:
  createPoll, getPoll, castVote, getResults, subscribe). v0 uses localStorage plus
  a BroadcastChannel so two tabs update live. A Supabase PollStore replaces it later.
- Brand name, tagline and colours come from lib/brand.ts, driven by NEXT_PUBLIC_BRAND.
  Never hard-code "Dekho" in UI copy.
- Similarity is deterministic and explainable: weighted overlap of genres (0.4),
  language (0.25), cast/director (0.25), rating band (0.1). Return a "because"
  string with every result (e.g. "Same director · Malayalam thriller").
- Analytics: lib/analytics.ts exposes track(event, props); v0 logs to console.
  Events: search, title_view, similar_tap, provider_tap, shortlist_add,
  poll_create, poll_share, vote_cast, result_view, watch_click.

## Design rules
- Dark theme only. Tokens: bg #0B0A10, surface #16141F, marigold #FFB627,
  pink #FF3D7F, teal #21D4C4, text #F5F3FA, muted #9C97AD.
- Mobile-first at 390px. On >= 768px, render the app inside a centred phone frame
  over a blurred poster wall.
- Posters 2:3, rounded-2xl. Press feedback scale 0.96. Skeleton shimmer, never spinners.
- Respect prefers-reduced-motion. Text contrast >= 4.5:1. Tap targets >= 44px.
- Provider names as coloured text chips, never logos. TMDb attribution in the footer
  and on the title page when TMDb data is shown.
- Copy is warm, short, light Hinglish where it fits. No lorem ipsum anywhere.

## India specifics
- Providers: Netflix, Prime Video, JioHotstar, SonyLIV, ZEE5, Aha, Sun NXT,
  MX Player, Apple TV+, Lionsgate Play. Offer types: stream, rent, buy, free.
- Languages: Hindi, English, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi.
- Search matches Hinglish/alternate spellings via an aliases array per title.
- Prices in INR (₹).

## Working agreement
- One PR per task. Small, reviewable commits.
- Run lint, typecheck and build before finishing; fix what fails.
- End every task with: what changed, how to see it (route + steps), what's stubbed.
- If something in a prompt conflicts with this file, follow this file and say so.
