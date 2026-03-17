# AGENTS.md — Porto Build Instructions (Ralph Wiggum Method)

## The Rules

1. **Read `ralph_test.go` — that IS the spec.** Every test starts RED.
2. **Make them GREEN, one by one, top to bottom.**
3. **Do NOT modify `ralph_test.go`** (except adding imports if new deps are needed)
4. **Track progress:** `go test -v -count=1 ./... 2>&1 | grep -E "PASS|FAIL"`
5. **Commit after each phase passes**

## Reference Code
- `.reference-web-portofolio/` — React prototype with the EXACT design to replicate
- `.reference-blog-astro/` — Current Astro blog with 45 posts + 8 projects to import
- `SPEC.md` — Full specification (architecture, design system, DB schema, routes)

## The Phases (from ralph_test.go)

### Phase 1: Database & Models
Tests expect: `internal/content/models.go`, `internal/content/store.go`
- All model structs (Post, Project, Talk, Book, Note, GuestEntry, Comment, UsesItem)
- SQLite store with NewStore(dbPath), DB(), Close()
- All tables + indexes created on init
- Full CRUD: Create/Get/List for all types
- Search, filter by topic, pagination
- Increment views/likes
- GetTopics (unique list)
- Duplicate slug rejection

### Phase 2: Markdown Renderer
Tests expect: `internal/content/markdown.go`
- `content.RenderMarkdown(md string) string` — goldmark with syntax highlighting
- Mermaid code blocks → wrapped in mermaid div
- Tables, links, images support
- `content.CalculateReadTime(text string) string` — ~200 words/min

### Phase 3: Content Importer
Tests expect: `internal/content/importer.go`
- `content.ParseAstroPost(raw, slug string) (*Post, error)` — parse frontmatter + body
- `content.ParseAstroProject(raw, slug string) (*Project, error)`
- `content.ImportFromDirectory(store, path string) (*ImportStats, error)` — bulk import
- ImportStats has PostsImported, ProjectsImported fields
- Must import all 45 posts + 8 projects from reference blog

### Phase 4: HTTP Server & Routes
Tests expect: `internal/server/server.go` with `server.New(store) → Server` and `srv.Handler() → http.Handler`
- All routes: /, /about, /projects, /projects/{slug}, /posts, /posts/{slug}, /talks, /uses, /books, /life, /notes, /guestbook, /kudos
- HTMX partials: /partials/posts/search?q=, /partials/posts?topic=, /partials/talks?type=
- Forms: POST /guestbook, POST /posts/{slug}/comment, POST /posts/{slug}/like
- Static files: /static/*
- RSS: /rss.xml, Sitemap: /sitemap.xml
- 404 for unknown routes and missing content

### Phase 5: Design Verification
Tests check that HTML output contains exact design elements from web-portofolio:
- Accent color #ffcf0d
- font-mono classes
- Dark background #050505
- Glassmorphism navbar (backdrop-blur)
- Terminal prefixes (>_) on all page headers
- Blinking cursor animation
- Mouse follower JS
- HTMX included
- Terminal-style footer with subscribe + system stats
- All page-specific terminal headers (my_writing, visitor_log, quick_logs, etc.)

### Phase 6: RSS & Sitemap
- Valid XML for both
- RSS contains post titles
- Sitemap contains all page URLs

### Phase 7: Middleware
- Gzip support
- Correct Content-Types

## Stack
- Go 1.22+, Templ, HTMX, Tailwind CSS, SQLite, goldmark
- Study SPEC.md for full architecture and design system details
- Study .reference-web-portofolio/components/*.tsx for exact Tailwind classes

## Design Rules (CRITICAL)
- Replicate EVERY visual detail from .reference-web-portofolio
- Cosmic background on all pages (nebula gradients, floating debris, SVG orbital tracks)
- Glassmorphism navbar with mega menu
- Terminal aesthetic throughout (>_, //, .log, .json extensions)
- font-mono for headings/nav, font-sans for body
- Accent: #ffcf0d, Background: #050505, Cards: #0A0A0A
