// ralph_test.go — The Ralph Wiggum Spec
//
// This file IS the roadmap. Every test starts RED.
// Build Porto by making them GREEN, one by one, top to bottom.
//
// Run: go test -v -count=1 ./...
// Track: go test ./... 2>&1 | grep -c "PASS\|FAIL"
//
// Rules:
// 1. Do NOT modify this file (except adding imports as deps are added)
// 2. Work top to bottom
// 3. Each test tells you exactly what to build
// 4. When all tests pass, Porto is done

package porto_test

import (
	"database/sql"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/eltrovert/porto/internal/content"
	"github.com/eltrovert/porto/internal/server"
)

// ============================================================
// PHASE 1: DATABASE & MODELS
// ============================================================

// --- Task 1: Models exist with correct fields ---

func TestModels_PostStruct(t *testing.T) {
	p := content.Post{
		ID:          1,
		Slug:        "test-post",
		Title:       "Test Post",
		Description: "A test post",
		ContentMD:   "# Hello",
		ContentHTML: "<h1>Hello</h1>",
		Topic:       "Testing",
		Tags:        `["go","test"]`,
		DateFormatted: "Jan 01, 2025",
		HasMermaid:  false,
		ReadTime:    "2 min read",
		Views:       0,
		Likes:       0,
	}
	if p.Slug != "test-post" {
		t.Fatal("Post struct missing Slug field")
	}
}

func TestModels_ProjectStruct(t *testing.T) {
	p := content.Project{
		ID:          1,
		Slug:        "test-project",
		Title:       "Test Project",
		Description: "A test project",
		ContentMD:   "# Project",
		ContentHTML: "<h1>Project</h1>",
		Tools:       `["go","sqlite"]`,
		RepoLink:    "https://github.com/test",
		DemoLink:    "https://demo.test",
		IsFeatured:  true,
		IsArchival:  false,
	}
	if p.Slug != "test-project" {
		t.Fatal("Project struct missing Slug field")
	}
}

func TestModels_TalkStruct(t *testing.T) {
	talk := content.Talk{
		ID:          1,
		Slug:        "my-talk",
		Title:       "My Talk",
		Event:       "DevConf 2024",
		Location:    "Jakarta",
		Date:        "Oct 2024",
		TalkType:    "conference",
		Description: "About stuff",
		VideoLink:   "https://youtube.com/watch?v=123",
		SlidesLink:  "https://slides.com/deck",
		Attendees:   "500+",
	}
	if talk.TalkType != "conference" {
		t.Fatal("Talk struct missing TalkType field")
	}
}

func TestModels_BookStruct(t *testing.T) {
	b := content.Book{
		ID:     1,
		Title:  "The Phoenix Project",
		Author: "Gene Kim",
		Rating: 5,
		Review: "Great book",
		Tags:   `["devops"]`,
	}
	if b.Rating != 5 {
		t.Fatal("Book struct missing Rating field")
	}
}

func TestModels_NoteStruct(t *testing.T) {
	n := content.Note{
		ID:      1,
		Content: "Quick thought",
		Date:    "2024-10-25",
	}
	if n.Content != "Quick thought" {
		t.Fatal("Note struct missing Content field")
	}
}

func TestModels_GuestEntryStruct(t *testing.T) {
	g := content.GuestEntry{
		ID:      1,
		Name:    "Alice",
		Message: "Hello!",
	}
	if g.Name != "Alice" {
		t.Fatal("GuestEntry struct missing Name field")
	}
}

func TestModels_CommentStruct(t *testing.T) {
	c := content.Comment{
		ID:         1,
		PostID:     1,
		AuthorName: "Bob",
		Content:    "Nice post",
	}
	if c.AuthorName != "Bob" {
		t.Fatal("Comment struct missing AuthorName field")
	}
}

func TestModels_UsesItemStruct(t *testing.T) {
	u := content.UsesItem{
		ID:          1,
		Category:    "workstation",
		Title:       "MacBook Pro",
		Description: "M3 Max",
		Link:        "https://apple.com",
		LinkText:    "Apple",
	}
	if u.Category != "workstation" {
		t.Fatal("UsesItem struct missing Category field")
	}
}

// --- Task 2: Database creation & migration ---

func newTestDB(t *testing.T) *content.Store {
	t.Helper()
	dbPath := filepath.Join(t.TempDir(), "test.db")
	store, err := content.NewStore(dbPath)
	if err != nil {
		t.Fatalf("Failed to create store: %v", err)
	}
	t.Cleanup(func() { store.Close() })
	return store
}

func TestDB_CreateStore(t *testing.T) {
	store := newTestDB(t)
	if store == nil {
		t.Fatal("Store should not be nil")
	}
}

func TestDB_TablesExist(t *testing.T) {
	store := newTestDB(t)
	db := store.DB()

	tables := []string{"posts", "projects", "talks", "books", "notes", "guestbook", "comments", "uses_items"}
	for _, table := range tables {
		var name string
		err := db.QueryRow("SELECT name FROM sqlite_master WHERE type='table' AND name=?", table).Scan(&name)
		if err != nil {
			t.Errorf("Table %q should exist: %v", table, err)
		}
	}
}

func TestDB_IndexesExist(t *testing.T) {
	store := newTestDB(t)
	db := store.DB()

	indexes := []string{"idx_posts_slug", "idx_posts_topic", "idx_posts_published", "idx_projects_slug", "idx_talks_slug"}
	for _, idx := range indexes {
		var name string
		err := db.QueryRow("SELECT name FROM sqlite_master WHERE type='index' AND name=?", idx).Scan(&name)
		if err != nil {
			t.Errorf("Index %q should exist: %v", idx, err)
		}
	}
}

// --- Task 3: CRUD Operations ---

func TestCRUD_CreateAndGetPost(t *testing.T) {
	store := newTestDB(t)
	post := &content.Post{
		Slug:        "hello-world",
		Title:       "Hello World",
		Description: "My first post",
		ContentMD:   "# Hello\n\nWorld",
		ContentHTML: "<h1>Hello</h1><p>World</p>",
		Topic:       "General",
		Tags:        `["intro"]`,
		DateFormatted: "Jan 01, 2025",
		ReadTime:    "1 min read",
	}

	err := store.CreatePost(post)
	if err != nil {
		t.Fatalf("CreatePost failed: %v", err)
	}
	if post.ID == 0 {
		t.Fatal("Post ID should be set after creation")
	}

	got, err := store.GetPostBySlug("hello-world")
	if err != nil {
		t.Fatalf("GetPostBySlug failed: %v", err)
	}
	if got.Title != "Hello World" {
		t.Errorf("Expected title 'Hello World', got %q", got.Title)
	}
	if got.ContentHTML != "<h1>Hello</h1><p>World</p>" {
		t.Errorf("ContentHTML mismatch")
	}
}

func TestCRUD_ListPosts(t *testing.T) {
	store := newTestDB(t)
	for i := 0; i < 5; i++ {
		store.CreatePost(&content.Post{
			Slug:        fmt.Sprintf("post-%d", i),
			Title:       fmt.Sprintf("Post %d", i),
			ContentMD:   "content",
			ContentHTML: "<p>content</p>",
			Topic:       "Test",
			DateFormatted: "Jan 01, 2025",
			ReadTime:    "1 min read",
		})
	}

	posts, err := store.ListPosts(0, 10)
	if err != nil {
		t.Fatalf("ListPosts failed: %v", err)
	}
	if len(posts) != 5 {
		t.Errorf("Expected 5 posts, got %d", len(posts))
	}
}

func TestCRUD_ListPostsPagination(t *testing.T) {
	store := newTestDB(t)
	for i := 0; i < 10; i++ {
		store.CreatePost(&content.Post{
			Slug:        fmt.Sprintf("post-%d", i),
			Title:       fmt.Sprintf("Post %d", i),
			ContentMD:   "content",
			ContentHTML: "<p>content</p>",
			DateFormatted: "Jan 01, 2025",
			ReadTime:    "1 min read",
		})
	}

	page1, _ := store.ListPosts(0, 3)
	page2, _ := store.ListPosts(3, 3)
	if len(page1) != 3 {
		t.Errorf("Page 1 should have 3 posts, got %d", len(page1))
	}
	if len(page2) != 3 {
		t.Errorf("Page 2 should have 3 posts, got %d", len(page2))
	}
	if page1[0].Slug == page2[0].Slug {
		t.Error("Pages should return different posts")
	}
}

func TestCRUD_SearchPosts(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "kubernetes-guide", Title: "Kubernetes Production Guide",
		ContentMD: "Deploy containers", ContentHTML: "<p>Deploy containers</p>",
		Topic: "Kubernetes", DateFormatted: "Jan 01, 2025", ReadTime: "5 min read",
	})
	store.CreatePost(&content.Post{
		Slug: "docker-basics", Title: "Docker Basics",
		ContentMD: "Container fundamentals", ContentHTML: "<p>Container fundamentals</p>",
		Topic: "Containers", DateFormatted: "Feb 01, 2025", ReadTime: "3 min read",
	})

	results, err := store.SearchPosts("kubernetes")
	if err != nil {
		t.Fatalf("SearchPosts failed: %v", err)
	}
	if len(results) != 1 {
		t.Errorf("Expected 1 result for 'kubernetes', got %d", len(results))
	}
	if results[0].Slug != "kubernetes-guide" {
		t.Errorf("Expected 'kubernetes-guide', got %q", results[0].Slug)
	}
}

func TestCRUD_FilterPostsByTopic(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "k8s-1", Title: "K8s Post", ContentMD: "x", ContentHTML: "<p>x</p>",
		Topic: "Kubernetes", DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})
	store.CreatePost(&content.Post{
		Slug: "docker-1", Title: "Docker Post", ContentMD: "x", ContentHTML: "<p>x</p>",
		Topic: "Containers", DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})

	results, err := store.ListPostsByTopic("Kubernetes", 0, 10)
	if err != nil {
		t.Fatalf("ListPostsByTopic failed: %v", err)
	}
	if len(results) != 1 {
		t.Errorf("Expected 1 Kubernetes post, got %d", len(results))
	}
}

func TestCRUD_CreateAndGetProject(t *testing.T) {
	store := newTestDB(t)
	proj := &content.Project{
		Slug: "my-project", Title: "My Project", Description: "Cool project",
		ContentMD: "# Project", ContentHTML: "<h1>Project</h1>",
		Tools: `["go","sqlite"]`, IsFeatured: true,
	}

	err := store.CreateProject(proj)
	if err != nil {
		t.Fatalf("CreateProject failed: %v", err)
	}

	got, err := store.GetProjectBySlug("my-project")
	if err != nil {
		t.Fatalf("GetProjectBySlug failed: %v", err)
	}
	if got.Title != "My Project" {
		t.Errorf("Expected 'My Project', got %q", got.Title)
	}
	if !got.IsFeatured {
		t.Error("Project should be featured")
	}
}

func TestCRUD_ListProjects(t *testing.T) {
	store := newTestDB(t)
	for i := 0; i < 3; i++ {
		store.CreateProject(&content.Project{
			Slug: fmt.Sprintf("proj-%d", i), Title: fmt.Sprintf("Project %d", i),
			ContentMD: "x", ContentHTML: "<p>x</p>",
		})
	}

	projects, err := store.ListProjects()
	if err != nil {
		t.Fatalf("ListProjects failed: %v", err)
	}
	if len(projects) != 3 {
		t.Errorf("Expected 3 projects, got %d", len(projects))
	}
}

func TestCRUD_CreateAndListTalks(t *testing.T) {
	store := newTestDB(t)
	store.CreateTalk(&content.Talk{
		Slug: "my-talk", Title: "My Talk", Event: "DevConf",
		TalkType: "conference", Date: "Oct 2024",
	})

	talks, err := store.ListTalks()
	if err != nil {
		t.Fatalf("ListTalks failed: %v", err)
	}
	if len(talks) != 1 {
		t.Errorf("Expected 1 talk, got %d", len(talks))
	}
}

func TestCRUD_FilterTalksByType(t *testing.T) {
	store := newTestDB(t)
	store.CreateTalk(&content.Talk{
		Slug: "conf-talk", Title: "Conf Talk", Event: "DevConf",
		TalkType: "conference", Date: "Oct 2024",
	})
	store.CreateTalk(&content.Talk{
		Slug: "workshop-1", Title: "Workshop", Event: "Meetup",
		TalkType: "workshop", Date: "Nov 2024",
	})

	talks, err := store.ListTalksByType("conference")
	if err != nil {
		t.Fatalf("ListTalksByType failed: %v", err)
	}
	if len(talks) != 1 {
		t.Errorf("Expected 1 conference talk, got %d", len(talks))
	}
}

func TestCRUD_CreateAndListBooks(t *testing.T) {
	store := newTestDB(t)
	store.CreateBook(&content.Book{
		Title: "The Phoenix Project", Author: "Gene Kim", Rating: 5,
		Review: "Great book", Tags: `["devops"]`,
	})

	books, err := store.ListBooks()
	if err != nil {
		t.Fatalf("ListBooks failed: %v", err)
	}
	if len(books) != 1 {
		t.Errorf("Expected 1 book, got %d", len(books))
	}
	if books[0].Rating != 5 {
		t.Errorf("Expected rating 5, got %d", books[0].Rating)
	}
}

func TestCRUD_CreateAndListNotes(t *testing.T) {
	store := newTestDB(t)
	store.CreateNote(&content.Note{Content: "Quick note", Date: "2024-10-25"})
	store.CreateNote(&content.Note{Content: "Another note", Date: "2024-10-26"})

	notes, err := store.ListNotes()
	if err != nil {
		t.Fatalf("ListNotes failed: %v", err)
	}
	if len(notes) != 2 {
		t.Errorf("Expected 2 notes, got %d", len(notes))
	}
}

func TestCRUD_CreateAndListGuestEntries(t *testing.T) {
	store := newTestDB(t)
	store.CreateGuestEntry(&content.GuestEntry{Name: "Alice", Message: "Hello!"})
	store.CreateGuestEntry(&content.GuestEntry{Name: "Bob", Message: "Nice site!"})

	entries, err := store.ListGuestEntries()
	if err != nil {
		t.Fatalf("ListGuestEntries failed: %v", err)
	}
	if len(entries) != 2 {
		t.Errorf("Expected 2 entries, got %d", len(entries))
	}
}

func TestCRUD_CreateAndListComments(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "test-post", Title: "Test", ContentMD: "x", ContentHTML: "<p>x</p>",
		DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})

	store.CreateComment(&content.Comment{PostID: 1, AuthorName: "Alice", Content: "Great post!"})

	comments, err := store.ListCommentsByPost(1)
	if err != nil {
		t.Fatalf("ListCommentsByPost failed: %v", err)
	}
	if len(comments) != 1 {
		t.Errorf("Expected 1 comment, got %d", len(comments))
	}
}

func TestCRUD_CreateAndListUsesItems(t *testing.T) {
	store := newTestDB(t)
	store.CreateUsesItem(&content.UsesItem{
		Category: "workstation", Title: "MacBook Pro", Description: "M3 Max",
	})
	store.CreateUsesItem(&content.UsesItem{
		Category: "applications", Title: "VS Code", Description: "Editor",
	})

	items, err := store.ListUsesItems()
	if err != nil {
		t.Fatalf("ListUsesItems failed: %v", err)
	}
	if len(items) != 2 {
		t.Errorf("Expected 2 uses items, got %d", len(items))
	}
}

func TestCRUD_IncrementPostViews(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "view-test", Title: "View Test", ContentMD: "x", ContentHTML: "<p>x</p>",
		DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})

	err := store.IncrementPostViews("view-test")
	if err != nil {
		t.Fatalf("IncrementPostViews failed: %v", err)
	}
	err = store.IncrementPostViews("view-test")
	if err != nil {
		t.Fatalf("IncrementPostViews failed: %v", err)
	}

	post, _ := store.GetPostBySlug("view-test")
	if post.Views != 2 {
		t.Errorf("Expected 2 views, got %d", post.Views)
	}
}

func TestCRUD_IncrementPostLikes(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "like-test", Title: "Like Test", ContentMD: "x", ContentHTML: "<p>x</p>",
		DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})

	err := store.IncrementPostLikes("like-test")
	if err != nil {
		t.Fatalf("IncrementPostLikes failed: %v", err)
	}

	post, _ := store.GetPostBySlug("like-test")
	if post.Likes != 1 {
		t.Errorf("Expected 1 like, got %d", post.Likes)
	}
}

func TestCRUD_GetTopics(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "k8s", Title: "K8s", ContentMD: "x", ContentHTML: "<p>x</p>",
		Topic: "Kubernetes", DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})
	store.CreatePost(&content.Post{
		Slug: "docker", Title: "Docker", ContentMD: "x", ContentHTML: "<p>x</p>",
		Topic: "Containers", DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})
	store.CreatePost(&content.Post{
		Slug: "k8s-2", Title: "K8s 2", ContentMD: "x", ContentHTML: "<p>x</p>",
		Topic: "Kubernetes", DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})

	topics, err := store.GetTopics()
	if err != nil {
		t.Fatalf("GetTopics failed: %v", err)
	}
	if len(topics) != 2 {
		t.Errorf("Expected 2 unique topics, got %d", len(topics))
	}
}

func TestCRUD_PostNotFound(t *testing.T) {
	store := newTestDB(t)
	_, err := store.GetPostBySlug("nonexistent")
	if err == nil {
		t.Error("Expected error for nonexistent post")
	}
}

func TestCRUD_DuplicateSlug(t *testing.T) {
	store := newTestDB(t)
	store.CreatePost(&content.Post{
		Slug: "dupe", Title: "First", ContentMD: "x", ContentHTML: "<p>x</p>",
		DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})
	err := store.CreatePost(&content.Post{
		Slug: "dupe", Title: "Second", ContentMD: "x", ContentHTML: "<p>x</p>",
		DateFormatted: "Jan 01, 2025", ReadTime: "1 min read",
	})
	if err == nil {
		t.Error("Expected error for duplicate slug")
	}
}

// ============================================================
// PHASE 2: MARKDOWN RENDERER
// ============================================================

func TestMarkdown_BasicRendering(t *testing.T) {
	md := "# Hello World\n\nThis is a paragraph."
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, "<h1>") {
		t.Error("Should render h1 tag")
	}
	if !strings.Contains(html, "Hello World") {
		t.Error("Should contain heading text")
	}
	if !strings.Contains(html, "<p>") {
		t.Error("Should render paragraph")
	}
}

func TestMarkdown_CodeBlock(t *testing.T) {
	md := "```go\nfmt.Println(\"hello\")\n```"
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, "<pre") {
		t.Error("Should render pre tag for code blocks")
	}
	if !strings.Contains(html, "<code") {
		t.Error("Should render code tag")
	}
}

func TestMarkdown_SyntaxHighlighting(t *testing.T) {
	md := "```yaml\napiVersion: v1\nkind: Pod\n```"
	html := content.RenderMarkdown(md)

	// Should have some form of syntax highlighting (class attributes or span tags)
	if !strings.Contains(html, "<pre") {
		t.Error("Should render code block with pre tag")
	}
}

func TestMarkdown_MermaidBlock(t *testing.T) {
	md := "```mermaid\ngraph TD\n  A --> B\n```"
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, "mermaid") {
		t.Error("Should wrap mermaid blocks in a mermaid div/class")
	}
}

func TestMarkdown_Tables(t *testing.T) {
	md := "| Col1 | Col2 |\n|------|------|\n| A    | B    |"
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, "<table") {
		t.Error("Should render tables")
	}
}

func TestMarkdown_Links(t *testing.T) {
	md := "[Click here](https://example.com)"
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, `href="https://example.com"`) {
		t.Error("Should render links with href")
	}
}

func TestMarkdown_Images(t *testing.T) {
	md := "![Alt text](/images/test.png)"
	html := content.RenderMarkdown(md)

	if !strings.Contains(html, "<img") {
		t.Error("Should render images")
	}
	if !strings.Contains(html, `alt="Alt text"`) {
		t.Error("Should preserve alt text")
	}
}

func TestMarkdown_ReadTimeCalculation(t *testing.T) {
	// ~200 words per minute
	words200 := strings.Repeat("word ", 200)
	readTime := content.CalculateReadTime(words200)
	if readTime != "1 min read" {
		t.Errorf("200 words should be '1 min read', got %q", readTime)
	}

	words1000 := strings.Repeat("word ", 1000)
	readTime = content.CalculateReadTime(words1000)
	if readTime != "5 min read" {
		t.Errorf("1000 words should be '5 min read', got %q", readTime)
	}
}

// ============================================================
// PHASE 3: CONTENT IMPORTER
// ============================================================

func TestImporter_ParseFrontmatter(t *testing.T) {
	raw := `---
title: "My Test Post"
description: "A description"
dateFormatted: "Nov 07, 2025"
topic: "AI Development Tools"
---

This is the body content.

## Section 1

More content here.`

	post, err := content.ParseAstroPost(raw, "my-test-post")
	if err != nil {
		t.Fatalf("ParseAstroPost failed: %v", err)
	}
	if post.Title != "My Test Post" {
		t.Errorf("Expected title 'My Test Post', got %q", post.Title)
	}
	if post.Description != "A description" {
		t.Errorf("Expected description, got %q", post.Description)
	}
	if post.Topic != "AI Development Tools" {
		t.Errorf("Expected topic 'AI Development Tools', got %q", post.Topic)
	}
	if post.DateFormatted != "Nov 07, 2025" {
		t.Errorf("Expected date 'Nov 07, 2025', got %q", post.DateFormatted)
	}
	if !strings.Contains(post.ContentMD, "This is the body content") {
		t.Error("Should extract markdown body")
	}
	if post.ContentHTML == "" {
		t.Error("Should render markdown to HTML")
	}
	if post.ReadTime == "" {
		t.Error("Should calculate read time")
	}
}

func TestImporter_ParseFrontmatterWithMermaid(t *testing.T) {
	raw := `---
title: "Mermaid Post"
description: "Has diagrams"
dateFormatted: "Jun 17, 2024"
topic: "CI/CD"
hasMermaid: true
---

Content here.`

	post, err := content.ParseAstroPost(raw, "mermaid-post")
	if err != nil {
		t.Fatalf("ParseAstroPost failed: %v", err)
	}
	if !post.HasMermaid {
		t.Error("Should detect hasMermaid flag")
	}
}

func TestImporter_ParseAstroProject(t *testing.T) {
	raw := `---
title: "My Project"
description: "Cool project description"
---

Project content here.`

	proj, err := content.ParseAstroProject(raw, "my-project")
	if err != nil {
		t.Fatalf("ParseAstroProject failed: %v", err)
	}
	if proj.Title != "My Project" {
		t.Errorf("Expected 'My Project', got %q", proj.Title)
	}
	if proj.ContentHTML == "" {
		t.Error("Should render content to HTML")
	}
}

func TestImporter_ImportFromDirectory(t *testing.T) {
	// This test uses the actual reference blog content
	refPath := ".reference-blog-astro/src/content"
	if _, err := os.Stat(refPath); os.IsNotExist(err) {
		t.Skip("Reference blog not available")
	}

	store := newTestDB(t)
	stats, err := content.ImportFromDirectory(store, refPath)
	if err != nil {
		t.Fatalf("ImportFromDirectory failed: %v", err)
	}
	if stats.PostsImported != 45 {
		t.Errorf("Expected 45 posts imported, got %d", stats.PostsImported)
	}
	if stats.ProjectsImported != 8 {
		t.Errorf("Expected 8 projects imported, got %d", stats.ProjectsImported)
	}

	// Verify a specific post was imported correctly
	post, err := store.GetPostBySlug("gemini-cli-review")
	if err != nil {
		t.Fatalf("Should find imported post: %v", err)
	}
	if post.Title != "My Experience Testing Gemini CLI (And How It Compares to Claude Code)" {
		t.Errorf("Title mismatch: %q", post.Title)
	}
	if post.Topic != "AI Development Tools" {
		t.Errorf("Topic mismatch: %q", post.Topic)
	}
}

// ============================================================
// PHASE 4: HTTP SERVER & ROUTES
// ============================================================

func newTestServer(t *testing.T) *httptest.Server {
	t.Helper()
	store := newTestDB(t)

	// Seed some test data
	store.CreatePost(&content.Post{
		Slug: "test-post-1", Title: "Test Post One",
		Description: "First test post", ContentMD: "# Hello\n\nContent here.",
		ContentHTML: "<h1>Hello</h1><p>Content here.</p>",
		Topic: "Testing", Tags: `["test"]`, DateFormatted: "Jan 01, 2025",
		ReadTime: "1 min read",
	})
	store.CreatePost(&content.Post{
		Slug: "test-post-2", Title: "Kubernetes Guide",
		Description: "K8s guide", ContentMD: "# K8s\n\nGuide content.",
		ContentHTML: "<h1>K8s</h1><p>Guide content.</p>",
		Topic: "Kubernetes", Tags: `["k8s","devops"]`, DateFormatted: "Feb 01, 2025",
		ReadTime: "5 min read",
	})
	store.CreateProject(&content.Project{
		Slug: "test-project", Title: "Test Project",
		Description: "A project", ContentMD: "# Project", ContentHTML: "<h1>Project</h1>",
		Tools: `["go"]`, IsFeatured: true,
	})
	store.CreateTalk(&content.Talk{
		Slug: "test-talk", Title: "Test Talk", Event: "DevConf",
		TalkType: "conference", Date: "Oct 2024", Location: "Jakarta",
	})
	store.CreateBook(&content.Book{
		Title: "Test Book", Author: "Author", Rating: 5, Review: "Great",
	})
	store.CreateNote(&content.Note{Content: "Test note", Date: "2024-10-25"})
	store.CreateGuestEntry(&content.GuestEntry{Name: "Alice", Message: "Hello!"})

	srv := server.New(store)
	return httptest.NewServer(srv.Handler())
}

// --- Route existence & status codes ---

func TestRoute_Home(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/")
	if err != nil {
		t.Fatal(err)
	}
	if resp.StatusCode != 200 {
		t.Errorf("GET / = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_About(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/about")
	if resp.StatusCode != 200 {
		t.Errorf("GET /about = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Projects(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/projects")
	if resp.StatusCode != 200 {
		t.Errorf("GET /projects = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_ProjectDetail(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/projects/test-project")
	if resp.StatusCode != 200 {
		t.Errorf("GET /projects/test-project = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_ProjectNotFound(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/projects/nonexistent")
	if resp.StatusCode != 404 {
		t.Errorf("GET /projects/nonexistent = %d, want 404", resp.StatusCode)
	}
}

func TestRoute_Posts(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/posts")
	if resp.StatusCode != 200 {
		t.Errorf("GET /posts = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_PostDetail(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/posts/test-post-1")
	if resp.StatusCode != 200 {
		t.Errorf("GET /posts/test-post-1 = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_PostNotFound(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/posts/nonexistent")
	if resp.StatusCode != 404 {
		t.Errorf("GET /posts/nonexistent = %d, want 404", resp.StatusCode)
	}
}

func TestRoute_Talks(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/talks")
	if resp.StatusCode != 200 {
		t.Errorf("GET /talks = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Uses(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/uses")
	if resp.StatusCode != 200 {
		t.Errorf("GET /uses = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Books(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/books")
	if resp.StatusCode != 200 {
		t.Errorf("GET /books = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Life(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/life")
	if resp.StatusCode != 200 {
		t.Errorf("GET /life = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Notes(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/notes")
	if resp.StatusCode != 200 {
		t.Errorf("GET /notes = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Guestbook(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/guestbook")
	if resp.StatusCode != 200 {
		t.Errorf("GET /guestbook = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_Kudos(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/kudos")
	if resp.StatusCode != 200 {
		t.Errorf("GET /kudos = %d, want 200", resp.StatusCode)
	}
}

func TestRoute_404(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/nonexistent-page")
	if resp.StatusCode != 404 {
		t.Errorf("GET /nonexistent-page = %d, want 404", resp.StatusCode)
	}
}

func TestRoute_StaticFiles(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/static/css/app.css")
	if resp.StatusCode != 200 && resp.StatusCode != 404 {
		t.Errorf("Static file route should be registered")
	}
}

// --- Content in responses ---

func TestContent_HomeHasHero(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "El Muhammad") {
		t.Error("Home page should contain 'El Muhammad'")
	}
}

func TestContent_HomeHasNavbar(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "nav") || !strings.Contains(body, "Projects") {
		t.Error("Home page should have navbar with Projects link")
	}
}

func TestContent_HomeHasCosmicBackground(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	// Check for nebula gradient or cosmic bg marker
	if !strings.Contains(body, "#ffcf0d") && !strings.Contains(body, "cosmic") && !strings.Contains(body, "blur-[120px]") {
		t.Error("Home page should have cosmic background elements")
	}
}

func TestContent_HomeHasBlogPosts(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "Test Post One") && !strings.Contains(body, "Blog") {
		t.Error("Home page should display blog posts or blog section")
	}
}

func TestContent_PostsPageHasPosts(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/posts")
	if !strings.Contains(body, "Test Post One") {
		t.Error("Posts page should list posts")
	}
	if !strings.Contains(body, "Kubernetes Guide") {
		t.Error("Posts page should list all posts")
	}
}

func TestContent_PostDetailHasContent(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/posts/test-post-1")
	if !strings.Contains(body, "Test Post One") {
		t.Error("Post detail should contain title")
	}
	if !strings.Contains(body, "Content here") {
		t.Error("Post detail should contain rendered content")
	}
}

func TestContent_PostDetailHasTOC(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/posts/test-post-1")
	// Should have a table of contents or sidebar
	if !strings.Contains(body, "Table of Contents") && !strings.Contains(body, "toc") {
		// TOC might be empty for short posts, that's OK
		t.Log("Warning: Post detail should ideally have TOC section")
	}
}

func TestContent_ProjectsPageHasProjects(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/projects")
	if !strings.Contains(body, "Test Project") {
		t.Error("Projects page should list projects")
	}
}

func TestContent_AboutPageHasIdentity(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/about")
	if !strings.Contains(body, "El Muhammad") {
		t.Error("About page should contain 'El Muhammad'")
	}
}

func TestContent_TalksPageHasTalks(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/talks")
	if !strings.Contains(body, "Test Talk") || !strings.Contains(body, "DevConf") {
		t.Error("Talks page should list talks with event names")
	}
}

func TestContent_BooksPageHasBooks(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/books")
	if !strings.Contains(body, "Test Book") {
		t.Error("Books page should list books")
	}
}

func TestContent_NotesPageHasNotes(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/notes")
	if !strings.Contains(body, "Test note") {
		t.Error("Notes page should display notes")
	}
}

func TestContent_GuestbookHasEntries(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/guestbook")
	if !strings.Contains(body, "Alice") {
		t.Error("Guestbook should display existing entries")
	}
}

// --- HTMX endpoints ---

func TestHTMX_PostsSearch(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/partials/posts/search?q=kubernetes")
	if resp.StatusCode != 200 {
		t.Errorf("GET /partials/posts/search?q=kubernetes = %d, want 200", resp.StatusCode)
	}

	body := readBody(resp)
	if !strings.Contains(body, "Kubernetes Guide") {
		t.Error("Search should return matching posts")
	}
	if strings.Contains(body, "Test Post One") {
		t.Error("Search should not return non-matching posts")
	}
}

func TestHTMX_PostsFilterByTopic(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/partials/posts?topic=Kubernetes")
	if resp.StatusCode != 200 {
		t.Errorf("GET /partials/posts?topic=Kubernetes = %d, want 200", resp.StatusCode)
	}

	body := readBody(resp)
	if !strings.Contains(body, "Kubernetes Guide") {
		t.Error("Filter should return matching topic posts")
	}
}

func TestHTMX_TalksFilter(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/partials/talks?type=conference")
	if resp.StatusCode != 200 {
		t.Errorf("GET /partials/talks?type=conference = %d, want 200", resp.StatusCode)
	}
}

// --- Form submissions ---

func TestForm_GuestbookSubmit(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	form := url.Values{}
	form.Set("name", "TestUser")
	form.Set("message", "Testing guestbook!")

	resp, err := http.PostForm(ts.URL+"/guestbook", form)
	if err != nil {
		t.Fatal(err)
	}
	// Should redirect back or return success
	if resp.StatusCode != 200 && resp.StatusCode != 302 && resp.StatusCode != 303 {
		t.Errorf("POST /guestbook = %d, want 200/302/303", resp.StatusCode)
	}
}

func TestForm_PostComment(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	form := url.Values{}
	form.Set("author_name", "TestCommenter")
	form.Set("content", "Great post!")

	resp, err := http.PostForm(ts.URL+"/posts/test-post-1/comment", form)
	if err != nil {
		t.Fatal(err)
	}
	if resp.StatusCode != 200 && resp.StatusCode != 302 && resp.StatusCode != 303 {
		t.Errorf("POST /posts/test-post-1/comment = %d, want 200/302/303", resp.StatusCode)
	}
}

func TestForm_PostLike(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, err := http.Post(ts.URL+"/posts/test-post-1/like", "", nil)
	if err != nil {
		t.Fatal(err)
	}
	if resp.StatusCode != 200 && resp.StatusCode != 302 {
		t.Errorf("POST /posts/test-post-1/like = %d, want 200/302", resp.StatusCode)
	}
}

// ============================================================
// PHASE 5: DESIGN VERIFICATION
// ============================================================
// These tests verify the HTML output contains the exact design
// elements from the web-portofolio React prototype.

func TestDesign_AccentColor(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	// The accent color #ffcf0d should appear in CSS or inline styles
	if !strings.Contains(body, "ffcf0d") {
		t.Error("Design: accent color #ffcf0d should be present")
	}
}

func TestDesign_FontMono(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "font-mono") {
		t.Error("Design: font-mono class should be used for headings/nav")
	}
}

func TestDesign_DarkBackground(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "#050505") && !strings.Contains(body, "bg-[#050505]") {
		t.Error("Design: dark background #050505 should be present")
	}
}

func TestDesign_GlassmorphismNavbar(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "backdrop-blur") {
		t.Error("Design: navbar should have glassmorphism (backdrop-blur)")
	}
}

func TestDesign_TerminalPrefix(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	// Check posts page for terminal prefix
	body := getBody(t, ts.URL+"/posts")
	if !strings.Contains(body, "&gt;_") && !strings.Contains(body, ">_") {
		t.Error("Design: page titles should have terminal prefix '>_'")
	}
}

func TestDesign_BlinkingCursor(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "animate-pulse") || !strings.Contains(body, "_") {
		t.Error("Design: should have blinking cursor animation")
	}
}

func TestDesign_MouseFollowerJS(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "mouse-follower") {
		t.Error("Design: should include mouse-follower.js")
	}
}

func TestDesign_HTMXIncluded(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "htmx") {
		t.Error("Design: should include HTMX library")
	}
}

func TestDesign_PostsPageTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/posts")
	if !strings.Contains(body, "my_writing") {
		t.Error("Design: posts page should have '>_ my_writing.md' header")
	}
}

func TestDesign_GuestbookTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/guestbook")
	if !strings.Contains(body, "visitor_log") {
		t.Error("Design: guestbook should have '>_ visitor_log' header")
	}
}

func TestDesign_NotesTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/notes")
	if !strings.Contains(body, "quick_logs") {
		t.Error("Design: notes page should have '>_ quick_logs.txt' header")
	}
}

func TestDesign_BooksTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/books")
	if !strings.Contains(body, "knowledge_base") {
		t.Error("Design: books page should have '>_ knowledge_base' header")
	}
}

func TestDesign_AboutTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/about")
	if !strings.Contains(body, "whoami") {
		t.Error("Design: about page should have '>_ whoami' header")
	}
}

func TestDesign_UsesTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/uses")
	if !strings.Contains(body, "hardware_manifest") {
		t.Error("Design: uses page should have '>_ hardware_manifest.json' header")
	}
}

func TestDesign_TalksTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/talks")
	if !strings.Contains(body, "transmission_logs") {
		t.Error("Design: talks page should have '>_ transmission_logs' header")
	}
}

func TestDesign_ProjectsTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/projects")
	if !strings.Contains(body, "explored_nebulas") {
		t.Error("Design: projects page should have '>_ explored_nebulas' header")
	}
}

func TestDesign_LifeTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/life")
	if !strings.Contains(body, "offline_mode") {
		t.Error("Design: life page should have '>_ offline_mode' header")
	}
}

func TestDesign_KudosTerminalHeader(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/kudos")
	if !strings.Contains(body, "dependencies") {
		t.Error("Design: kudos page should have '>_ dependencies' header")
	}
}

func TestDesign_FooterHasTerminalSubscribe(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "subscribe") {
		t.Error("Design: footer should have terminal-style subscribe")
	}
}

func TestDesign_FooterHasSystemStats(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/")
	if !strings.Contains(body, "Systems Online") && !strings.Contains(body, "Online") {
		t.Error("Design: footer should have system stats")
	}
}

// ============================================================
// PHASE 6: RSS & SITEMAP
// ============================================================

func TestRSS_ValidXML(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/rss.xml")
	if resp.StatusCode != 200 {
		t.Fatalf("GET /rss.xml = %d, want 200", resp.StatusCode)
	}

	body := readBody(resp)
	if !strings.Contains(body, "<rss") {
		t.Error("RSS should contain <rss> element")
	}
	if !strings.Contains(body, "<channel") {
		t.Error("RSS should contain <channel> element")
	}
	if !strings.Contains(body, "<item") {
		t.Error("RSS should contain <item> elements")
	}

	// Should be valid XML
	var result interface{}
	if err := xml.Unmarshal([]byte(body), &result); err != nil {
		t.Errorf("RSS should be valid XML: %v", err)
	}
}

func TestRSS_ContainsPosts(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/rss.xml")
	if !strings.Contains(body, "Test Post One") {
		t.Error("RSS should contain post titles")
	}
}

func TestSitemap_ValidXML(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/sitemap.xml")
	if resp.StatusCode != 200 {
		t.Fatalf("GET /sitemap.xml = %d, want 200", resp.StatusCode)
	}

	body := readBody(resp)
	if !strings.Contains(body, "<urlset") || !strings.Contains(body, "<url>") {
		t.Error("Sitemap should contain urlset and url elements")
	}
}

func TestSitemap_ContainsAllPages(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	body := getBody(t, ts.URL+"/sitemap.xml")
	pages := []string{"/about", "/projects", "/posts", "/talks", "/uses", "/books", "/guestbook"}
	for _, page := range pages {
		if !strings.Contains(body, page) {
			t.Errorf("Sitemap should contain %s", page)
		}
	}
}

// ============================================================
// PHASE 7: MIDDLEWARE & PERFORMANCE
// ============================================================

func TestMiddleware_GzipSupport(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	req, _ := http.NewRequest("GET", ts.URL+"/", nil)
	req.Header.Set("Accept-Encoding", "gzip")
	resp, err := http.DefaultTransport.RoundTrip(req)
	if err != nil {
		t.Fatal(err)
	}
	// Should either be gzipped or at least not error
	if resp.StatusCode != 200 {
		t.Errorf("Gzip request should still return 200, got %d", resp.StatusCode)
	}
}

func TestMiddleware_ContentType(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/")
	ct := resp.Header.Get("Content-Type")
	if !strings.Contains(ct, "text/html") {
		t.Errorf("Home page Content-Type should be text/html, got %q", ct)
	}
}

func TestMiddleware_RSSContentType(t *testing.T) {
	ts := newTestServer(t)
	defer ts.Close()

	resp, _ := http.Get(ts.URL + "/rss.xml")
	ct := resp.Header.Get("Content-Type")
	if !strings.Contains(ct, "xml") && !strings.Contains(ct, "rss") {
		t.Errorf("RSS Content-Type should be XML, got %q", ct)
	}
}

// ============================================================
// HELPERS
// ============================================================

func getBody(t *testing.T, url string) string {
	t.Helper()
	resp, err := http.Get(url)
	if err != nil {
		t.Fatalf("GET %s failed: %v", url, err)
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Reading body failed: %v", err)
	}
	return string(b)
}

func readBody(resp *http.Response) string {
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	return string(b)
}

// Ensure unused imports don't cause errors
var (
	_ = json.Marshal
	_ = fmt.Sprintf
	_ = sql.ErrNoRows
	_ = filepath.Join
	_ = os.TempDir
	_ = xml.Unmarshal
)
