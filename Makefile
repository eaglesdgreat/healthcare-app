.DEFAULT_GOAL := help
COMPOSE := docker compose
PROJECT := healthcare
SERVICE := healthcare-frontend
COMMIT_HASH := $(shell git rev-parse --verify HEAD)

.PHONY: help network start stop restart logs ps build clean compose-config shell
.PHONY: typecheck lint test test-e2e build-release run-release stop-release

help:
	@echo "start         Build and start the frontend development container"
	@echo "network       Create the shared private microservice network"
	@echo "stop          Stop the frontend container"
	@echo "restart       Restart the frontend container"
	@echo "logs          Follow frontend container logs"
	@echo "ps            Show frontend container status"
	@echo "build         Build the production frontend"
	@echo "typecheck     Run TypeScript checks"
	@echo "lint          Run ESLint"
	@echo "test          Run unit and component tests"
	@echo "test-e2e      Run Playwright end-to-end tests"
	@echo "compose-config Validate Docker Compose configuration"
	@echo "build-release Build the production Docker image"
	@echo "run-release   Run the production Docker image on port 5173"

network:
	docker network inspect healthcare-internal >/dev/null 2>&1 || docker network create healthcare-internal

start: network
	$(COMPOSE) -p $(PROJECT) up --detach --build

stop:
	$(COMPOSE) -p $(PROJECT) down

restart: stop start

logs:
	$(COMPOSE) -p $(PROJECT) logs --follow $(SERVICE)

ps:
	$(COMPOSE) -p $(PROJECT) ps

build:
	pnpm run build

typecheck:
	pnpm run typecheck

lint:
	pnpm run lint

test:
	pnpm test

test-e2e:
	pnpm run test:e2e

compose-config:
	$(COMPOSE) -p $(PROJECT) config --quiet

shell:
	$(COMPOSE) -p $(PROJECT) exec $(SERVICE) sh

clean: stop
	$(COMPOSE) -p $(PROJECT) build --no-cache
	$(COMPOSE) -p $(PROJECT) up --detach

build-release:
	docker build --target runtime --tag local/healthcare-frontend:$(COMMIT_HASH) .

run-release:
	docker run --detach --name healthcare-frontend-$(COMMIT_HASH) --publish 5173:80 local/healthcare-frontend:$(COMMIT_HASH)

stop-release:
	docker stop healthcare-frontend-$(COMMIT_HASH)
	docker rm healthcare-frontend-$(COMMIT_HASH)
