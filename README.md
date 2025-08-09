# Kale Payload Boilerplate

A production-ready **Payload CMS** boilerplate with **PostgreSQL**, **Slate Editor**, and clean architecture for rapid development.

## Features

- PostgreSQL database with full TypeScript support
- Slate rich text editor
- Role-based access control system
- Optimized media management
- Modular architecture with dependency injection
- SEO-ready globals and collections
- Professional admin panel with Kale branding

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URI=postgresql://username:password@localhost:5432/database_name
PAYLOAD_SECRET=your-secret-key
```

### 3. Setup Database
```sql
CREATE DATABASE database_name;
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000/admin` to access the admin panel.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Lint code
```

## Branches

- **`main`** - Core boilerplate for any platform
- **`vercel`** - Vercel-optimized with Blob storage and analytics

## Configuration

Add custom collections to `src/config/branchConfig.ts`:

```typescript
export const branchCollections = [
  YourCollection,
  // Add collections here
]
```

## Collections

- **Users** - Role-based authentication (admin, editor, user)
- **Media** - Image optimization with multiple size variants

## Globals

- **Website Settings** - Site info, contact details, branding
- **General Contents** - Hero section, gallery, footer content

## License

MIT License
