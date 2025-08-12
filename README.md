# KALE Admin - PayloadCMS Boilerplate

Modern, production-ready PayloadCMS 3.50.0 boilerplate with PostgreSQL, Vercel deployment support, and comprehensive E2E testing.

## Features

✅ **PayloadCMS 3.50.0** - Latest stable version
✅ **PostgreSQL Database** - Production-ready with SSL support  
✅ **Vercel Deployment** - One-click deploy with Blob storage
✅ **Smart SSL Handling** - Automatic Supabase pooler support
✅ **Role Management** - Auto-admin for first user creation
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
docker-compose up -d postgres pgadmin
npm run dev
```

Or start with local database:
```bash
npm run dev
```

4. Visit `http://localhost:3000/admin/create-first-user` to create your admin account.

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm test:e2e     # Run E2E tests
```

## Database Management

Access pgAdmin at `http://localhost:8080` with credentials:
- Email: admin@kale.com
- Password: admin123

Connect to PostgreSQL using host `postgres`, database `kale_payload_db`, user `kale_user`.

## Customization

Add your custom collections and globals in `src/config/vendorConfig.ts` without modifying core files. The boilerplate includes reusable SEO fields, slug generation, and media optimization utilities.

## Deployment

The project includes two branches:
- `main` - Core boilerplate compatible with any hosting platform
- `vercel` - Optimized for Vercel deployment with additional features

## License

MIT License