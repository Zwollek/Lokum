# syntax=docker/dockerfile:1

# --- base: PHP-FPM runtime ---
FROM php:8.5-fpm-alpine AS base

# PHP extension installer (handles Alpine system dependencies)
COPY --from=mlocati/php-extension-installer:2 /usr/bin/install-php-extensions /usr/local/bin/
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# OPcache is built into PHP 8.5, no installation needed
RUN install-php-extensions \
        pdo_pgsql \
        intl \
        zip \
        apcu

COPY conf.d/app.ini /usr/local/etc/php/conf.d/zz-app.ini

# User matching host UID/GID, so files created in the container
# (vendor, var, generated code) are owned by the host user.
# PHP-FPM runs as this user (non-root); port 9000 does not require root.
ARG UID=1000
ARG GID=1000
RUN (getent group ${GID} >/dev/null || addgroup -g ${GID} app) \
    && (getent passwd ${UID} >/dev/null || adduser -D -u ${UID} -G "$(getent group ${GID} | cut -d: -f1)" app)

ENV COMPOSER_HOME=/tmp/composer
WORKDIR /var/www/api
USER ${UID}:${GID}

# --- dev: base + Xdebug (mode controlled by XDEBUG_MODE, off by default) ---
FROM base AS dev

USER root
RUN install-php-extensions xdebug
COPY conf.d/xdebug.ini /usr/local/etc/php/conf.d/zz-xdebug.ini

ARG UID=1000
ARG GID=1000
USER ${UID}:${GID}
