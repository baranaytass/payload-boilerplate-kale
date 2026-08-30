# KALE Admin - PayloadCMS Boilerplate

Modern, production-ready PayloadCMS 3.50.0 boilerplate with PostgreSQL, Vercel deployment support, and comprehensive E2E testing.

## Features

- **Payload CMS 3.88** on PostgreSQL, with Users, Media, and site-wide globals
- **Next.js 15** App Router, admin and public site in separate route groups
- **Content from the CMS** — page metadata and copy come from the database, so
  editing them does not need a deploy
- **Media pipeline** — automatic WebP variants; local disk, S3/MinIO or Vercel Blob
- **Tailwind CSS** scoped to the public site (the admin ships its own styles)
- **Typed end to end** — `payload-types.ts` is generated from the schema
- **Checks that run** — ESLint, TypeScript, Vitest unit tests and Playwright E2E,
  all enforced in CI and in the production build

## Quick Start

### Prerequisites
- Node.js 22+ and npm (see `engines` in package.json)
- PostgreSQL 14+
- Docker (optional, for the bundled Postgres)

### Installation

1. Clone and install dependencies:
```bash
git clone https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale
npm install
```

2. Create the environment file:
```bash
cp .env.example .env
```

Fill in `DATABASE_URI` and generate the two secrets the app requires:

```bash
openssl rand -hex 32   # PAYLOAD_SECRET   - signs admin sessions
openssl rand -hex 32   # REVALIDATE_SECRET - authenticates cache purges
```

The app refuses to start without `PAYLOAD_SECRET`, and requires at least 32
characters for it in production. Point `DATABASE_URI` at a database dedicated to
this project: in development Payload pushes schema changes on boot and prompts
before dropping tables.

3. Start with Docker (recommended):
```bash
docker-compose up -d postgres
npm run dev
```

Or start with local database:
```bash
npm run dev
```

4. Visit `http://localhost:3000/admin/create-first-user` to create your admin
account. The first account created becomes an admin automatically; after that,
only admins can create users.

## Development

```bash
npm run dev              # Start development server
npm run build            # Production build (fails on type or lint errors)
npm run start            # Serve the production build

npm run lint             # ESLint
npm run typecheck        # TypeScript, no emit
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E (see Testing below)

npm run generate:types   # Regenerate payload-types.ts from the schema
npm run migrate          # Run Payload migrations
```

Run `npm run generate:types` after changing any collection or global — the
generated types are what make CMS content type-safe in the app.

### Production notes

- Schema push is disabled when `NODE_ENV=production`; ship schema changes as
  migrations (`npm run migrate`).
- The build enforces type and lint errors rather than ignoring them, so a broken
  type fails CI instead of reaching production.
- `/admin` is served with `X-Robots-Tag: noindex, nofollow`.

## Testing

E2E tests run on Playwright with [fair-playwright](https://github.com/baranaytass/fair-playwright)
as the reporter, which groups assertions into named MAJOR/MINOR steps so a
failure names the step that broke instead of a bare stack trace.

```bash
npm run test:e2e         # Run against http://localhost:3000
npm run test:e2e:ui      # Playwright's interactive UI
npm run test:e2e:report  # Print the AI-readable summary of the last run
```

Start the dev server first - the tests drive a real browser against it.

Tests live in `tests/e2e/` and are written with the `e2e.quick()` helper:

```typescript
import { e2e } from 'fair-playwright'

await e2e.quick('Admin panel boots', [
  ['Open /admin', async () => { await page.goto('/admin') },
    { failure: 'Admin panel did not finish loading' }],
  ['Title carries the CMS branding', async () => {
    await expect(page).toHaveTitle(/Kale CMS/)
  }],
])
```

Give each step a `failure` message describing what broke in plain terms. Don't
add `console.log` calls to trace progress - the reporter already prints the step
tree, live.

Each run writes two files under `test-results/`:

| File | Purpose |
| --- | --- |
| `ai-summary.md` | Human/AI-readable run summary |
| `results.json` | Machine-readable results, read by the MCP server |

### MCP integration

The repo root registers a fair-playwright MCP server in `.mcp.json`, which lets
Claude Code query the last run directly ("which tests failed and where?").

It reads `test-results/results.json`, so keep the `json` output enabled in
`playwright.config.ts` - without it the server has nothing to read.

### Database for tests

The suite talks to whatever database `.env` points at, and Payload will prompt
before pushing a schema change that drops tables. Point `DATABASE_URI` at a
scratch database when running tests so a prompt can never block the suite or
put real data at risk:

```bash
createdb kale_payload_test
DATABASE_URI=postgresql://kale_user:kale_password@localhost:5432/kale_payload_test npm run dev
```

## Database Management

Use your preferred PostgreSQL client to connect to the database:
- **Host:** localhost (or `postgres` when using Docker)
- **Port:** 5432  
- **Database:** kale_payload_db
- **User:** kale_user
- **Password:** kale_password

Popular database management tools: TablePlus, DBeaver, pgAdmin, or VS Code PostgreSQL extensions.

## Customization

Add your custom collections and globals in `src/config/vendorConfig.ts` without modifying core files. The boilerplate includes reusable SEO fields, slug generation, and media optimization utilities.

## Deployment

The project includes two branches:
- `main` - Core boilerplate compatible with any hosting platform
- `vercel` - Optimized for Vercel deployment with additional features

## License

MIT License
