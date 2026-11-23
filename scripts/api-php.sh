#!/usr/bin/env sh
# Runs a PHP command for apps/api (paths relative to apps/api):
#   1. in the Docker `php` container, if it is running,
#   2. otherwise with a local PHP >= 8.5,
#   3. otherwise fails, so PHP checks are never silently skipped.
# Usage: scripts/api-php.sh <php-script> [args], e.g. scripts/api-php.sh vendor/bin/phpstan analyse src/
set -eu

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

if command -v docker >/dev/null 2>&1 \
  && docker compose ps --status running --services 2>/dev/null | grep -qx php; then
  exec docker compose exec -T php "$@"
fi

if command -v php >/dev/null 2>&1 && php -r 'exit(PHP_VERSION_ID >= 80500 ? 0 : 1);'; then
  cd "$ROOT/apps/api"
  exec php "$@"
fi

echo "api-php: PHP 8.5 is not available. Start Docker (make up) or install PHP 8.5 locally." >&2
exit 1
