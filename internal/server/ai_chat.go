package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

const (
	geminiModel   = "gemini-2.5-flash"
	geminiBaseURL = "https://generativelanguage.googleapis.com/v1beta/models"
	systemPrompt  = `You are El Muhammad's personal AI assistant embedded in his portfolio website (eltrovert.com). 
El is a Senior DevOps & Cloud Architect with 13+ years of global experience in cloud infrastructure, automation, and distributed systems.

Your role: Answer questions about DevOps, Cloud Architecture, Kubernetes, CI/CD, IaC, observability, and related topics from El's perspective and expertise.

Rules:
- Keep responses concise (2-4 paragraphs max)
- Be technical but accessible
- When relevant, mention El's experience or projects
- If asked something completely unrelated to tech/DevOps, politely redirect
- Use markdown formatting sparingly (bold for emphasis is fine)
- Don't use code blocks unless specifically asked for code`
)

type chatRequest struct {
	Query string `json:"query"`
}

type chatResponse struct {
	Answer string `json:"answer"`
	Error  string `json:"error,omitempty"`
}

// Gemini API types
type geminiRequest struct {
	SystemInstruction *geminiContent  `json:"systemInstruction,omitempty"`
	Contents          []geminiContent `json:"contents"`
	GenerationConfig  *genConfig      `json:"generationConfig,omitempty"`
}

type geminiContent struct {
	Parts []geminiPart `json:"parts"`
}

type geminiPart struct {
	Text string `json:"text"`
}

type genConfig struct {
	MaxOutputTokens int     `json:"maxOutputTokens"`
	Temperature     float64 `json:"temperature"`
}

type geminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error"`
}

func (s *Server) handleAIChat(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse request
	var req chatRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, chatResponse{Error: "Invalid request"})
		return
	}

	query := strings.TrimSpace(req.Query)
	if query == "" {
		writeJSON(w, http.StatusBadRequest, chatResponse{Error: "Empty query"})
		return
	}

	if len(query) > 500 {
		writeJSON(w, http.StatusBadRequest, chatResponse{Error: "Query too long (max 500 chars)"})
		return
	}

	// Get API key from env (required)
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		writeJSON(w, http.StatusServiceUnavailable, chatResponse{Error: "AI service not configured"})
		return
	}

	// Build Gemini request
	gemReq := geminiRequest{
		SystemInstruction: &geminiContent{
			Parts: []geminiPart{{Text: systemPrompt}},
		},
		Contents: []geminiContent{
			{Parts: []geminiPart{{Text: query}}},
		},
		GenerationConfig: &genConfig{
			MaxOutputTokens: 512,
			Temperature:     0.7,
		},
	}

	reqBody, err := json.Marshal(gemReq)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, chatResponse{Error: "Internal error"})
		return
	}

	// Call Gemini API
	url := fmt.Sprintf("%s/%s:generateContent?key=%s", geminiBaseURL, geminiModel, apiKey)
	client := &http.Client{Timeout: 30 * time.Second}

	resp, err := client.Post(url, "application/json", bytes.NewReader(reqBody))
	if err != nil {
		writeJSON(w, http.StatusServiceUnavailable, chatResponse{Error: "AI service unavailable"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, chatResponse{Error: "Failed to read response"})
		return
	}

	var gemResp geminiResponse
	if err := json.Unmarshal(body, &gemResp); err != nil {
		writeJSON(w, http.StatusInternalServerError, chatResponse{Error: "Failed to parse AI response"})
		return
	}

	if gemResp.Error != nil {
		writeJSON(w, http.StatusServiceUnavailable, chatResponse{Error: "AI service error"})
		return
	}

	if len(gemResp.Candidates) == 0 || len(gemResp.Candidates[0].Content.Parts) == 0 {
		writeJSON(w, http.StatusInternalServerError, chatResponse{Error: "No response from AI"})
		return
	}

	answer := gemResp.Candidates[0].Content.Parts[0].Text
	writeJSON(w, http.StatusOK, chatResponse{Answer: answer})
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
