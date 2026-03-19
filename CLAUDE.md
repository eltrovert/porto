# CLAUDE.md — Porto Development Guide

## What Is This

Porto is El Muhammad's personal portfolio website at **eltrovert.com**.

**Architecture:** React SPA frontend + Go API backend, served as a single binary.

- **Go backend** (`cmd/porto/main.go`) — serves `/api/*` endpoints + SPA fallback
- **React frontend** (`web/`) — Vite + React + TypeScript + Tailwind CDN + Framer Motion
- **Data** — SQLite at `data/porto.db` (posts, projects, talks, books, notes, uses)

## Repository Structure

```
porto/
├── cmd/porto/main.go          # Go entrypoint
├── internal/
│   ├── content/               # Store (SQLite), models
│   └── server/                # HTTP server, API routes
├── web/                       # React SPA source (edit these!)
│   ├── App.tsx                # Main app, routing, view state
│   ├── components/            # All page components (*.tsx)
│   ├── data/                  # JSON data files (exported from DB)
│   ├── types.ts               # TypeScript types
│   ├── vite.config.ts         # Vite build config
│   └── package.json           # React dependencies
├── frontend/                  # Built React output (DO NOT EDIT)
│   ├── index.html             # SPA shell (copied from web/dist/)
│   └── assets/                # Bundled JS (from web/dist/assets/)
├── data/                      # SQLite DB (gitignored)
├── static/                    # Legacy static files (old Templ site)
└── CLAUDE.md                  # You are here
```

## Development Workflow

### 1. Edit React components

All UI code lives in `web/components/*.tsx`. Edit those files.

Key components:
- `Hero.tsx` — Landing hero section with AI chat
- `TechHighlight.tsx` — "Traversing Unknown Domain" topic cards
- `EngineeringSpotlight.tsx` — Featured project cards
- `BlogPosts.tsx` — Highlighted blog posts
- `YearlyRetrospective.tsx` — Annual retrospective cards
- `Navbar.tsx` — Navigation (desktop mega-menu + mobile hamburger)
- `Footer.tsx` — Site footer
- `AboutPage.tsx`, `PostsPage.tsx`, `ProjectsPage.tsx`, `TalksPage.tsx` — Full pages

### 2. Build the React frontend

```bash
cd web
npm install          # first time only
npx vite build       # outputs to web/dist/
```

### 3. Copy built files to frontend/

```bash
# From repo root:
rm -f frontend/assets/index-*.js
cp web/dist/assets/index-*.js frontend/assets/
cp web/dist/index.html frontend/index.html
```

### 4. Deploy (on media-server)

The Go binary is already running on this machine. To deploy frontend-only changes:

```bash
# Frontend-only deploy (no Go rebuild needed):
cd web && npm install && npx vite build
rm -f ../frontend/assets/index-*.js
cp dist/assets/index-*.js ../frontend/assets/
cp dist/index.html ../frontend/index.html
# The Go server serves frontend/ statically — changes are live immediately.
```

If you changed Go code (internal/, cmd/):

```bash
# Rebuild and restart the Go binary:
cd /home/el/projects/porto
go build -o bin/porto cmd/porto/main.go
# Stop the old process:
pkill -f 'porto serve'
# Start fresh:
nohup bin/porto serve --port 3333 > server.log 2>&1 &
```

### Quick one-liner for frontend deploy:

```bash
cd /home/el/projects/porto/web && npm install && npx vite build && rm -f ../frontend/assets/index-*.js && cp dist/assets/index-*.js ../frontend/assets/ && cp dist/index.html ../frontend/index.html && echo "✅ Deployed"
```

## Styling

- **Tailwind CSS via CDN** — loaded in `frontend/index.html` via `<script src="https://cdn.tailwindcss.com">`
- Custom config is inline in the HTML `<script>` block (accent color = `#FFCF0D`, dark = `#050505`)
- **Font:** JetBrains Mono (mono), Inter (sans) — loaded via Google Fonts in the HTML
- Components use Tailwind utility classes directly — no separate CSS files

### Responsive Breakpoints (Tailwind defaults)

- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+

**Mobile-first:** Default styles target phones (~390px). Use `sm:`, `md:`, `lg:` for larger screens.

## Current Focus: Mobile Responsiveness

The site looks good on desktop but needs mobile fixes. Key things to check at 390px width:

- Text overflow from `whitespace-nowrap` or wide `tracking-[...]` values
- Font sizes too small (body text should be >= 14px on mobile)
- Tap targets too small (buttons/links should be >= 44px)
- Cards should stack vertically, not side-by-side
- Padding should be `px-4` (16px) on mobile, `px-6`/`px-8` on larger screens
- No horizontal scroll on any section

## API Endpoints

- `GET /api/posts` — list all posts (sorted by published_at DESC)
- `GET /api/posts/:slug` — single post
- `GET /api/projects` — list all projects (sorted by year DESC)
- `GET /api/projects/:slug` — single project
- `GET /api/talks` — list talks
- `GET /api/books` — list books
- `GET /api/uses` — list uses/devices
- `GET /api/notes` — list notes
- `POST /api/chat` — AI chat (requires GEMINI_API_KEY env)

## Important Notes

- **Do NOT edit files in `frontend/` directly** — they get overwritten by `vite build`
- **Edit `web/components/*.tsx`** for all UI changes
- The Go server serves `frontend/` as static files with SPA fallback (all routes → `index.html`)
- SQLite DB is at `data/porto.db` — it has real content, don't drop tables
- The server is running at `http://localhost:3333` — test changes there
- After frontend deploy, changes are immediate (no server restart needed)
