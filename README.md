# 🚀 Kale Payload Boilerplate

A modern, production-ready **Payload CMS** boilerplate with **PostgreSQL**, **Slate Editor**, and **Kale Branding**. Built for rapid development with a clean, modular architecture.

## ✨ Features

- **🗄️ PostgreSQL Database** - Reliable, scalable database with full-text search
- **📝 Slate Rich Text Editor** - Feature-rich, extensible editor
- **🎨 Kale CMS Branding** - Professional admin panel design
- **🔐 Role-based Access Control** - Secure user management system
- **📁 Media Management** - Optimized image handling with error boundaries
- **🔧 Modular Architecture** - Easy to extend with dependency injection
- **📚 TypeScript First** - Full type safety throughout
- **🎯 SEO Ready** - Built-in meta management and optimization

## 🌿 Branches

### `main` Branch
Core boilerplate without vendor-specific integrations:
- PostgreSQL + Slate Editor
- Core collections & globals
- Access control system
- Media optimization
- Development tools

### `vercel` Branch  
Production-ready Vercel deployment:
- All main branch features
- Vercel Blob Storage integration
- Analytics & Speed Insights
- Optimized build configuration
- Ready-to-deploy setup

## 🚀 Quick Start

### 1. Clone the Repository
```bash
# Clone main branch (recommended for most projects)
git clone https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale

# OR clone Vercel branch for Vercel deployment
git clone -b vercel https://github.com/baranaytass/payload-boilerplate-kale.git
cd payload-boilerplate-kale
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URI=postgresql://username:password@localhost:5432/your_database_name
PAYLOAD_SECRET=your-super-secret-key-here
```

### 4. Setup Database
Ensure PostgreSQL is running and create your database:
```sql
CREATE DATABASE your_database_name;
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/admin` to access the admin panel.

## 📋 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run generate:types  # Generate TypeScript types
npm run lint         # Run linting
```

## 🏗️ Project Structure

```
src/
├── access/          # Access control functions
├── app/             # Next.js App Router
├── collections/     # Payload collections
├── config/          # Configuration modules
│   └── branchConfig.ts  # Dependency injection system
├── fields/          # Reusable field schemas
├── globals/         # Global configurations
├── graphics/        # Brand assets (Kale logo & icon)
├── lib/            # Utility libraries
└── utilities/      # Helper functions
```

## 🔧 Configuration

### Adding Custom Collections
Add your collections to `src/config/branchConfig.ts`:

```typescript
import { YourCollection } from '../collections/YourCollection'

export const branchCollections: CollectionConfig[] = [
  YourCollection,
  // Add more collections here
]
```

### Adding Custom Globals
```typescript
import { YourGlobal } from '../globals/YourGlobal'

export const branchGlobals: GlobalConfig[] = [
  YourGlobal,
  // Add more globals here
]
```

## 🔐 Default Collections

### Users
- Role-based access control (admin, editor, user)
- First user automatically becomes admin
- Secure authentication system

### Media
- Optimized image handling
- Multiple size variants (thumbnail, card, tablet)
- Error boundaries and fallbacks

## 🌍 Default Globals

### Website Settings
- Site information and branding
- Contact details and social media
- Logo and favicon management

### General Contents
- Hero section management
- About section content
- Gallery management
- Footer configuration

## 🚢 Deployment

### Vercel (Recommended)
1. Use the `vercel` branch
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
1. Use the `main` branch
2. Ensure PostgreSQL is available
3. Set environment variables
4. Run `npm run build && npm start`

## 🛠️ Development Patterns

This boilerplate follows established patterns documented in `DEVELOPMENT_PATTERNS.md`:

- **Modular Architecture** - Easy to extend and maintain
- **TypeScript First** - Full type safety
- **Access Control** - Role-based permissions
- **Error Handling** - Graceful degradation
- **Code Organization** - Clear folder structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the development patterns
4. Submit a pull request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 🙏 Credits

Built with [Payload CMS](https://payloadcms.com/) and inspired by the WhiteLabel example.
Kale branding and architecture by [Kale Team](https://github.com/baranaytass).

---

**Happy coding! 🎉**
