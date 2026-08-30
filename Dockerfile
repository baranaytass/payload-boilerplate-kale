# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts --include=dev

# Install prod-only deps before COPY . . so this layer is cached independently of source changes
RUN --mount=type=cache,target=/root/.npm \
    mkdir -p /app_prod && \
    cp package.json package-lock.json /app_prod/ && \
    npm ci --ignore-scripts --omit=dev --prefix /app_prod

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Dummy values so Payload config loads without real services during build
ENV DATABASE_URI=postgresql://build:build@localhost:5432/build
ENV POSTGRES_URL=postgresql://build:build@localhost:5432/build
ENV PAYLOAD_SECRET=build-time-secret-placeholder-min-32-chars

# The package is ESM ("type": "module"), so the Payload CLI is invoked directly
# rather than through tsx's CommonJS loader.
RUN npx payload generate:importmap && npm run build

# ─── Stage 2: Production runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat dumb-init
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Next.js standalone output (self-contained server)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Production-only node_modules for `payload migrate` at runtime (~200MB vs 945MB)
COPY --from=builder --chown=nextjs:nodejs /app_prod/node_modules ./node_modules

# Source + config files required by payload CLI during migration
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

COPY --chown=nextjs:nodejs start.sh ./start.sh
RUN chmod +x ./start.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["./start.sh"]
