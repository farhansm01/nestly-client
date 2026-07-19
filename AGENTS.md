# AGENTS.md — nestly-client

## Project Overview
**Nestly** — an AI-powered real estate / property listing platform.
This repo is the **frontend only**. It talks to the `nestly-server` repo
(deployed separately to Vercel) through its public API — no server code,
no database access, no shared code between repos.

This is a course capstone project. Original build — do not reuse or clone
patterns from any prior project's UI/UX, only reuse verified technical
conventions (auth setup, file structure).

## Tech Stack
- **Framework:** Next.js (App Router), **JavaScript** (not TypeScript)
- **Styling:** Tailwind CSS + DaisyUI
- **Icons:** Gravity UI + react-icons
- **Notifications:** react-toast
- **Auth:** BetterAuth client, pinned to `1.6.11` exactly (no caret),
  install with `--legacy-peer-deps` — v1.6.13+ has a breaking kysely bug
- **Deployment:** Vercel

## Repo Relationship
- The server is deployed independently and exposes a public URL.
- This client calls the server **only** through that URL — never assume
  shared filesystem, shared env, or direct DB access.
- Server routes are all defined in the server's `index.js` — check the
  server's AGENTS.md/TASKS.md for the exact route list before wiring up
  a new fetch/action function.

## File Structure Convention
For every resource (e.g. `properties`, `users`, `reviews`):

- `src/api/<resource>.js` — **all GET requests** for that resource. Data
  fetching only, no mutations.
- `src/actions/<resource>.js` — **all POST / PUT / DELETE** functions for
  that resource. Written to be reusable from anywhere in the project
  (not tied to one component).
- Page/components import from `src/api/` or `src/actions/` — **never**
  write a raw `fetch` call directly inside a page or component.

```
src/
  app/                  → routes (App Router)
  actions/
    properties.js        → createProperty, updateProperty, deleteProperty
    auth.js
  api/
    properties.js         → getProperties, getPropertyById
    auth.js
  components/
  lib/
    fetcher.js            → shared fetch wrapper (base URL, headers, error handling)
```

## Coding Conventions
- All code fully responsive by default (mobile, tablet, desktop) — no exceptions
- Max 3 primary colors + 1 neutral, applied consistently across the whole app
- All cards: identical size, border radius, and layout
- Skeleton loaders on every data-fetching list/grid
- Pure Tailwind + DaisyUI components only — no other component libraries
- No placeholder/lorem ipsum content anywhere in the final build

## Auth & Dashboard Notes
- BetterAuth client handles login/signup/session UI and stores user role (`user` vs `admin`)
- Logged-in users see a "Dashboard" button in Navbar that redirects to their role-specific dashboard (`/dashboard` → `/dashboard/user` or `/dashboard/admin`)
- Unauthorized role access attempts trigger immediate redirection to `/unauthorized` page (403 Forbidden UI)
- Protected routes: `/dashboard/*`, `/items/add` — redirect unauthenticated users to `/login`

## Communication Style for Agents Working on This Repo
- Keep explanations simple, avoid dense jargon
- Full file replacements preferred over partial diffs
- Include a commit message with every change, unprompted
- Flag unclear requirements instead of silently guessing
