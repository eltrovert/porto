package server

import (
	"net/http"
	"strings"

	"github.com/eltrovert/porto/internal/content"
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

	html := htmlHeader("Portfolio", "home") + `
		<div class="text-center mb-16">
			<h1 class="text-6xl font-bold mb-4">El Muhammad<span class="animate-pulse text-accent ml-2">_</span></h1>
			<p class="text-xl text-gray-400">Senior DevOps & Cloud Architect</p>
		</div>
		<section class="blog-posts max-w-4xl mx-auto">
			<h2 class="text-3xl font-bold mb-8">Latest Blog Posts</h2>
			<!-- Blog posts would be listed here -->
		</section>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleAbout(w http.ResponseWriter, r *http.Request) {
	html := htmlHeader("About", "about") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> whoami
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<div class="bg-black/40 border border-white/10 p-8 rounded max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold mb-4 text-accent">El Muhammad</h2>
			<p class="text-gray-300 text-lg">Senior DevOps & Cloud Architect passionate about building scalable infrastructure.</p>
		</div>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := s.store.ListProjects()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := htmlHeader("Projects", "projects") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> explored_nebulas
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4">`

	for _, project := range projects {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<a href="/projects/` + project.Slug + `" class="text-accent hover:text-white transition-colors">` + project.Title + `</a>
		</li>`
	}

	html += `</ul>` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
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

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Project Detail"))
}

func (s *Server) handlePosts(w http.ResponseWriter, r *http.Request) {
	posts, err := s.store.ListPosts(0, 100) // Get first 100 posts
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := htmlHeader("Posts", "posts") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> my_writing.md
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4">`

	for _, post := range posts {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<a href="/posts/` + post.Slug + `" class="text-accent hover:text-white transition-colors">` + post.Title + `</a>
		</li>`
	}

	html += `</ul>` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
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

	html := `<!DOCTYPE html>
<html>
<head><title>` + post.Title + `</title></head>
<body>
	<h1>` + post.Title + `</h1>
	<div class="content">` + post.ContentHTML + `</div>
</body>
</html>`

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleTalks(w http.ResponseWriter, r *http.Request) {
	talks, err := s.store.ListTalks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := htmlHeader("Talks", "talks") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> transmission_logs
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4">`

	for _, talk := range talks {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<h3 class="text-accent font-bold">` + talk.Title + `</h3>
			<p class="text-gray-400">` + talk.Event + `</p>
		</li>`
	}

	html += `</ul>` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleUses(w http.ResponseWriter, r *http.Request) {
	html := htmlHeader("Uses", "uses") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> hardware_manifest.json
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<div class="bg-black/40 border border-white/10 p-8 rounded max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold mb-4 text-accent">What I Use</h2>
			<p class="text-gray-300">Tools and hardware I rely on.</p>
		</div>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleBooks(w http.ResponseWriter, r *http.Request) {
	books, err := s.store.ListBooks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := htmlHeader("Books", "books") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> knowledge_base
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4">`

	for _, book := range books {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<h3 class="text-accent font-bold">` + book.Title + `</h3>
			<p class="text-gray-400">by ` + book.Author + `</p>
		</li>`
	}

	html += `</ul>` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleLife(w http.ResponseWriter, r *http.Request) {
	html := htmlHeader("Life", "life") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> offline_mode
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<div class="bg-black/40 border border-white/10 p-8 rounded max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold mb-4 text-accent">Life Outside Tech</h2>
			<p class="text-gray-300">My hobbies and interests.</p>
		</div>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleNotes(w http.ResponseWriter, r *http.Request) {
	notes, err := s.store.ListNotes()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	html := htmlHeader("Notes", "notes") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> quick_logs.txt
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4">`

	for _, note := range notes {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<p class="text-gray-300">` + note.Content + `</p>
		</li>`
	}

	html += `</ul>` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
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

	html := htmlHeader("Guestbook", "guestbook") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> visitor_log
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<ul class="space-y-4 mb-8">`

	for _, entry := range entries {
		html += `<li class="bg-black/40 border border-white/10 p-4 rounded">
			<p class="text-accent font-bold">` + entry.Name + `:</p>
			<p class="text-gray-300">` + entry.Message + `</p>
		</li>`
	}

	html += `</ul>
		<div class="bg-black/40 border border-white/10 p-6 rounded max-w-2xl mx-auto">
			<form method="POST" class="space-y-4">
				<input type="text" name="name" placeholder="Your name" required
					class="w-full p-3 bg-black border border-white/10 rounded text-white">
				<textarea name="message" placeholder="Your message" required
					class="w-full p-3 bg-black border border-white/10 rounded text-white h-24"></textarea>
				<button type="submit"
					class="w-full bg-accent text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors">
					Add Entry
				</button>
			</form>
		</div>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

func (s *Server) handleKudos(w http.ResponseWriter, r *http.Request) {
	html := htmlHeader("Kudos", "kudos") + `
		<h1 class="text-5xl font-bold mb-8 text-center">
			<span class="text-accent">&gt;_</span> dependencies
			<span class="animate-pulse text-accent ml-2">_</span>
		</h1>
		<div class="bg-black/40 border border-white/10 p-8 rounded max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold mb-4 text-accent">Kudos</h2>
			<p class="text-gray-300">Credits and thanks to the amazing tools and people that make this possible.</p>
		</div>
	` + htmlFooter()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
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
	http.NotFound(w, r)
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