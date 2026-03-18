package content

import "time"

// Post represents a blog post
type Post struct {
	ID            int       `json:"id" db:"id"`
	Slug          string    `json:"slug" db:"slug"`
	Title         string    `json:"title" db:"title"`
	Description   string    `json:"description" db:"description"`
	ContentMD     string    `json:"content_md" db:"content_md"`
	ContentHTML   string    `json:"content_html" db:"content_html"`
	Topic         string    `json:"topic" db:"topic"`
	Tags          string    `json:"tags" db:"tags"`
	DateFormatted string    `json:"date_formatted" db:"date_formatted"`
	PublishedAt   time.Time `json:"published_at" db:"published_at"`
	HasMermaid    bool      `json:"has_mermaid" db:"has_mermaid"`
	CoverImage    string    `json:"cover_image" db:"cover_image"`
	ReadTime      string    `json:"read_time" db:"read_time"`
	Views         int       `json:"views" db:"views"`
	Likes         int       `json:"likes" db:"likes"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

// Project represents a project/portfolio item
type Project struct {
	ID          int       `json:"id" db:"id"`
	Slug        string    `json:"slug" db:"slug"`
	Title       string    `json:"title" db:"title"`
	Description string    `json:"description" db:"description"`
	ContentMD   string    `json:"content_md" db:"content_md"`
	ContentHTML string    `json:"content_html" db:"content_html"`
	Tools       string    `json:"tools" db:"tools"`
	CoverImage  string    `json:"cover_image" db:"cover_image"`
	RepoLink    string    `json:"repo_link" db:"repo_link"`
	DemoLink    string    `json:"demo_link" db:"demo_link"`
	IsFeatured  bool      `json:"is_featured" db:"is_featured"`
	IsArchival  bool      `json:"is_archival" db:"is_archival"`
	SortOrder   int       `json:"sort_order" db:"sort_order"`
	Year        int       `json:"year" db:"year"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// Talk represents a conference talk or presentation
type Talk struct {
	ID          int       `json:"id" db:"id"`
	Slug        string    `json:"slug" db:"slug"`
	Title       string    `json:"title" db:"title"`
	Event       string    `json:"event" db:"event"`
	Location    string    `json:"location" db:"location"`
	Date        string    `json:"date" db:"date"`
	TalkType    string    `json:"talk_type" db:"talk_type"`
	Description string    `json:"description" db:"description"`
	VideoLink   string    `json:"video_link" db:"video_link"`
	SlidesLink  string    `json:"slides_link" db:"slides_link"`
	Thumbnail   string    `json:"thumbnail" db:"thumbnail"`
	Attendees   string    `json:"attendees" db:"attendees"`
	SortOrder   int       `json:"sort_order" db:"sort_order"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// Book represents a book review
type Book struct {
	ID         int       `json:"id" db:"id"`
	Title      string    `json:"title" db:"title"`
	Author     string    `json:"author" db:"author"`
	CoverImage string    `json:"cover_image" db:"cover_image"`
	Rating     int       `json:"rating" db:"rating"`
	Review     string    `json:"review" db:"review"`
	Tags       string    `json:"tags" db:"tags"`
	SortOrder  int       `json:"sort_order" db:"sort_order"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}

// Note represents a short note/quick thought
type Note struct {
	ID        int       `json:"id" db:"id"`
	Content   string    `json:"content" db:"content"`
	Date      string    `json:"date" db:"date"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// GuestEntry represents a guestbook entry
type GuestEntry struct {
	ID        int       `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Message   string    `json:"message" db:"message"`
	IPHash    string    `json:"ip_hash" db:"ip_hash"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// Comment represents a comment on a post or project
type Comment struct {
	ID         int       `json:"id" db:"id"`
	PostID     int       `json:"post_id" db:"post_id"`
	ProjectID  int       `json:"project_id" db:"project_id"`
	AuthorName string    `json:"author_name" db:"author_name"`
	Content    string    `json:"content" db:"content"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}

// UsesItem represents an item in the uses/hardware page
type UsesItem struct {
	ID          int    `json:"id" db:"id"`
	Category    string `json:"category" db:"category"`
	Title       string `json:"title" db:"title"`
	Description string `json:"description" db:"description"`
	Link        string `json:"link" db:"link"`
	LinkText    string `json:"link_text" db:"link_text"`
	SortOrder   int    `json:"sort_order" db:"sort_order"`
}