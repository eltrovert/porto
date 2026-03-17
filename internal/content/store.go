package content

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3" // SQLite driver
)

// Store handles content persistence using SQLite
type Store struct {
	db *sql.DB
}

// NewStore creates a new store instance
func NewStore(dbPath string) (*Store, error) {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	store := &Store{db: db}
	if err := store.createTables(); err != nil {
		return nil, err
	}

	return store, nil
}

// DB returns the underlying database connection
func (s *Store) DB() *sql.DB {
	return s.db
}

// Close closes the database connection
func (s *Store) Close() error {
	return s.db.Close()
}

// createTables creates all necessary tables
func (s *Store) createTables() error {
	schema := `
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content_md TEXT NOT NULL,
    content_html TEXT NOT NULL,
    topic TEXT,
    tags TEXT,
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

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content_md TEXT NOT NULL,
    content_html TEXT NOT NULL,
    tools TEXT,
    cover_image TEXT,
    repo_link TEXT,
    demo_link TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_archival BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS talks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    event TEXT NOT NULL,
    location TEXT,
    date TEXT,
    talk_type TEXT,
    description TEXT,
    video_link TEXT,
    slides_link TEXT,
    thumbnail TEXT,
    attendees TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT,
    rating INTEGER DEFAULT 0,
    review TEXT,
    tags TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    project_id INTEGER,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS uses_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    link_text TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_topic ON posts(topic);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_talks_slug ON talks(slug);
`

	_, err := s.db.Exec(schema)
	return err
}

// CreatePost creates a new post in the database
func (s *Store) CreatePost(post *Post) error {
	query := `
INSERT INTO posts (slug, title, description, content_md, content_html, topic, tags, date_formatted, published_at, has_mermaid, cover_image, read_time, views, likes)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
	result, err := s.db.Exec(query,
		post.Slug, post.Title, post.Description, post.ContentMD, post.ContentHTML,
		post.Topic, post.Tags, post.DateFormatted, post.PublishedAt, post.HasMermaid,
		post.CoverImage, post.ReadTime, post.Views, post.Likes)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	post.ID = int(id)
	return nil
}

// GetPostBySlug retrieves a post by its slug
func (s *Store) GetPostBySlug(slug string) (*Post, error) {
	post := &Post{}
	query := `
SELECT id, slug, title, description, content_md, content_html, topic, tags, date_formatted, published_at, has_mermaid, cover_image, read_time, views, likes, created_at, updated_at
FROM posts WHERE slug = ?
`
	err := s.db.QueryRow(query, slug).Scan(
		&post.ID, &post.Slug, &post.Title, &post.Description, &post.ContentMD, &post.ContentHTML,
		&post.Topic, &post.Tags, &post.DateFormatted, &post.PublishedAt, &post.HasMermaid,
		&post.CoverImage, &post.ReadTime, &post.Views, &post.Likes, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return post, nil
}

// ListPosts returns a list of posts with pagination
func (s *Store) ListPosts(offset, limit int) ([]*Post, error) {
	query := `
SELECT id, slug, title, description, content_md, content_html, topic, tags, date_formatted, published_at, has_mermaid, cover_image, read_time, views, likes, created_at, updated_at
FROM posts ORDER BY published_at DESC LIMIT ? OFFSET ?
`
	rows, err := s.db.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		post := &Post{}
		err := rows.Scan(
			&post.ID, &post.Slug, &post.Title, &post.Description, &post.ContentMD, &post.ContentHTML,
			&post.Topic, &post.Tags, &post.DateFormatted, &post.PublishedAt, &post.HasMermaid,
			&post.CoverImage, &post.ReadTime, &post.Views, &post.Likes, &post.CreatedAt, &post.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}

// SearchPosts searches for posts by query
func (s *Store) SearchPosts(query string) ([]*Post, error) {
	searchQuery := `
SELECT id, slug, title, description, content_md, content_html, topic, tags, date_formatted, published_at, has_mermaid, cover_image, read_time, views, likes, created_at, updated_at
FROM posts WHERE title LIKE ? OR description LIKE ? OR content_md LIKE ? OR topic LIKE ?
ORDER BY published_at DESC
`
	searchTerm := "%" + query + "%"
	rows, err := s.db.Query(searchQuery, searchTerm, searchTerm, searchTerm, searchTerm)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		post := &Post{}
		err := rows.Scan(
			&post.ID, &post.Slug, &post.Title, &post.Description, &post.ContentMD, &post.ContentHTML,
			&post.Topic, &post.Tags, &post.DateFormatted, &post.PublishedAt, &post.HasMermaid,
			&post.CoverImage, &post.ReadTime, &post.Views, &post.Likes, &post.CreatedAt, &post.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}

// ListPostsByTopic returns posts filtered by topic with pagination
func (s *Store) ListPostsByTopic(topic string, offset, limit int) ([]*Post, error) {
	query := `
SELECT id, slug, title, description, content_md, content_html, topic, tags, date_formatted, published_at, has_mermaid, cover_image, read_time, views, likes, created_at, updated_at
FROM posts WHERE topic = ? ORDER BY published_at DESC LIMIT ? OFFSET ?
`
	rows, err := s.db.Query(query, topic, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		post := &Post{}
		err := rows.Scan(
			&post.ID, &post.Slug, &post.Title, &post.Description, &post.ContentMD, &post.ContentHTML,
			&post.Topic, &post.Tags, &post.DateFormatted, &post.PublishedAt, &post.HasMermaid,
			&post.CoverImage, &post.ReadTime, &post.Views, &post.Likes, &post.CreatedAt, &post.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}

// CreateProject creates a new project in the database
func (s *Store) CreateProject(project *Project) error {
	query := `
INSERT INTO projects (slug, title, description, content_md, content_html, tools, cover_image, repo_link, demo_link, is_featured, is_archival, sort_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
	result, err := s.db.Exec(query,
		project.Slug, project.Title, project.Description, project.ContentMD, project.ContentHTML,
		project.Tools, project.CoverImage, project.RepoLink, project.DemoLink,
		project.IsFeatured, project.IsArchival, project.SortOrder)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	project.ID = int(id)
	return nil
}

// GetProjectBySlug retrieves a project by its slug
func (s *Store) GetProjectBySlug(slug string) (*Project, error) {
	project := &Project{}
	query := `
SELECT id, slug, title, description, content_md, content_html, tools, cover_image, repo_link, demo_link, is_featured, is_archival, sort_order, created_at
FROM projects WHERE slug = ?
`
	err := s.db.QueryRow(query, slug).Scan(
		&project.ID, &project.Slug, &project.Title, &project.Description, &project.ContentMD, &project.ContentHTML,
		&project.Tools, &project.CoverImage, &project.RepoLink, &project.DemoLink,
		&project.IsFeatured, &project.IsArchival, &project.SortOrder, &project.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return project, nil
}

// ListProjects returns a list of projects
func (s *Store) ListProjects() ([]*Project, error) {
	query := `
SELECT id, slug, title, description, content_md, content_html, tools, cover_image, repo_link, demo_link, is_featured, is_archival, sort_order, created_at
FROM projects ORDER BY sort_order ASC, created_at DESC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []*Project
	for rows.Next() {
		project := &Project{}
		err := rows.Scan(
			&project.ID, &project.Slug, &project.Title, &project.Description, &project.ContentMD, &project.ContentHTML,
			&project.Tools, &project.CoverImage, &project.RepoLink, &project.DemoLink,
			&project.IsFeatured, &project.IsArchival, &project.SortOrder, &project.CreatedAt)
		if err != nil {
			return nil, err
		}
		projects = append(projects, project)
	}

	return projects, rows.Err()
}

// CreateTalk creates a new talk in the database
func (s *Store) CreateTalk(talk *Talk) error {
	query := `
INSERT INTO talks (slug, title, event, location, date, talk_type, description, video_link, slides_link, thumbnail, attendees, sort_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
	result, err := s.db.Exec(query,
		talk.Slug, talk.Title, talk.Event, talk.Location, talk.Date, talk.TalkType,
		talk.Description, talk.VideoLink, talk.SlidesLink, talk.Thumbnail, talk.Attendees, talk.SortOrder)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	talk.ID = int(id)
	return nil
}

// ListTalks returns a list of talks
func (s *Store) ListTalks() ([]*Talk, error) {
	query := `
SELECT id, slug, title, event, location, date, talk_type, description, video_link, slides_link, thumbnail, attendees, sort_order, created_at
FROM talks ORDER BY sort_order ASC, created_at DESC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var talks []*Talk
	for rows.Next() {
		talk := &Talk{}
		err := rows.Scan(
			&talk.ID, &talk.Slug, &talk.Title, &talk.Event, &talk.Location, &talk.Date, &talk.TalkType,
			&talk.Description, &talk.VideoLink, &talk.SlidesLink, &talk.Thumbnail, &talk.Attendees, &talk.SortOrder, &talk.CreatedAt)
		if err != nil {
			return nil, err
		}
		talks = append(talks, talk)
	}

	return talks, rows.Err()
}

// ListTalksByType returns talks filtered by type
func (s *Store) ListTalksByType(talkType string) ([]*Talk, error) {
	query := `
SELECT id, slug, title, event, location, date, talk_type, description, video_link, slides_link, thumbnail, attendees, sort_order, created_at
FROM talks WHERE talk_type = ? ORDER BY sort_order ASC, created_at DESC
`
	rows, err := s.db.Query(query, talkType)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var talks []*Talk
	for rows.Next() {
		talk := &Talk{}
		err := rows.Scan(
			&talk.ID, &talk.Slug, &talk.Title, &talk.Event, &talk.Location, &talk.Date, &talk.TalkType,
			&talk.Description, &talk.VideoLink, &talk.SlidesLink, &talk.Thumbnail, &talk.Attendees, &talk.SortOrder, &talk.CreatedAt)
		if err != nil {
			return nil, err
		}
		talks = append(talks, talk)
	}

	return talks, rows.Err()
}

// CreateBook creates a new book in the database
func (s *Store) CreateBook(book *Book) error {
	query := `
INSERT INTO books (title, author, cover_image, rating, review, tags, sort_order)
VALUES (?, ?, ?, ?, ?, ?, ?)
`
	result, err := s.db.Exec(query,
		book.Title, book.Author, book.CoverImage, book.Rating, book.Review, book.Tags, book.SortOrder)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	book.ID = int(id)
	return nil
}

// ListBooks returns a list of books
func (s *Store) ListBooks() ([]*Book, error) {
	query := `
SELECT id, title, author, cover_image, rating, review, tags, sort_order, created_at
FROM books ORDER BY sort_order ASC, created_at DESC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []*Book
	for rows.Next() {
		book := &Book{}
		err := rows.Scan(
			&book.ID, &book.Title, &book.Author, &book.CoverImage, &book.Rating, &book.Review, &book.Tags, &book.SortOrder, &book.CreatedAt)
		if err != nil {
			return nil, err
		}
		books = append(books, book)
	}

	return books, rows.Err()
}

// CreateNote creates a new note in the database
func (s *Store) CreateNote(note *Note) error {
	query := `
INSERT INTO notes (content, date)
VALUES (?, ?)
`
	result, err := s.db.Exec(query, note.Content, note.Date)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	note.ID = int(id)
	return nil
}

// ListNotes returns a list of notes
func (s *Store) ListNotes() ([]*Note, error) {
	query := `
SELECT id, content, date, created_at
FROM notes ORDER BY created_at DESC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notes []*Note
	for rows.Next() {
		note := &Note{}
		err := rows.Scan(&note.ID, &note.Content, &note.Date, &note.CreatedAt)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}

	return notes, rows.Err()
}

// CreateGuestEntry creates a new guest entry in the database
func (s *Store) CreateGuestEntry(entry *GuestEntry) error {
	query := `
INSERT INTO guestbook (name, message, ip_hash)
VALUES (?, ?, ?)
`
	result, err := s.db.Exec(query, entry.Name, entry.Message, entry.IPHash)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	entry.ID = int(id)
	return nil
}

// ListGuestEntries returns a list of guest entries
func (s *Store) ListGuestEntries() ([]*GuestEntry, error) {
	query := `
SELECT id, name, message, ip_hash, created_at
FROM guestbook ORDER BY created_at DESC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []*GuestEntry
	for rows.Next() {
		entry := &GuestEntry{}
		err := rows.Scan(&entry.ID, &entry.Name, &entry.Message, &entry.IPHash, &entry.CreatedAt)
		if err != nil {
			return nil, err
		}
		entries = append(entries, entry)
	}

	return entries, rows.Err()
}

// CreateComment creates a new comment in the database
func (s *Store) CreateComment(comment *Comment) error {
	query := `
INSERT INTO comments (post_id, project_id, author_name, content)
VALUES (?, ?, ?, ?)
`
	var postID, projectID sql.NullInt32
	if comment.PostID != 0 {
		postID = sql.NullInt32{Int32: int32(comment.PostID), Valid: true}
	}
	if comment.ProjectID != 0 {
		projectID = sql.NullInt32{Int32: int32(comment.ProjectID), Valid: true}
	}

	result, err := s.db.Exec(query, postID, projectID, comment.AuthorName, comment.Content)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	comment.ID = int(id)
	return nil
}

// ListCommentsByPost returns comments for a specific post
func (s *Store) ListCommentsByPost(postID int) ([]*Comment, error) {
	query := `
SELECT id, post_id, project_id, author_name, content, created_at
FROM comments WHERE post_id = ? ORDER BY created_at ASC
`
	rows, err := s.db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []*Comment
	for rows.Next() {
		comment := &Comment{}
		var nullablePostID, nullableProjectID sql.NullInt32
		err := rows.Scan(&comment.ID, &nullablePostID, &nullableProjectID, &comment.AuthorName, &comment.Content, &comment.CreatedAt)
		if err != nil {
			return nil, err
		}
		if nullablePostID.Valid {
			comment.PostID = int(nullablePostID.Int32)
		}
		if nullableProjectID.Valid {
			comment.ProjectID = int(nullableProjectID.Int32)
		}
		comments = append(comments, comment)
	}

	return comments, rows.Err()
}

// CreateUsesItem creates a new uses item in the database
func (s *Store) CreateUsesItem(item *UsesItem) error {
	query := `
INSERT INTO uses_items (category, title, description, link, link_text, sort_order)
VALUES (?, ?, ?, ?, ?, ?)
`
	result, err := s.db.Exec(query, item.Category, item.Title, item.Description, item.Link, item.LinkText, item.SortOrder)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	item.ID = int(id)
	return nil
}

// ListUsesItems returns a list of uses items
func (s *Store) ListUsesItems() ([]*UsesItem, error) {
	query := `
SELECT id, category, title, description, link, link_text, sort_order
FROM uses_items ORDER BY category ASC, sort_order ASC
`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []*UsesItem
	for rows.Next() {
		item := &UsesItem{}
		err := rows.Scan(&item.ID, &item.Category, &item.Title, &item.Description, &item.Link, &item.LinkText, &item.SortOrder)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, rows.Err()
}

// IncrementPostViews increments the view count for a post
func (s *Store) IncrementPostViews(slug string) error {
	query := `UPDATE posts SET views = views + 1 WHERE slug = ?`
	_, err := s.db.Exec(query, slug)
	return err
}

// IncrementPostLikes increments the like count for a post
func (s *Store) IncrementPostLikes(slug string) error {
	query := `UPDATE posts SET likes = likes + 1 WHERE slug = ?`
	_, err := s.db.Exec(query, slug)
	return err
}

// GetTopics returns a list of unique topics
func (s *Store) GetTopics() ([]string, error) {
	query := `SELECT DISTINCT topic FROM posts WHERE topic IS NOT NULL AND topic != '' ORDER BY topic ASC`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var topics []string
	for rows.Next() {
		var topic string
		err := rows.Scan(&topic)
		if err != nil {
			return nil, err
		}
		topics = append(topics, topic)
	}

	return topics, rows.Err()
}