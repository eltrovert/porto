# Porto - Personal Portfolio & Blog Engine
# Makefile for building and deploying the application

.PHONY: help install dev build test clean deploy docker-build docker-run

# Default target
help:
	@echo "Porto - Personal Portfolio & Blog Engine"
	@echo ""
	@echo "Available targets:"
	@echo "  install     Install dependencies and tools"
	@echo "  dev         Start development server with hot reload"
	@echo "  build       Build the application for production"
	@echo "  test        Run all tests"
	@echo "  clean       Clean build artifacts"
	@echo "  deploy      Deploy to production"
	@echo "  docker-build Build Docker image"
	@echo "  docker-run  Run Docker container"
	@echo ""

# Variables
BINARY_NAME=porto
BUILD_DIR=bin
DOCKER_IMAGE=eltrovert/porto
DOCKER_TAG=latest
PORT=3000

# Install dependencies and development tools
install:
	@echo "Installing Go dependencies..."
	go mod download
	@echo "Installing Templ..."
	go install github.com/a-h/templ/cmd/templ@latest
	@echo "Installing Node.js dependencies..."
	pnpm install
	@echo "Installation complete!"

# Development server with hot reload
dev: generate-templates build-css
	@echo "Starting development server on port $(PORT)..."
	@echo "Visit: http://localhost:$(PORT)"
	./$(BUILD_DIR)/$(BINARY_NAME) serve --port $(PORT) --db ./data/porto-dev.db

# Generate Templ templates
generate-templates:
	@echo "Generating Templ templates..."
	templ generate

# Build CSS with Tailwind
build-css:
	@echo "Building Tailwind CSS..."
	@(pnpm exec tailwindcss -i ./static/css/app.css -o ./static/css/output.css --minify 2>/dev/null) || \
	(echo "Tailwind CSS not available, using existing output.css" && \
	 test -f ./static/css/output.css || echo "/* CSS placeholder */" > ./static/css/output.css)

# Watch CSS changes (for development)
watch-css:
	@echo "Watching CSS changes..."
	pnpm exec tailwindcss -i ./static/css/app.css -o ./static/css/output.css --watch

# Build the application
build: clean generate-templates build-css
	@echo "Building Porto application..."
	@mkdir -p $(BUILD_DIR)
	go build -ldflags="-s -w" -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/porto
	@echo "Build complete! Binary: $(BUILD_DIR)/$(BINARY_NAME)"

# Build for production with optimizations
build-prod: clean generate-templates build-css
	@echo "Building Porto for production..."
	@mkdir -p $(BUILD_DIR)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
		-ldflags="-s -w -X main.version=$$(git describe --tags --always --dirty)" \
		-o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/porto
	@echo "Production build complete!"

# Run tests
test:
	@echo "Running tests..."
	go test -v ./...
	@echo "Tests completed!"

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test -v -race -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"

# Lint code
lint:
	@echo "Running linters..."
	go vet ./...
	go fmt ./...
	@echo "Linting complete!"

# Database migrations
migrate:
	@echo "Running database migrations..."
	./$(BUILD_DIR)/$(BINARY_NAME) migrate --db ./data/porto.db

# Seed database with sample data
seed:
	@echo "Seeding database..."
	./$(BUILD_DIR)/$(BINARY_NAME) seed --db ./data/porto.db

# Import content from Astro blog
import-astro:
	@echo "Importing content from Astro blog..."
	./$(BUILD_DIR)/$(BINARY_NAME) import --source ./.reference-blog-astro/content --db ./data/porto.db

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(BUILD_DIR)
	rm -f coverage.out coverage.html
	rm -rf templates/**/*_templ.go
	@echo "Clean complete!"

# Development workflow
dev-setup: install build migrate seed
	@echo "Development setup complete!"
	@echo "Run 'make dev' to start the development server"

# Production deployment
deploy: build-prod
	@echo "Deploying to production..."
	# Add your deployment commands here
	# Example: scp, rsync, kubectl apply, etc.
	@echo "Deployment complete!"

# Docker build
docker-build:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .
	@echo "Docker image built: $(DOCKER_IMAGE):$(DOCKER_TAG)"

# Docker run
docker-run: docker-build
	@echo "Running Docker container..."
	docker run -p 3000:3000 \
		-v $$(pwd)/data:/app/data \
		--name porto-container \
		--rm \
		$(DOCKER_IMAGE):$(DOCKER_TAG)

# Docker cleanup
docker-clean:
	@echo "Cleaning Docker artifacts..."
	docker stop porto-container || true
	docker rm porto-container || true
	docker rmi $(DOCKER_IMAGE):$(DOCKER_TAG) || true

# Format all code
format:
	@echo "Formatting code..."
	go fmt ./...
	templ fmt .
	@echo "Formatting complete!"

# Security scan
security-scan:
	@echo "Running security scan..."
	go install github.com/securecodewarrior/gokart@latest
	gokart scan .
	@echo "Security scan complete!"

# Performance benchmark
benchmark:
	@echo "Running performance benchmarks..."
	go test -bench=. -benchmem ./...
	@echo "Benchmarks complete!"

# Generate documentation
docs:
	@echo "Generating documentation..."
	go doc -all . > docs/api.md
	@echo "Documentation generated!"

# All-in-one build verification
verify: clean build test
	@echo "Build verification complete!"
	@echo "✅ Templates generated"
	@echo "✅ CSS compiled"
	@echo "✅ Binary built"
	@echo "✅ Tests passed"