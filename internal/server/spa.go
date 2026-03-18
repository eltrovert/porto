package server

import (
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// SPAHandler serves the React SPA from the frontend directory.
// For any non-API, non-file request, it serves index.html (client-side routing).
type SPAHandler struct {
	frontendDir string
	fileServer  http.Handler
}

func NewSPAHandler(frontendDir string) *SPAHandler {
	return &SPAHandler{
		frontendDir: frontendDir,
		fileServer:  http.FileServer(http.Dir(frontendDir)),
	}
}

func (h *SPAHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Clean the path
	path := filepath.Clean(r.URL.Path)
	if path == "." {
		path = "/"
	}

	// Check if the file exists on disk
	fullPath := filepath.Join(h.frontendDir, path)
	info, err := os.Stat(fullPath)

	if err == nil && !info.IsDir() {
		// File exists — serve it directly with proper content type
		ext := filepath.Ext(path)
		switch ext {
		case ".js":
			w.Header().Set("Content-Type", "application/javascript")
		case ".css":
			w.Header().Set("Content-Type", "text/css")
		case ".png":
			w.Header().Set("Content-Type", "image/png")
		case ".jpg", ".jpeg":
			w.Header().Set("Content-Type", "image/jpeg")
		case ".svg":
			w.Header().Set("Content-Type", "image/svg+xml")
		case ".ico":
			w.Header().Set("Content-Type", "image/x-icon")
		case ".woff2":
			w.Header().Set("Content-Type", "font/woff2")
		case ".woff":
			w.Header().Set("Content-Type", "font/woff")
		}

		// Cache static assets (hashed filenames)
		if strings.HasPrefix(path, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}

		h.fileServer.ServeHTTP(w, r)
		return
	}

	// For directories or missing files, serve index.html (SPA fallback)
	indexPath := filepath.Join(h.frontendDir, "index.html")
	if _, err := os.Stat(indexPath); err != nil {
		http.Error(w, "Frontend not found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, indexPath)
}

// EmbeddedSPAHandler serves the SPA from an embedded filesystem (for single-binary deploys)
type EmbeddedSPAHandler struct {
	fsys       fs.FS
	fileServer http.Handler
}

func NewEmbeddedSPAHandler(fsys fs.FS) *EmbeddedSPAHandler {
	return &EmbeddedSPAHandler{
		fsys:       fsys,
		fileServer: http.FileServer(http.FS(fsys)),
	}
}

func (h *EmbeddedSPAHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/")
	if path == "" {
		path = "index.html"
	}

	// Try to open the file
	f, err := h.fsys.Open(path)
	if err == nil {
		f.Close()
		// File exists — serve it
		ext := filepath.Ext(path)
		switch ext {
		case ".js":
			w.Header().Set("Content-Type", "application/javascript")
		case ".css":
			w.Header().Set("Content-Type", "text/css")
		}
		if strings.HasPrefix(path, "assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}
		h.fileServer.ServeHTTP(w, r)
		return
	}

	// SPA fallback — serve index.html
	w.Header().Set("Content-Type", "text/html")
	indexData, err := fs.ReadFile(h.fsys, "index.html")
	if err != nil {
		http.Error(w, "Frontend not found", http.StatusInternalServerError)
		return
	}
	w.Write(indexData)
}
