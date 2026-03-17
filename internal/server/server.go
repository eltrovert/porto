package server

import (
	"net/http"
	"strings"

	"github.com/eltrovert/porto/internal/content"
	"github.com/eltrovert/porto/templates/pages"
)

// Common HTML template functions
func htmlHeader(title, activeNav string) string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>` + title + ` - El Muhammad</title>
	<script src="https://unpkg.com/htmx.org@1.9.10"></script>
	<script src="https://cdn.tailwindcss.com"></script>
	<style>
		.cosmic-background { background: #050505; }
		.accent { color: #ffcf0d; }
		.font-mono { font-family: monospace; }
		.backdrop-blur { backdrop-filter: blur(16px); }
		@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
		.animate-pulse { animation: pulse 1s infinite; }
	</style>
	<script>
		// Mouse follower script
		document.addEventListener('DOMContentLoaded', function() {
			const cursor = document.createElement('div');
			cursor.className = 'mouse-follower';
			cursor.style.cssText = 'position: fixed; width: 8px; height: 8px; background: #ffcf0d; border-radius: 50%; pointer-events: none; z-index: 9999; mix-blend-mode: difference;';
			document.body.appendChild(cursor);

			const ring = document.createElement('div');
			ring.style.cssText = 'position: fixed; width: 32px; height: 32px; border: 1px solid rgba(255, 207, 13, 0.5); border-radius: 50%; pointer-events: none; z-index: 9998;';
			document.body.appendChild(ring);

			document.addEventListener('mousemove', function(e) {
				cursor.style.left = (e.clientX - 4) + 'px';
				cursor.style.top = (e.clientY - 4) + 'px';
				ring.style.left = (e.clientX - 16) + 'px';
				ring.style.top = (e.clientY - 16) + 'px';
			});
		});
	</script>
</head>
<body class="cosmic-background min-h-screen text-white font-mono">
	<!-- Glassmorphism Navbar -->
	<nav class="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
		<div class="bg-black/90 backdrop-blur border border-white/10 rounded px-6 py-3 flex items-center space-x-6">
			<span class="font-bold text-white">eltrovert.com<span class="animate-pulse text-accent ml-1">_</span></span>
			<a href="/" class="` + navClass("home", activeNav) + `">Home</a>
			<a href="/projects" class="` + navClass("projects", activeNav) + `">Projects</a>
			<a href="/posts" class="` + navClass("posts", activeNav) + `">Posts</a>
			<a href="/about" class="` + navClass("about", activeNav) + `">About</a>
		</div>
	</nav>

	<main class="pt-32 min-h-screen px-4 max-w-6xl mx-auto">`
}

func navClass(nav, activeNav string) string {
	if nav == activeNav {
		return "text-accent"
	}
	return "text-gray-400 hover:text-white"
}

func htmlFooter() string {
	return `	</main>

	<!-- Terminal Footer -->
	<footer class="bg-black/80 border-t border-white/5 p-8 mt-16">
		<div class="max-w-7xl mx-auto">
			<div class="flex items-center bg-black border border-white/10 rounded px-4 py-2 mb-6 max-w-md">
				<span class="text-green-500 mr-2">➜</span>
				<input type="email" placeholder="./subscribe.sh --email" class="bg-transparent text-gray-300 flex-1 outline-none">
				<button class="text-accent font-bold ml-2">[ENTER]</button>
			</div>
			<div class="flex justify-between items-center text-xs text-gray-600">
				<div class="flex items-center gap-4">
					<span class="flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
						Systems Online
					</span>
				</div>
				<span>© 2026 El Muhammad</span>
			</div>
		</div>
	</footer>
</body>
</html>`
}

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
      <title>` + post.Title + `</title>
      <description>` + post.Description + `</description>
      <link>https://eltrovert.com/posts/` + post.Slug + `</link>
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

	sitemap := `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://eltrovert.com/</loc></url>
  <url><loc>https://eltrovert.com/about</loc></url>
  <url><loc>https://eltrovert.com/posts</loc></url>
  <url><loc>https://eltrovert.com/projects</loc></url>
  <url><loc>https://eltrovert.com/talks</loc></url>
  <url><loc>https://eltrovert.com/uses</loc></url>
  <url><loc>https://eltrovert.com/books</loc></url>
  <url><loc>https://eltrovert.com/life</loc></url>
  <url><loc>https://eltrovert.com/notes</loc></url>
  <url><loc>https://eltrovert.com/guestbook</loc></url>
  <url><loc>https://eltrovert.com/kudos</loc></url>`

	for _, post := range posts {
		sitemap += `
  <url><loc>https://eltrovert.com/posts/` + post.Slug + `</loc></url>`
	}

	for _, project := range projects {
		sitemap += `
  <url><loc>https://eltrovert.com/projects/` + project.Slug + `</loc></url>`
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
	authorName := r.FormValue("author_name")
	content := r.FormValue("content")

	if authorName == "" || content == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// In a real implementation, we'd save the comment to the database
	// For now, just return success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Comment added"))
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

	// In a real implementation, we'd increment the like count
	// For now, just return success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Like added"))
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

	// In a real implementation, we'd save to the database
	// For now, just return success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Guestbook entry added"))
}