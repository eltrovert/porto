package content

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

// ImportStats tracks the results of an import operation
type ImportStats struct {
	PostsImported    int
	ProjectsImported int
}

// PostFrontmatter represents the frontmatter of a post
type PostFrontmatter struct {
	Title         string `yaml:"title"`
	Description   string `yaml:"description"`
	DateFormatted string `yaml:"dateFormatted"`
	Topic         string `yaml:"topic"`
	HasMermaid    bool   `yaml:"hasMermaid"`
}

// ProjectFrontmatter represents the frontmatter of a project
type ProjectFrontmatter struct {
	Title       string `yaml:"title"`
	Description string `yaml:"description"`
	Tools       string `yaml:"tools"`
}

// ParseAstroPost parses an Astro markdown post file
func ParseAstroPost(raw, slug string) (*Post, error) {
	// Split frontmatter and content
	parts := strings.Split(raw, "---")
	if len(parts) < 3 {
		return nil, fmt.Errorf("invalid format: no frontmatter found")
	}

	// Parse frontmatter
	var frontmatter PostFrontmatter
	if err := yaml.Unmarshal([]byte(parts[1]), &frontmatter); err != nil {
		return nil, fmt.Errorf("failed to parse frontmatter: %w", err)
	}

	// Extract content (everything after the second ---)
	content := strings.Join(parts[2:], "---")
	content = strings.TrimSpace(content)

	// Render markdown to HTML
	contentHTML := RenderMarkdown(content)

	// Calculate read time
	readTime := CalculateReadTime(content)

	post := &Post{
		Slug:          slug,
		Title:         frontmatter.Title,
		Description:   frontmatter.Description,
		ContentMD:     content,
		ContentHTML:   contentHTML,
		Topic:         frontmatter.Topic,
		DateFormatted: frontmatter.DateFormatted,
		HasMermaid:    frontmatter.HasMermaid,
		ReadTime:      readTime,
		PublishedAt:   time.Now(), // Default to now, could be parsed from dateFormatted
		Views:         0,
		Likes:         0,
	}

	return post, nil
}

// ParseAstroProject parses an Astro markdown project file
func ParseAstroProject(raw, slug string) (*Project, error) {
	// Split frontmatter and content
	parts := strings.Split(raw, "---")
	if len(parts) < 3 {
		return nil, fmt.Errorf("invalid format: no frontmatter found")
	}

	// Parse frontmatter
	var frontmatter ProjectFrontmatter
	if err := yaml.Unmarshal([]byte(parts[1]), &frontmatter); err != nil {
		return nil, fmt.Errorf("failed to parse frontmatter: %w", err)
	}

	// Extract content
	content := strings.Join(parts[2:], "---")
	content = strings.TrimSpace(content)

	// Render markdown to HTML
	contentHTML := RenderMarkdown(content)

	project := &Project{
		Slug:        slug,
		Title:       frontmatter.Title,
		Description: frontmatter.Description,
		ContentMD:   content,
		ContentHTML: contentHTML,
		Tools:       frontmatter.Tools,
		IsFeatured:  false,
		IsArchival:  false,
		SortOrder:   0,
	}

	return project, nil
}

// ImportFromDirectory imports all content from a directory
func ImportFromDirectory(store *Store, path string) (*ImportStats, error) {
	stats := &ImportStats{}

	// Import posts from post subdirectory (singular)
	postsPath := filepath.Join(path, "post")
	if err := importPosts(store, postsPath, stats); err != nil {
		return stats, fmt.Errorf("failed to import posts: %w", err)
	}

	// Import projects from project subdirectory (singular)
	projectsPath := filepath.Join(path, "project")
	if err := importProjects(store, projectsPath, stats); err != nil {
		return stats, fmt.Errorf("failed to import projects: %w", err)
	}

	return stats, nil
}

func importPosts(store *Store, postsPath string, stats *ImportStats) error {
	files, err := filepath.Glob(filepath.Join(postsPath, "*.md"))
	if err != nil {
		return err
	}

	for _, file := range files {
		content, err := os.ReadFile(file)
		if err != nil {
			continue
		}

		// Extract slug from filename
		slug := strings.TrimSuffix(filepath.Base(file), ".md")

		post, err := ParseAstroPost(string(content), slug)
		if err != nil {
			continue
		}

		if err := store.CreatePost(post); err != nil {
			continue
		}

		stats.PostsImported++
	}

	return nil
}

func importProjects(store *Store, projectsPath string, stats *ImportStats) error {
	files, err := filepath.Glob(filepath.Join(projectsPath, "*.md"))
	if err != nil {
		return err
	}

	for _, file := range files {
		content, err := os.ReadFile(file)
		if err != nil {
			continue
		}

		// Extract slug from filename
		slug := strings.TrimSuffix(filepath.Base(file), ".md")

		project, err := ParseAstroProject(string(content), slug)
		if err != nil {
			continue
		}

		if err := store.CreateProject(project); err != nil {
			continue
		}

		stats.ProjectsImported++
	}

	return nil
}