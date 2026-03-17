# Multi-stage Dockerfile for Porto
# Stage 1: Build dependencies and assets

FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files for Node.js dependencies
COPY package.json pnpm-lock.yaml ./
COPY tailwind.config.js ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy CSS source files
COPY static/css/ ./static/css/

# Build Tailwind CSS
RUN pnpm exec tailwindcss -i ./static/css/app.css -o ./static/css/output.css --minify

# Stage 2: Go build environment
FROM golang:1.23-alpine AS go-builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git gcc musl-dev sqlite-dev

# Install Templ
RUN go install github.com/a-h/templ/cmd/templ@latest

# Copy go mod files
COPY go.mod go.sum ./

# Download Go dependencies
RUN go mod download

# Copy source code
COPY cmd/ ./cmd/
COPY internal/ ./internal/
COPY templates/ ./templates/

# Generate Templ templates
RUN templ generate

# Build the application
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w -linkmode external -extldflags '-static'" \
    -o porto ./cmd/porto

# Stage 3: Runtime image
FROM alpine:3.18 AS runtime

# Install CA certificates and timezone data
RUN apk --no-cache add ca-certificates tzdata

# Create app user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create app directory
WORKDIR /app

# Copy binary from builder stage
COPY --from=go-builder /app/porto .

# Copy static assets from frontend builder
COPY --from=frontend-builder /app/static/ ./static/

# Copy remaining static assets
COPY static/js/ ./static/js/
COPY static/fonts/ ./static/fonts/
COPY static/images/ ./static/images/

# Create data directory for SQLite
RUN mkdir -p /app/data && chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ./porto --version || exit 1

# Expose port
EXPOSE 3000

# Default command
CMD ["./porto", "serve", "--port", "3000", "--db", "/app/data/porto.db"]

# Metadata
LABEL maintainer="El Muhammad <el@eltrovert.com>"
LABEL description="Porto - Personal Portfolio & Blog Engine"
LABEL version="1.0.0"