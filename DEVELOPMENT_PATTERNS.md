# Kale Payload Boilerplate - Development Patterns

## 📁 Dosya ve Klasör Yapısı

### Klasör Organizasyonu
```
src/
├── access/           # Access control functions
├── app/             # Next.js App Router
│   ├── (payload)/   # Admin panel routes
│   └── api/         # API routes
├── collections/     # Payload collections
│   └── examples/    # Example collections (optional)
├── components/      # Reusable components
│   ├── admin/       # Admin panel specific
│   └── ui/          # Generic UI components
├── config/          # Configuration modules
├── fields/          # Reusable field schemas
├── globals/         # Payload global configurations
├── graphics/        # Brand assets (logos, icons)
├── lib/            # Utility libraries
├── plugins/        # Custom Payload plugins
└── utilities/      # Helper functions
```

### Dosya Adlandırma
- **Collections**: PascalCase (Users.ts, Media.ts)
- **Components**: PascalCase (Button.tsx, MediaUpload.tsx)
- **Utilities**: camelCase (formatSlug.ts, generateTypes.ts)
- **Config**: camelCase (branchConfig.ts, database.ts)

## 🏗️ Architecture Patterns

### 1. Dependency Injection System
```typescript
// config/branchConfig.ts - Modular collection/global injection
export const branchCollections = [
  // Add project-specific collections here
]
export const branchGlobals = [
  // Add project-specific globals here
]
```

### 2. Access Control Pattern
```typescript
// access/ klasöründe role-based functions
export const adminsOrSelf = ({ req }) => {
  if (checkRole(['admin'], req.user)) return true
  return { id: { equals: req.user?.id } }
}
```

### 3. Field Reusability
```typescript
// fields/ klasöründe reusable field schemas
export const slugField = {
  name: 'slug',
  type: 'text',
  admin: { position: 'sidebar' },
  hooks: { beforeValidate: [formatSlug] }
}
```

## 🎨 UI Component Patterns

### Admin Panel Components
- Kale branding korunacak
- Minimal custom styling
- Payload'ın default UI'ını genişlet

### Generic UI Components
- Framework-agnostic
- Tailwind CSS ile styling
- TypeScript strict mode

## 🔧 Configuration Patterns

### Environment Variables
```bash
# Database
DATABASE_URI=postgresql://...
POSTGRES_URL=postgresql://...

# Payload
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Storage (Optional - Vercel branch only)
BLOB_READ_WRITE_TOKEN=your-token
```

### Build Scripts
```json
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev",
    "build": "cross-env NODE_ENV=production next build",
    "generate:types": "cross-env NODE_OPTIONS='--import tsx' payload generate:types"
  }
}
```

## 📦 Package Management

### Core Dependencies
- `payload` - CMS core
- `@payloadcms/db-postgres` - Database adapter
- `@payloadcms/richtext-slate` - Rich text editor
- `next` - Framework
- `react` + `react-dom` - UI library

### Optional Dependencies
- `@payloadcms/storage-vercel-blob` - Vercel branch only
- `@vercel/analytics` - Vercel branch only

## 🚀 Branch Strategy

### Main Branch
- Core functionality
- No vendor-specific integrations
- PostgreSQL + Slate + Core UI

### Vercel Branch
- Vercel-optimized configuration
- Blob storage integration
- Analytics integration
- Deploy-ready setup

## 🧪 Testing & Build

### Build Requirements
```bash
npm run generate:types  # Generate TypeScript types
npm run build          # Production build
```

### Error Handling
- Global error boundaries
- Graceful media upload failures
- Database connection error handling

## 📝 Code Style

### TypeScript
- Strict mode enabled
- Interface over type aliases
- Explicit return types for functions

### Import Organization
```typescript
// 1. Node modules
import { buildConfig } from 'payload'
import path from 'path'

// 2. Internal modules
import { Users } from './collections/Users'
import { branchCollections } from '@/config/branchConfig'

// 3. Type imports
import type { Config } from 'payload'
```

### Component Structure
```typescript
// Interface definition
interface ComponentProps {
  title: string
  optional?: boolean
}

// Component implementation
export const Component: React.FC<ComponentProps> = ({ 
  title, 
  optional = false 
}) => {
  return <div>{title}</div>
}

// Export
export default Component
```

## 🔍 Development Guidelines

1. **Modular Design**: Her feature kendi klasöründe
2. **Reusability**: Common patterns'i utilities'e taşı
3. **Type Safety**: Payload generated types kullan
4. **Performance**: Lazy loading ve code splitting
5. **Error Handling**: Graceful degradation
6. **Documentation**: README her klasörde

Bu pattern'lara uyarak geliştirme yapacağız.