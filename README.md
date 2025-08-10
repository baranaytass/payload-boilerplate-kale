# KALE Admin - PayloadCMS Boilerplate

A solid, production-ready **PayloadCMS** boilerplate developed for creating professional admin panels. Built with **PostgreSQL**, **Next.js**, and modern architecture patterns for maximum reusability and scalability.

## 🚀 About KALE Admin

KALE Admin is our in-house PayloadCMS boilerplate designed to provide a strong foundation for building content management systems. This project represents our standardized approach to admin panel development, ensuring consistency and reliability across all projects.

## ✨ Features

- **🗄️ PostgreSQL Database** - Production-ready with TypeScript support
- **⚡ Next.js 15** - Latest React framework with App Router
- **🎨 Professional Admin UI** - Clean interface with KALE branding
- **🔒 Role-based Access Control** - Admin, Editor, User roles with proper permissions
- **📱 Responsive Media Management** - WebP optimization, multiple sizes, video support
- **🔧 Modular Architecture** - Vendor-specific configurations for easy customization
- **🧪 E2E Testing** - Playwright tests for quality assurance
- **🐳 Docker Support** - Complete development environment with pgAdmin
- **🔍 SEO Ready** - Built-in SEO fields and metadata management

## 🏗️ Architecture

### Core Structure
```
src/
├── collections/         # Core collections (Users, Media)
├── globals/            # Global configurations (Website Settings, General Contents)
├── fields/             # Reusable field definitions (SEO, Slug)
├── lib/                # Utilities and helpers
├── access/             # Access control functions
├── config/             # Vendor-specific configurations
└── payload.config.ts   # Main Payload configuration
```

### Vendor Configuration System
The boilerplate uses a vendor-specific configuration system that allows you to add custom collections and globals without modifying core files:

```typescript
// src/config/vendorConfig.ts
export const vendorCollections: CollectionConfig[] = [
  YourCustomCollection,
]

export const vendorGlobals: GlobalConfig[] = [
  YourCustomGlobal,
]
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Configure your environment:
```env
DATABASE_URI=postgresql://kale_user:kale_password@localhost:5432/kale_payload_db
POSTGRES_URL=postgresql://kale_user:kale_password@localhost:5432/kale_payload_db
PAYLOAD_SECRET=your-super-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Database Setup

#### Option A: Docker (Recommended)
```bash
docker-compose up -d postgres pgadmin
```

#### Option B: Local PostgreSQL
```sql
CREATE DATABASE kale_payload_db;
CREATE USER kale_user WITH PASSWORD 'kale_password';
GRANT ALL PRIVILEGES ON DATABASE kale_payload_db TO kale_user;
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000/admin/create-first-user` to setup your admin account.

## 🐳 Docker Environment

Complete development environment with PostgreSQL and pgAdmin:

```bash
# Start all services
docker-compose up -d

# Access pgAdmin
http://localhost:8080
# Login: admin@kale.com / admin123
# Add server: Host=postgres, DB=kale_payload_db, User=kale_user, Pass=kale_password
```

## 📋 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Create production build
npm run start       # Start production server
npm run lint        # Lint codebase
npm test:e2e        # Run E2E tests
```

## 🎯 Core Collections & Globals

### Collections
- **Users** - Authentication with role-based access (auto-admin for first user)
- **Media** - Advanced media management with WebP optimization and multiple sizes

### Globals
- **Website Settings** - Site metadata (title, description, keywords, logo, favicon)
- **General Contents** - SEO metadata (meta title, description, OG image, copyright)

## 🔧 Customization

### Adding Custom Collections
```typescript
// src/config/vendorConfig.ts
import { YourCollection } from '../collections/YourCollection'

export const vendorCollections: CollectionConfig[] = [
  YourCollection,
]
```

### Using SEO Fields
```typescript
// In your collection
import { seoField } from '../fields/seo'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  fields: [
    // Your fields...
    seoField, // Add SEO metadata group
  ],
}
```

### Using Slug Fields
```typescript
// In your collection
import { slugField } from '../fields/slugField'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'), // Auto-generate slug from title
  ],
}
```

## 🧪 Testing

Run E2E tests to ensure everything works:

```bash
npx playwright test
```

Tests cover:
- Admin panel accessibility
- Collections functionality  
- Globals accessibility

## 📦 Production Deployment

### Vercel Branch
```bash
git checkout vercel
# Includes Vercel-specific optimizations
```

### Build for Production
```bash
npm run build
npm run start
```

## 🤝 Contributing

This is an internal KALE project. For feature requests or bug reports, please contact the development team.

## 📄 License

MIT License - Built with ❤️ by KALE Team