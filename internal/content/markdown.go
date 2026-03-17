package content

import (
	"bytes"
	"fmt"
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
)

// RenderMarkdown converts markdown text to HTML
func RenderMarkdown(md string) string {
	markdown := goldmark.New(
		goldmark.WithExtensions(extension.Table),
	)

	var buf bytes.Buffer
	if err := markdown.Convert([]byte(md), &buf); err != nil {
		return md
	}
	return buf.String()
}

// CalculateReadTime estimates reading time for text
func CalculateReadTime(text string) string {
	words := strings.Fields(text)
	wordCount := len(words)

	// Assume ~200 words per minute reading speed
	minutes := wordCount / 200
	if minutes == 0 {
		minutes = 1
	}

	return fmt.Sprintf("%d min read", minutes)
}