#!/bin/sh
set -e

echo "[startup] Running database migrations..."
node_modules/.bin/payload migrate || echo "[startup] Migration skipped or already up-to-date."

echo "[startup] Starting application..."
exec node server.js
