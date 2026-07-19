# TASKS.md — nestly-client

> Starts **after** initial Next.js + Tailwind + DaisyUI setup is done manually.
> Everything below assumes `create-next-app` is already run and the dev
> server boots.

## Phase 1 — Foundation
- [x] T01: Set up `src/lib/fetcher.js` — shared fetch wrapper (base server
      URL from env var, error handling, JSON parsing)
- [x] T02: Set up `src/actions/` and `src/api/` folders with one example
      file each (`auth.js`) to lock in the convention
- [x] T03: Configure Tailwind + DaisyUI theme — pick the 3 primary colors
      + neutral, define as DaisyUI theme tokens
- [x] T04: Install and configure Gravity UI icons + react-icons
- [x] T05: Install and configure react-toast, wire a global toast provider
- [ ] T06: Install BetterAuth client (`1.6.11`, `--legacy-peer-deps`),
      configure base client pointing at server's auth endpoints
- [ ] T07: Build shared layout shell — root layout with toast provider,
      auth context provider

## Phase 2 — Navbar, Footer, Landing Page
- [ ] T08: Navbar — sticky/fixed, min 3 routes logged out / 5 logged in,
      responsive (mobile menu)
- [ ] T09: Hero section — 60–70% viewport height, interactive element
      (slider/animation/CTA), clear scroll cue to next section
- [ ] T10: Build remaining 6+ landing sections (Featured Properties,
      How It Works, Categories/Property Types, Stats, Testimonials,
      Neighborhood Highlights, Newsletter/CTA — pick 6+)
- [ ] T11: Footer — working internal links, contact info, social links

## Phase 3 — Auth Pages
- [ ] T12: Login page — form, validation, error handling
- [ ] T13: Register page — form, validation, error handling
- [ ] T14: Demo login button — auto-fills valid demo credentials
- [ ] T15: Google social login button, wired to BetterAuth provider
- [ ] T16: Auth guard/middleware for protected routes → redirect to
      `/login` if unauthenticated

## Phase 4 — Listing / Explore Page
- [ ] T17: Property card component — image, title, short description,
      meta (price, location, bedrooms/bathrooms), "View Details" button;
      identical size/radius across all cards
- [ ] T18: Skeleton loader for the card grid while fetching
- [ ] T19: Search bar (by title/location/keyword)
- [ ] T20: Filters — minimum 2 fields (e.g. price range + property type;
      add bedrooms/location if time allows)
- [ ] T21: Sort controls (price, newest, rating)
- [ ] T22: Pagination or infinite scroll
- [ ] T23: Desktop grid: 4 cards per row, responsive down to 1 on mobile

## Phase 5 — Details Page
- [ ] T24: Details page layout — publicly accessible, no auth required
- [ ] T25: Image gallery/carousel (multiple images)
- [ ] T26: Description/overview section
- [ ] T27: Key info/specifications section (area, bedrooms, amenities, year)
- [ ] T28: Related/similar properties section

## Phase 6 — Protected Pages
- [ ] T29: `/items/add` — form (title, short + full description, price,
      location, optional image URL, other property fields), submit action
- [ ] T30: `/items/manage` — table/grid of the logged-in user's listings,
      View + Delete actions, responsive layout

## Phase 7 — AI Features (UI side)
- [ ] T31: Recommendation Engine UI — preference input (or implicit from
      saves/views), ranked results display, refine/filter controls
- [ ] T32: Document Intelligence UI — file upload for lease/agreement,
      processing indicator, display structured summary, download option
- [ ] T33: Chat Assistant UI — chat widget, conversation history,
      typing indicator, suggested follow-up prompts

## Phase 8 — Additional Pages
- [ ] T34: About page
- [ ] T35: Second additional page (Contact / Buying Tips / Neighborhood
      Guides — pick one)

## Phase 9 — Polish
- [ ] T36: Full responsiveness pass — every page on mobile/tablet/desktop
- [ ] T37: Replace any remaining placeholder content with real content
- [ ] T38: Verify every button/link is functional
- [ ] T39: Cross-check visual consistency (spacing, colors, border radius)
      across all pages
