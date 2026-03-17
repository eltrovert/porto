# Porto — Personal Portfolio & Blog Engine

## Overview
Porto is a personal portfolio website for **El Muhammad** — a Senior DevOps & Cloud Architect. It replaces the existing Astro blog at eltrovert.com and the web-portofolio React prototype, combining both into a single Go binary with SQLite backend.

## Stack
- **Go 1.22+** — HTTP server, CLI, content management
- **Templ** — Type-safe HTML templates (replaces React components)
- **HTMX** — SPA-like interactions without JS framework (page transitions, search, filters)
- **Tailwind CSS v4** — Exact same design system as web-portofolio
- **SQLite** — Content storage (posts, projects, notes, guestbook, comments)
- **goldmark** — Markdown → HTML rendering (with syntax highlighting, mermaid support)
- **Lucide Icons** — SVG icon set (same as web-portofolio, inline SVGs in templ)

## Design System (MUST PRESERVE EXACTLY)
The design comes from the `web-portofolio` React prototype. Every visual detail must be replicated:

### Colors & Theme
- Background: `#050505` (pages), `#0A0A0A` (cards/navbar), `#0f0f0f` (visual containers)
- Accent: `#ffcf0d` (referred to as `accent` in Tailwind config)
- Text: white headings, `gray-400` body, `gray-500` meta
- Font: `font-mono` for headings/nav/meta, `font-sans` for body text

### Visual Elements
- **Glassmorphism navbar** — Fixed top, auto-hide on scroll, reveal on hover, backdrop-blur-xl
- **Mega menu** — 3-column dropdown with image cards and list items under "More"
- **Cosmic background** — Nebula gradients (accent/30, purple-600/20, blue-600/20), floating debris, SVG orbital tracks with comet animations, stardust texture overlay
- **Corner accents** — Tiny border-l/border-t decorations on card corners
- **Hover effects** — Cards: accent glow, bottom progress bar fill, -translate-y-1/2
- **Terminal aesthetic** — `>_` prefix on page titles, `//` comment style descriptions, blinking cursor `_`, `.log`/`.json`/`.md` file naming
- **Mouse follower** — Accent dot (instant) + ring (lerp delay) — vanilla JS, ~40 lines
- **Page transitions** — HTMX `hx-swap` + CSS View Transitions API
- **Scan animation** — Gradient sweep on card visual containers
- **Window controls** — Red/yellow/green dots on code blocks and image overlays

### Component Map (React → Templ)
| React Component | Templ Component | Notes |
|---|---|---|
| `Navbar.tsx` | `navbar.templ` | HTMX navigation, CSS mega menu (no React state needed) |
| `Hero.tsx` | `hero.templ` | Typing animation via CSS, no Framer Motion |
| `AbstractVisual.tsx` | `abstract_visual.templ` | Orbiting icons → CSS animations, floating cards → CSS keyframes |
| `TechHighlight.tsx` | `tech_highlight.templ` | Cards with scan animation |
| `EngineeringSpotlight.tsx` | `engineering_spotlight.templ` | Project cards with alternating layout |
| `BlogPosts.tsx` | `blog_posts.templ` | Highlighted posts from DB |
| `YearlyRetrospective.tsx` | `yearly_retro.templ` | Retro cards with typing animation |
| `Footer.tsx` | `footer.templ` | Terminal subscribe, system stats |
| `MouseFollower.tsx` | `mouse_follower.js` | Vanilla JS (~40 lines) |
| `AboutPage.tsx` | `about.templ` | Timeline, certs, polaroid avatar |
| `ProjectsPage.tsx` | `projects.templ` | Major projects + archival grid |
| `PostsPage.tsx` | `posts.templ` | Search + topic filter via HTMX |
| `PostDetail.tsx` | `post_detail.templ` | Rich content rendering, TOC sidebar, comments |
| `TalksPage.tsx` | `talks.templ` | Filter tabs, talk cards with video/slides |
| `DeckViewerPage.tsx` | `deck_viewer.templ` | Slide viewer |
| `UsesPage.tsx` | `uses.templ` | Hardware manifest, category sections |
| `BooksPage.tsx` | `books.templ` | Book reviews with ratings |
| `LifeOutsideTechPage.tsx` | `life.templ` | Hobby gallery |
| `ShortNotesPage.tsx` | `notes.templ` | Masonry grid of quick notes |
| `GuestBookPage.tsx` | `guestbook.templ` | Sign form + signatures list |
| `KudosPage.tsx` | `kudos.templ` | Tech stack + thanks |

### Animation Strategy
| React (Framer Motion) | Go/HTMX Replacement |
|---|---|
| `initial={{ opacity: 0, y: 20 }} animate={{ ... }}` | CSS `@keyframes fadeInUp` + `animation-fill-mode: both` + `IntersectionObserver` |
| `AnimatePresence` page transitions | View Transitions API (`document.startViewTransition`) via HTMX `htmx:beforeSwap` |
| `whileInView` | `IntersectionObserver` adding `.animate-in` class |
| Typing animation | CSS `@keyframes typing` with `steps()` + `clip-path` |
| Floating cards `animate={{ y: [0, -10, 0] }}` | CSS `@keyframes float { 50% { transform: translateY(-10px) } }` |
| Orbit rotation | CSS `@keyframes spin` (already used in React version) |
| Scan gradient | CSS `@keyframes scan` (already in React version) |

## Architecture

```
porto/
├── cmd/
│   └── porto/
│       └── main.go              # CLI entrypoint (serve, import, migrate)
├── internal/
│   ├── server/
│   │   ├── server.go            # HTTP server setup, middleware
│   │   ├── routes.go            # Route registration
│   │   └── handlers/
│   │       ├── home.go          # Home page handler
│   │       ├── posts.go         # Posts list + detail + search
│   │       ├── projects.go      # Projects list + detail
│   │       ├── talks.go         # Talks list + filter
│   │       ├── about.go         # About page
│   │       ├── uses.go          # Uses page
│   │       ├── books.go         # Books page
│   │       ├── life.go          # Life outside tech
│   │       ├── notes.go         # Short notes
│   │       ├── guestbook.go     # Guestbook (GET + POST)
│   │       ├── kudos.go         # Kudos page
│   │       ├── deck.go          # Deck viewer
│   │       ├── admin.go         # Admin dashboard (future)
│   │       └── api.go           # JSON API endpoints (future AI integration)
│   ├── content/
│   │   ├── store.go             # SQLite content store (CRUD)
│   │   ├── markdown.go          # Markdown → HTML with goldmark
│   │   ├── importer.go          # Import from Astro markdown files
│   │   └── models.go            # Post, Project, Talk, Book, Note, GuestEntry
│   └── config/
│       └── config.go            # App configuration
├── templates/
│   ├── layouts/
│   │   ├── base.templ           # HTML base (head, scripts, cosmic background)
│   │   └── page.templ           # Page wrapper with navbar + footer
│   ├── components/
│   │   ├── navbar.templ         # Glassmorphism nav with mega menu
│   │   ├── footer.templ         # Terminal-style footer
│   │   ├── hero.templ           # Home hero section
│   │   ├── abstract_visual.templ # Orbiting tech icons
│   │   ├── tech_highlight.templ # Tech cards section
│   │   ├── engineering_spotlight.templ # Featured projects
│   │   ├── blog_posts.templ     # Highlighted blog posts
│   │   ├── yearly_retro.templ   # Yearly retrospective cards
│   │   ├── post_card.templ      # Reusable post card
│   │   ├── project_card.templ   # Reusable project card
│   │   ├── cosmic_bg.templ      # Shared cosmic background partial
│   │   ├── interaction_bar.templ # Like/Comment/Share bar
│   │   └── icons/               # Lucide SVG icon templates
│   └── pages/
│       ├── home.templ
│       ├── about.templ
│       ├── projects.templ
│       ├── project_detail.templ
│       ├── posts.templ
│       ├── post_detail.templ
│       ├── talks.templ
│       ├── deck_viewer.templ
│       ├── uses.templ
│       ├── books.templ
│       ├── life.templ
│       ├── notes.templ
│       ├── guestbook.templ
│       └── kudos.templ
├── static/
│   ├── css/
│   │   └── app.css              # Tailwind + custom animations
│   ├── js/
│   │   ├── htmx.min.js          # HTMX library
│   │   ├── mouse-follower.js    # Custom cursor
│   │   ├── animations.js        # IntersectionObserver for scroll animations
│   │   └── transitions.js       # View Transitions API integration
│   ├── fonts/                   # JetBrains Mono (mono), Inter (sans)
│   └── images/
│       └── posts/               # Blog post images (migrated from Astro)
├── content/                     # Source markdown files (for import)
│   ├── posts/                   # Migrated from blog-astro
│   └── projects/                # Migrated from blog-astro
├── data/
│   └── porto.db                 # SQLite database (created on first run)
├── go.mod
├── go.sum
├── tailwind.config.js
├── Makefile
├── Dockerfile
└── README.md
```

## Database Schema

```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content_md TEXT NOT NULL,      -- Original markdown
    content_html TEXT NOT NULL,    -- Rendered HTML
    topic TEXT,
    tags TEXT,                     -- JSON array
    date_formatted TEXT,
    published_at DATETIME,
    has_mermaid BOOLEAN DEFAULT FALSE,
    cover_image TEXT,
    read_time TEXT,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content_md TEXT NOT NULL,
    content_html TEXT NOT NULL,
    tools TEXT,                    -- JSON array
    cover_image TEXT,
    repo_link TEXT,
    demo_link TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_archival BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE talks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    event TEXT NOT NULL,
    location TEXT,
    date TEXT,
    talk_type TEXT,               -- conference, workshop, meetup
    description TEXT,
    video_link TEXT,
    slides_link TEXT,
    thumbnail TEXT,
    attendees TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT,
    rating INTEGER DEFAULT 0,     -- 1-5
    review TEXT,
    tags TEXT,                    -- JSON array
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_hash TEXT,                 -- For spam prevention
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    project_id INTEGER,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE uses_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,       -- workstation, furniture, accessories, applications, subscriptions
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    link_text TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_topic ON posts(topic);
CREATE INDEX idx_posts_published ON posts(published_at);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_talks_slug ON talks(slug);
```

## CLI Commands

```bash
# Start the web server
porto serve --port 3000 --db ./data/porto.db

# Import content from Astro blog
porto import --source /path/to/blog-astro/src/content --db ./data/porto.db

# Run database migrations
porto migrate --db ./data/porto.db

# Add content via CLI (future)
porto post create --title "..." --file ./post.md
porto note create --content "Quick thought..."
```

## Routes

```
GET  /                           → Home page
GET  /about                      → About page
GET  /projects                   → Projects list
GET  /projects/{slug}            → Project detail
GET  /posts                      → Posts list (with search/filter)
GET  /posts/{slug}               → Post detail
GET  /talks                      → Talks list
GET  /talks/deck/{slug}          → Deck viewer
GET  /uses                       → Uses/hardware page
GET  /books                      → Books page
GET  /life                       → Life outside tech
GET  /notes                      → Short notes
GET  /guestbook                  → Guestbook
GET  /kudos                      → Kudos page
GET  /rss.xml                    → RSS feed
GET  /sitemap.xml                → Sitemap

# HTMX partials (for SPA-like navigation)
GET  /partials/posts             → Posts list partial (search/filter)
GET  /partials/posts/search?q=   → Search results partial
GET  /partials/talks?type=       → Filtered talks partial

# API (future - for AI content generation)
POST /api/posts                  → Create post
POST /api/notes                  → Create note

# Interactive
POST /guestbook                  → Sign guestbook
POST /posts/{slug}/comment       → Add comment
POST /posts/{slug}/like          → Like post (increment counter)

# Static
GET  /static/*                   → Static assets (CSS, JS, images, fonts)
```

## Content Migration Plan

### From blog-astro (45 posts + 8 projects):
1. Parse frontmatter: `title`, `description`, `dateFormatted`, `topic`, `hasMermaid`
2. Parse markdown content body
3. Render markdown → HTML via goldmark
4. Calculate read time (~200 words/min)
5. Generate slug from filename
6. Store in SQLite

### From web-portofolio (data to seed):
1. About page content (experience, certs, current mission) — hardcoded in templ initially
2. Talks data — seed from TALKS array in TalksPage.tsx
3. Books data — seed from BOOKS array in BooksPage.tsx
4. Uses data — seed from SECTIONS array in UsesPage.tsx
5. Short notes — seed from NOTES array in ShortNotesPage.tsx

### Images
- Blog post images reference `/assets/images/posts/*` — migrate to `static/images/posts/`
- External Unsplash images used in web-portofolio — keep as external URLs initially
- Future: download and self-host for reliability

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  content: ["./templates/**/*.templ", "./static/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        dark: '#050505',
        accent: '#ffcf0d',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

## Build & Deploy

```makefile
# Development
dev: templ generate && go run ./cmd/porto serve --port 3000

# Build
build: templ generate && tailwindcss -i ./static/css/app.css -o ./static/css/out.css --minify && go build -o bin/porto ./cmd/porto

# Deploy to media-server
deploy: build && scp bin/porto el@media-server:/home/el/projects/porto/ && ssh el@media-server 'systemctl restart porto'
```

## Phase Plan

### Phase 1: Foundation (MVP)
- [ ] Go project setup, SQLite, CLI skeleton
- [ ] Base template with cosmic background, navbar, footer
- [ ] Home page with all sections (hero, tech highlight, engineering spotlight, blog posts, yearly retro)
- [ ] Mouse follower JS
- [ ] Scroll animations (IntersectionObserver)
- [ ] All static pages (about, uses, books, life, notes, kudos)

### Phase 2: Content Engine
- [ ] Posts list with HTMX search + topic filter
- [ ] Post detail with rich content rendering (code blocks, images, TOC)
- [ ] Projects list + detail
- [ ] Talks list with type filter
- [ ] Markdown importer (from Astro blog)
- [ ] Content migration (all 45 posts + 8 projects)

### Phase 3: Interactive Features
- [ ] Guestbook (submit + display)
- [ ] Comments on posts
- [ ] Like counters
- [ ] View counters
- [ ] RSS feed + sitemap

### Phase 4: Deploy & Polish
- [ ] Docker build
- [ ] Deploy to media-server
- [ ] Domain setup (eltrovert.com → porto)
- [ ] Performance optimization (caching, compression)
- [ ] SEO meta tags, Open Graph

### Phase 5: AI Dashboard (Future)
- [ ] Admin auth
- [ ] Content management dashboard
- [ ] AI content generation endpoints
- [ ] MCP integration
