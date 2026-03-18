package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	_ "modernc.org/sqlite"
)

func parseDate(dateStr string) (time.Time, error) {
	// Try "Jan 02, 2006" format (from date_formatted)
	t, err := time.Parse("Jan 02, 2006", dateStr)
	if err == nil {
		return t, nil
	}
	// Try "January 2, 2006"
	t, err = time.Parse("January 2, 2006", dateStr)
	if err == nil {
		return t, nil
	}
	// Try "March 19, 2024" (talks format)
	t, err = time.Parse("January 02, 2006", dateStr)
	if err == nil {
		return t, nil
	}
	// Try ISO
	t, err = time.Parse("2006-01-02", dateStr)
	if err == nil {
		return t, nil
	}
	return time.Time{}, fmt.Errorf("cannot parse date: %s", dateStr)
}

func main() {
	dbPath := "data/porto.db"
	if len(os.Args) > 1 {
		dbPath = os.Args[1]
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// 1. Fix published_at from date_formatted for posts
	fmt.Println("=== Fixing posts published_at from date_formatted ===")
	rows, err := db.Query("SELECT id, date_formatted FROM posts WHERE date_formatted IS NOT NULL AND date_formatted != ''")
	if err != nil {
		log.Fatal(err)
	}

	type idDate struct {
		id   int
		date time.Time
	}
	var updates []idDate
	for rows.Next() {
		var id int
		var df string
		rows.Scan(&id, &df)
		t, err := parseDate(df)
		if err != nil {
			fmt.Printf("  WARN: post %d - %v\n", id, err)
			continue
		}
		updates = append(updates, idDate{id, t})
	}
	rows.Close()

	for _, u := range updates {
		_, err := db.Exec("UPDATE posts SET published_at = ? WHERE id = ?", u.date.Format(time.RFC3339), u.id)
		if err != nil {
			fmt.Printf("  ERROR updating post %d: %v\n", u.id, err)
		}
	}
	fmt.Printf("  Updated %d posts\n", len(updates))

	// 2. Add year column to projects if not exists
	fmt.Println("=== Adding year column to projects ===")
	_, err = db.Exec("ALTER TABLE projects ADD COLUMN year INTEGER DEFAULT 0")
	if err != nil {
		if strings.Contains(err.Error(), "duplicate column") {
			fmt.Println("  year column already exists")
		} else {
			fmt.Printf("  WARN: %v\n", err)
		}
	} else {
		fmt.Println("  Added year column")
	}

	// 3. Populate project years from astro data
	fmt.Println("=== Populating project years ===")
	astroData, err := os.ReadFile("../porto-react/data/astro-projects.json")
	if err != nil {
		fmt.Printf("  WARN: can't read astro-projects.json: %v\n", err)
	} else {
		var astroProjects []struct {
			Name string `json:"name"`
			Year int    `json:"year"`
		}
		json.Unmarshal(astroData, &astroProjects)

		// Match by title similarity
		projectRows, _ := db.Query("SELECT id, title FROM projects")
		type proj struct {
			id    int
			title string
		}
		var dbProjects []proj
		for projectRows.Next() {
			var p proj
			projectRows.Scan(&p.id, &p.title)
			dbProjects = append(dbProjects, p)
		}
		projectRows.Close()

		for _, dp := range dbProjects {
			for _, ap := range astroProjects {
				// Match by checking if astro name is contained in DB title (or vice versa)
				dpLower := strings.ToLower(dp.title)
				apLower := strings.ToLower(ap.Name)
				if strings.Contains(dpLower, apLower) || strings.Contains(apLower, dpLower) ||
					// Also try first significant word match
					matchFirstWords(dpLower, apLower) {
					_, err := db.Exec("UPDATE projects SET year = ? WHERE id = ?", ap.Year, dp.id)
					if err == nil {
						fmt.Printf("  %s -> %d\n", dp.title, ap.Year)
					}
					break
				}
			}
		}
	}

	// 4. Export fresh JSON for React
	fmt.Println("=== Exporting fresh JSON for React ===")
	exportPosts(db)
	exportProjects(db)
	exportTalks(db)
	exportBooks(db)
	exportNotes(db)

	fmt.Println("\nDone! React JSON files updated in ../porto-react/data/")
}

func matchFirstWords(a, b string) bool {
	aWords := strings.Fields(a)
	bWords := strings.Fields(b)
	if len(aWords) < 2 || len(bWords) < 2 {
		return false
	}
	// Check if first two significant words match
	return aWords[0] == bWords[0] && aWords[1] == bWords[1]
}

func exportPosts(db *sql.DB) {
	rows, _ := db.Query(`
		SELECT id, slug, title, COALESCE(description,''), topic, date_formatted, published_at
		FROM posts ORDER BY published_at DESC
	`)
	defer rows.Close()

	type PostJSON struct {
		ID      int    `json:"id"`
		Slug    string `json:"slug"`
		Title   string `json:"title"`
		Excerpt string `json:"excerpt"`
		Topic   string `json:"topic"`
		Date    string `json:"date"`
	}

	var posts []PostJSON
	for rows.Next() {
		var p PostJSON
		var publishedAt string
		rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Topic, &p.Date, &publishedAt)
		posts = append(posts, p)
	}

	data, _ := json.MarshalIndent(posts, "", "  ")
	os.WriteFile("../porto-react/data/posts.json", data, 0644)
	fmt.Printf("  posts.json: %d items (sorted by date DESC)\n", len(posts))
}

func exportProjects(db *sql.DB) {
	rows, _ := db.Query(`
		SELECT id, slug, title, COALESCE(description,''), COALESCE(tools,''), COALESCE(cover_image,''),
		       COALESCE(repo_link,''), COALESCE(demo_link,''), is_featured, is_archival, COALESCE(year, 0)
		FROM projects ORDER BY year DESC, sort_order ASC
	`)
	defer rows.Close()

	type ProjectJSON struct {
		ID          int    `json:"id"`
		Slug        string `json:"slug"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Tools       string `json:"tools"`
		CoverImage  string `json:"cover_image"`
		RepoLink    string `json:"repo_link"`
		DemoLink    string `json:"demo_link"`
		IsFeatured  bool   `json:"is_featured"`
		IsArchival  bool   `json:"is_archival"`
		Year        int    `json:"year"`
	}

	var projects []ProjectJSON
	for rows.Next() {
		var p ProjectJSON
		rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Description, &p.Tools, &p.CoverImage,
			&p.RepoLink, &p.DemoLink, &p.IsFeatured, &p.IsArchival, &p.Year)
		projects = append(projects, p)
	}

	data, _ := json.MarshalIndent(projects, "", "  ")
	os.WriteFile("../porto-react/data/projects.json", data, 0644)
	fmt.Printf("  projects.json: %d items (with year, sorted DESC)\n", len(projects))
}

func exportTalks(db *sql.DB) {
	rows, _ := db.Query(`
		SELECT id, slug, title, event, COALESCE(location,''), COALESCE(date,''), COALESCE(talk_type,''),
		       COALESCE(description,''), COALESCE(video_link,''), COALESCE(slides_link,''),
		       COALESCE(thumbnail,''), COALESCE(attendees,''), sort_order, created_at
		FROM talks ORDER BY sort_order ASC, created_at DESC
	`)
	defer rows.Close()

	type TalkJSON struct {
		ID          int    `json:"id"`
		Slug        string `json:"slug"`
		Title       string `json:"title"`
		Event       string `json:"event"`
		Location    string `json:"location"`
		Date        string `json:"date"`
		TalkType    string `json:"talk_type"`
		Description string `json:"description"`
		VideoLink   string `json:"video_link"`
		SlidesLink  string `json:"slides_link"`
		Thumbnail   string `json:"thumbnail"`
		Attendees   string `json:"attendees"`
		SortOrder   int    `json:"sort_order"`
		CreatedAt   string `json:"created_at"`
	}

	var talks []TalkJSON
	for rows.Next() {
		var t TalkJSON
		rows.Scan(&t.ID, &t.Slug, &t.Title, &t.Event, &t.Location, &t.Date, &t.TalkType,
			&t.Description, &t.VideoLink, &t.SlidesLink, &t.Thumbnail, &t.Attendees, &t.SortOrder, &t.CreatedAt)
		talks = append(talks, t)
	}

	data, _ := json.MarshalIndent(talks, "", "  ")
	os.WriteFile("../porto-react/data/talks.json", data, 0644)
	fmt.Printf("  talks.json: %d items\n", len(talks))
}

func exportBooks(db *sql.DB) {
	rows, _ := db.Query(`
		SELECT id, title, author, COALESCE(cover_image,''), rating, COALESCE(review,''),
		       COALESCE(tags,''), sort_order, created_at
		FROM books ORDER BY sort_order ASC, created_at DESC
	`)
	defer rows.Close()

	type BookJSON struct {
		ID         int    `json:"id"`
		Title      string `json:"title"`
		Author     string `json:"author"`
		CoverImage string `json:"cover_image"`
		Rating     int    `json:"rating"`
		Review     string `json:"review"`
		Tags       string `json:"tags"`
		SortOrder  int    `json:"sort_order"`
		CreatedAt  string `json:"created_at"`
	}

	var books []BookJSON
	for rows.Next() {
		var b BookJSON
		rows.Scan(&b.ID, &b.Title, &b.Author, &b.CoverImage, &b.Rating, &b.Review, &b.Tags, &b.SortOrder, &b.CreatedAt)
		books = append(books, b)
	}

	data, _ := json.MarshalIndent(books, "", "  ")
	os.WriteFile("../porto-react/data/books.json", data, 0644)
	fmt.Printf("  books.json: %d items\n", len(books))
}

func exportNotes(db *sql.DB) {
	rows, _ := db.Query(`
		SELECT id, content, COALESCE(date,''), created_at
		FROM notes ORDER BY created_at DESC
	`)
	defer rows.Close()

	type NoteJSON struct {
		ID        int    `json:"id"`
		Content   string `json:"content"`
		Date      string `json:"date"`
		CreatedAt string `json:"created_at"`
	}

	var notes []NoteJSON
	for rows.Next() {
		var n NoteJSON
		rows.Scan(&n.ID, &n.Content, &n.Date, &n.CreatedAt)
		notes = append(notes, n)
	}

	data, _ := json.MarshalIndent(notes, "", "  ")
	os.WriteFile("../porto-react/data/notes.json", data, 0644)
	fmt.Printf("  notes.json: %d items\n", len(notes))
}
