package server

import (
	"html"
	"net/http"
	"strings"

	"github.com/eltrovert/porto/internal/content"
	"github.com/eltrovert/porto/templates/pages"
)

// Server holds the HTTP server configuration
type Server struct {
	store *content.Store
}

// New creates a new server instance
func New(store *content.Store) *Server {
	return &Server{
		store: store,
	}
}

// Handler returns the HTTP handler for the server
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// Main routes
	mux.HandleFunc("/", s.handleHome)
	mux.HandleFunc("/about", s.handleAbout)
	mux.HandleFunc("/projects", s.handleProjects)
	mux.HandleFunc("/projects/", s.handleProjectDetail) // Catch /projects/{slug}
	mux.HandleFunc("/posts", s.handlePosts)
	mux.HandleFunc("/posts/", s.handlePostDetail) // Catch /posts/{slug}
	mux.HandleFunc("/talks", s.handleTalks)
	mux.HandleFunc("/uses", s.handleUses)
	mux.HandleFunc("/books", s.handleBooks)
	mux.HandleFunc("/life", s.handleLife)
	mux.HandleFunc("/notes", s.handleNotes)
	mux.HandleFunc("/guestbook", s.handleGuestbook)
	mux.HandleFunc("/kudos", s.handleKudos)
	mux.HandleFunc("/privacy", s.handlePrivacy)
	mux.HandleFunc("/terms", s.handleTerms)
	mux.HandleFunc("/talks/", s.handleTalkDetail) // Catch /talks/{slug}/deck

	// Feed routes
	mux.HandleFunc("/rss.xml", s.handleRSS)
	mux.HandleFunc("/sitemap.xml", s.handleSitemap)

	// HTMX partial routes
	mux.HandleFunc("/partials/posts", s.handlePartialPosts)
	mux.HandleFunc("/partials/posts/search", s.handlePartialPostsSearch)
	mux.HandleFunc("/partials/talks", s.handlePartialTalks)

	// Form handlers
	mux.HandleFunc("POST /posts/", s.handlePostActions) // Handles both comment and like
	mux.HandleFunc("POST /guestbook", s.handleGuestbookSubmit)

	// API routes
	mux.HandleFunc("POST /api/chat", s.handleAIChat)

	// Static files
	mux.HandleFunc("/static/", s.handleStatic)

	return mux
}

// Basic handler implementations - return 200 for now
func (s *Server) handleHome(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	// Render the home template
	component := pages.Home()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleAbout(w http.ResponseWriter, r *http.Request) {
	// Render the about template
	component := pages.About()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := s.store.ListProjects()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the projects template
	component := pages.Projects(projects)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleProjectDetail(w http.ResponseWriter, r *http.Request) {
	// Extract slug from URL path
	slug := strings.TrimPrefix(r.URL.Path, "/projects/")
	if slug == "" || slug == r.URL.Path {
		http.NotFound(w, r)
		return
	}

	// Check if project exists
	project, err := s.store.GetProjectBySlug(slug)
	if err != nil || project == nil {
		http.NotFound(w, r)
		return
	}

	// Render the project detail template
	component := pages.ProjectDetail(*project)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handlePosts(w http.ResponseWriter, r *http.Request) {
	posts, err := s.store.ListPosts(0, 100) // Get first 100 posts
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the posts template
	component := pages.Posts(posts)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handlePostDetail(w http.ResponseWriter, r *http.Request) {
	// Extract slug from URL path
	slug := strings.TrimPrefix(r.URL.Path, "/posts/")
	if slug == "" || slug == r.URL.Path {
		http.NotFound(w, r)
		return
	}

	// Check if post exists
	post, err := s.store.GetPostBySlug(slug)
	if err != nil || post == nil {
		http.NotFound(w, r)
		return
	}

	// Get comments for this post
	comments, err := s.store.ListCommentsByPost(post.ID)
	if err != nil {
		// Log error but continue without comments
		comments = []*content.Comment{}
	}

	// For now, assume no like status (could be enhanced with session/cookie tracking)
	isLiked := false

	// Render the post detail template
	component := pages.PostDetail(*post, comments, isLiked)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleTalks(w http.ResponseWriter, r *http.Request) {
	talks, err := s.store.ListTalks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the talks template
	component := pages.Talks(talks)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleUses(w http.ResponseWriter, r *http.Request) {
	items, err := s.store.ListUsesItems()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the uses template
	component := pages.Uses(items)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleBooks(w http.ResponseWriter, r *http.Request) {
	books, err := s.store.ListBooks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the books template
	component := pages.Books(books)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleLife(w http.ResponseWriter, r *http.Request) {
	// Render the life template
	component := pages.Life()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleNotes(w http.ResponseWriter, r *http.Request) {
	notes, err := s.store.ListNotes()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the notes template
	component := pages.Notes(notes)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleGuestbook(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		s.handleGuestbookSubmit(w, r)
		return
	}

	entries, err := s.store.ListGuestEntries()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the guestbook template
	component := pages.Guestbook(entries)
	err = component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleKudos(w http.ResponseWriter, r *http.Request) {
	// Render the kudos template
	component := pages.Kudos()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handlePrivacy(w http.ResponseWriter, r *http.Request) {
	component := pages.Privacy()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleTerms(w http.ResponseWriter, r *http.Request) {
	component := pages.Terms()
	err := component.Render(r.Context(), w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (s *Server) handleTalkDetail(w http.ResponseWriter, r *http.Request) {
	// Handle /talks/{slug}/deck
	path := strings.TrimPrefix(r.URL.Path, "/talks/")
	if strings.HasSuffix(path, "/deck") {
		slug := strings.TrimSuffix(path, "/deck")
		if slug == "" {
			http.NotFound(w, r)
			return
		}
		component := pages.DeckViewer(slug)
		err := component.Render(r.Context(), w)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}
	http.NotFound(w, r)
}

func (s *Server) handleRSS(w http.ResponseWriter, r *http.Request) {
	posts, err := s.store.ListPosts(0, 20) // Latest 20 posts
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
  <url><loc>https://eltrovert.com/projects</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://eltrovert.com/talks</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://eltrovert.com/uses</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://eltrovert.com/books</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://eltrovert.com/life</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://eltrovert.com/notes</loc><lastmod>` + staticDate + `</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>
  <url><loc>https://eltrovert.com/guestbook</loc><lastmod>` + staticDate + `</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>
  <url><loc>https://eltrovert.com/kudos</loc><lastmod>` + staticDate + `</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>`

	for _, post := range posts {
		postDate := post.PublishedAt.Format("2006-01-02")
		sitemap += `
  <url><loc>https://eltrovert.com/posts/` + post.Slug + `</loc><lastmod>` + postDate + `</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
	}

	for _, project := range projects {
		projectDate := project.CreatedAt.Format("2006-01-02")
		sitemap += `
  <url><loc>https://eltrovert.com/projects/` + project.Slug + `</loc><lastmod>` + projectDate + `</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
	}

	sitemap += `
</urlset>`

	w.Write([]byte(sitemap))
}

func (s *Server) handlePartialPosts(w http.ResponseWriter, r *http.Request) {
	topic := r.URL.Query().Get("topic")
	if topic == "" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Partial Posts"))
		return
	}

	// Filter posts by topic
	posts, err := s.store.ListPosts(0, 100)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := ""
	for _, post := range posts {
		if post.Topic == topic {
			html += `<div class="post-item">` + post.Title + `</div>`
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handlePartialPostsSearch(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
		return
	}

	// Search posts by title or content
	posts, err := s.store.ListPosts(0, 100)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := ""
	for _, post := range posts {
		if strings.Contains(strings.ToLower(post.Title), strings.ToLower(query)) ||
		   strings.Contains(strings.ToLower(post.Description), strings.ToLower(query)) {
			html += `<div class="post-item">` + post.Title + `</div>`
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handlePartialTalks(w http.ResponseWriter, r *http.Request) {
	talkType := r.URL.Query().Get("type")
	if talkType == "" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Partial Talks"))
		return
	}

	// Filter talks by type
	talks, err := s.store.ListTalks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := ""
	for _, talk := range talks {
		if talk.TalkType == talkType {
			html += `<div class="talk-item">` + talk.Title + `</div>`
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleStatic(w http.ResponseWriter, r *http.Request) {
	// Remove the "/static/" prefix and serve from the static directory
	path := strings.TrimPrefix(r.URL.Path, "/static/")
	http.ServeFile(w, r, "./static/"+path)
}

// Form handlers
func (s *Server) handlePostActions(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the URL to determine the action
	path := r.URL.Path
	if strings.HasSuffix(path, "/comment") {
		s.handlePostComment(w, r)
		return
	}
	if strings.HasSuffix(path, "/like") {
		s.handlePostLike(w, r)
		return
	}

	http.NotFound(w, r)
}

func (s *Server) handlePostComment(w http.ResponseWriter, r *http.Request) {
	// Extract slug from URL: /posts/{slug}/comment
	slug := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/posts/"), "/comment")
	if slug == "" {
		http.NotFound(w, r)
		return
	}

	// Verify post exists
	post, err := s.store.GetPostBySlug(slug)
	if err != nil || post == nil {
		http.NotFound(w, r)
		return
	}

	// Parse form data
	r.ParseForm()
	authorName := r.FormValue("author")
	commentContent := r.FormValue("content")

	if authorName == "" || commentContent == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// Save comment to database
	comment := &content.Comment{
		PostID:     post.ID,
		AuthorName: authorName,
		Content:    commentContent,
	}
	err = s.store.CreateComment(comment)
	if err != nil {
		http.Error(w, "Failed to save comment", http.StatusInternalServerError)
		return
	}

	// Redirect back to the post
	http.Redirect(w, r, "/posts/"+slug, http.StatusSeeOther)
}

func (s *Server) handlePostLike(w http.ResponseWriter, r *http.Request) {
	// Extract slug from URL: /posts/{slug}/like
	slug := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/posts/"), "/like")
	if slug == "" {
		http.NotFound(w, r)
		return
	}

	// Verify post exists
	post, err := s.store.GetPostBySlug(slug)
	if err != nil || post == nil {
		http.NotFound(w, r)
		return
	}

	// Increment the like count
	err = s.store.IncrementPostLikes(slug)
	if err != nil {
		http.Error(w, "Failed to like post", http.StatusInternalServerError)
		return
	}

	// Redirect back to the post
	http.Redirect(w, r, "/posts/"+slug, http.StatusSeeOther)
}

func (s *Server) handleGuestbookSubmit(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse form data
	r.ParseForm()
	name := r.FormValue("name")
	message := r.FormValue("message")

	if name == "" || message == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// Save to database
	entry := &content.GuestEntry{
		Name:    name,
		Message: message,
	}
	err := s.store.CreateGuestEntry(entry)
	if err != nil {
		http.Error(w, "Failed to save guestbook entry", http.StatusInternalServerError)
		return
	}

	// Redirect back to guestbook with success
	http.Redirect(w, r, "/guestbook?success=1", http.StatusSeeOther)
}