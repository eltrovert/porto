package server

import (
	"encoding/json"
	"html"
	"net/http"

	"github.com/eltrovert/porto/internal/content"
)

// Server holds the HTTP server configuration
type Server struct {
	store       *content.Store
	frontendDir string
}

// New creates a new server instance
func New(store *content.Store) *Server {
	return &Server{
		store:       store,
		frontendDir: "./frontend",
	}
}

// NewWithFrontend creates a server with a custom frontend directory
func NewWithFrontend(store *content.Store, frontendDir string) *Server {
	return &Server{
		store:       store,
		frontendDir: frontendDir,
	}
}

// Handler returns the HTTP handler for the server
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// API routes
	mux.HandleFunc("POST /api/chat", s.handleAIChat)
	mux.HandleFunc("/api/posts", s.handleAPIPosts)
	mux.HandleFunc("/api/projects", s.handleAPIProjects)
	mux.HandleFunc("POST /api/guestbook", s.handleAPIGuestbookSubmit)

	// Feed routes (server-rendered XML)
	mux.HandleFunc("/rss.xml", s.handleRSS)
	mux.HandleFunc("/sitemap.xml", s.handleSitemap)

	// SPA fallback — serves React app for everything else
	spa := NewSPAHandler(s.frontendDir)
	mux.Handle("/", spa)

	return mux
}

// --- API Handlers ---

func (s *Server) handleAPIPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := s.store.ListPosts(0, 100)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, posts)
}

func (s *Server) handleAPIProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := s.store.ListProjects()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, projects)
}

func (s *Server) handleAPIGuestbookSubmit(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name    string `json:"name"`
		Message string `json:"message"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		return
	}

	if req.Name == "" || req.Message == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Name and message required"})
		return
	}

	entry := &content.GuestEntry{
		Name:    req.Name,
		Message: req.Message,
	}
	if err := s.store.CreateGuestEntry(entry); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save"})
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{"status": "ok"})
}

// --- Feed Handlers ---

func (s *Server) handleRSS(w http.ResponseWriter, r *http.Request) {
	posts, err := s.store.ListPosts(0, 20)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/rss+xml")

	rss := `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>El Muhammad - Blog</title>
    <description>DevOps and Cloud Architecture insights</description>
    <link>https://eltrovert.com</link>`

	for _, post := range posts {
		rss += `
    <item>
      <title>` + html.EscapeString(post.Title) + `</title>
      <description>` + html.EscapeString(post.Description) + `</description>
      <link>https://eltrovert.com/posts/` + post.Slug + `</link>
      <guid>https://eltrovert.com/posts/` + post.Slug + `</guid>
      <pubDate>` + post.PublishedAt.Format("Mon, 02 Jan 2006 15:04:05 -0700") + `</pubDate>
    </item>`
	}

	rss += `
  </channel>
</rss>`

	w.Write([]byte(rss))
}

func (s *Server) handleSitemap(w http.ResponseWriter, r *http.Request) {
	posts, _ := s.store.ListPosts(0, 1000)
	projects, _ := s.store.ListProjects()

	w.Header().Set("Content-Type", "application/xml")

	staticDate := "2026-01-01"

	sitemap := `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://eltrovert.com/</loc><lastmod>` + staticDate + `</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://eltrovert.com/about</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://eltrovert.com/posts</loc><lastmod>` + staticDate + `</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://eltrovert.com/projects</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`

	for _, post := range posts {
		postDate := post.PublishedAt.Format("2006-01-02")
		sitemap += `
  <url><loc>https://eltrovert.com/posts/` + post.Slug + `</loc><lastmod>` + postDate + `</lastmod><priority>0.7</priority></url>`
	}

	for _, project := range projects {
		projectDate := project.CreatedAt.Format("2006-01-02")
		sitemap += `
  <url><loc>https://eltrovert.com/projects/` + project.Slug + `</loc><lastmod>` + projectDate + `</lastmod><priority>0.7</priority></url>`
	}

	sitemap += `
</urlset>`

	w.Write([]byte(sitemap))
}
