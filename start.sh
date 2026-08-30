#!/bin/sh
set -e

echo "[startup] Running database migrations..."
# A failed migration must stop the boot. Starting anyway would serve traffic
# against a schema the code does not match.
npx payload migrate

echo "[startup] Starting application..."
exec node server.js
