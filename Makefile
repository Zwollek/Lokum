COMPOSE = docker compose
PHP     = $(COMPOSE) exec php

# Arguments after the target name, e.g. `make composer require symfony/uid`
ARGS = $(filter-out $@,$(MAKECMDGOALS))

.DEFAULT_GOAL := help
.PHONY: help build up down ps logs sh composer console cs cs-fix stan deptrac qa test

help: ## List commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

build: ## Build images (pulling newer base images)
	$(COMPOSE) build --pull

up: ## Start the environment
	$(COMPOSE) up -d

down: ## Stop the environment
	$(COMPOSE) down

ps: ## Container status
	$(COMPOSE) ps

logs: ## Follow logs (e.g. make logs php)
	$(COMPOSE) logs -f $(ARGS)

sh: ## Shell in the PHP container
	$(PHP) sh

composer: ## Composer in the container (e.g. make composer require vendor/package)
	$(PHP) composer $(ARGS)

console: ## bin/console in the container (e.g. make console cache:clear)
	$(PHP) bin/console $(ARGS)

cs: ## Check PHP code style (php-cs-fixer)
	$(PHP) composer cs

cs-fix: ## Fix PHP code style (php-cs-fixer)
	$(PHP) composer cs:fix

stan: ## Static analysis (PHPStan, level max)
	$(PHP) composer stan

deptrac: ## Check layer dependencies (Deptrac)
	$(PHP) composer deptrac

qa: cs stan deptrac ## Run all PHP quality checks

test: ## Run PHP tests (PHPUnit)
	$(PHP) bin/phpunit $(ARGS)

# Swallow extra arguments so make does not fail with "No rule to make target"
%:
	@:
