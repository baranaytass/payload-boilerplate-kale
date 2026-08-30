# KALE Admin - PayloadCMS Boilerplate

Modern, production-ready PayloadCMS 3.50.0 boilerplate with PostgreSQL, Vercel deployment support, and comprehensive E2E testing.

## Features

✅ **PayloadCMS 3.50.0** - Latest stable version

✅ **PostgreSQL Database** - Production-ready with SSL support 
 
✅ **Vercel Deployment** - One-click deploy with Blob storage

✅ **Smart SSL Handling** - Automatic Supabase pooler support

✅ **Media Upload** - Vercel Blob storage integration

✅ **E2E Testing** - Comprehensive Playwright tests

✅ **TypeScript** - Full type safety

✅ **Modern Stack** - Next.js 15.4.6, React 19.1.1

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Docker (optional but recommended)

### Installation

1. Clone and install dependencies:
```bash
git clone https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale
npm install
```

2. Copy environment file and configure database:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Start with Docker (recommended):
```bash
docker-compose up -d postgres
npm run dev
```

Or start with local database:
```bash
npm run dev
```

4. Visit `http://localhost:3000/admin/create-first-user` to create your admin account.

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test:e2e     # Run E2E tests
```

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
