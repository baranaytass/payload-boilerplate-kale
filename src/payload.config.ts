import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Core Collections & Globals
import Users from './collections/users'
import { Media } from './collections/media'
import { WebsiteSettings } from './globals/websiteSettings'
import { GeneralContents } from './globals/generalContents'

// Vendor-specific Configuration
import { vendorCollections, vendorGlobals } from './config/vendorConfig'

// Core configurations
const coreCollections = [Users, Media]
const coreGlobals = [WebsiteSettings, GeneralContents]

// Merge core and vendor configurations
const mergedCollections = [...coreCollections, ...vendorCollections]
const mergedGlobals = [...coreGlobals, ...vendorGlobals]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Database configuration with proper SSL handling
const getDatabaseConfig = () => {
  const baseConnectionString = process.env.DATABASE_URI || process.env.POSTGRES_URL
  
  if (!baseConnectionString) {
    throw new Error('DATABASE_URI or POSTGRES_URL environment variable is required')
  }

  // Supabase pooler connections often have certificate chain issues
  // This is a common workaround for both development and production
  const url = new URL(baseConnectionString)
  
  // For Supabase pooler connections, disable SSL mode to avoid certificate issues
  if (url.hostname.includes('pooler.supabase.com')) {
    url.searchParams.set('sslmode', 'disable')
    return url.toString()
  }

  // For other PostgreSQL providers, use the original connection string
  return baseConnectionString
}

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],
  debug: process.env.NODE_ENV === 'development',
  plugins: [
    // Only use Vercel Blob storage in production/Vercel environment
    ...(process.env.VERCEL || process.env.NODE_ENV === 'production' ? [
      vercelBlobStorage({
        enabled: true,
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN!,
      }),
    ] : []),
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Kale CMS',
      description: 'Kale CMS - Modern Content Management System',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/assets/kale-icon.png',
        },
      ],
      openGraph: {
        description: 'Kale CMS - Modern Content Management System',
        images: [
          {
            height: 600,
            url: '/assets/kale-logo-dark.png',
            width: 800,
          },
        ],
        title: 'Kale CMS',
      },
    },
    components: {
      graphics: {
        Icon: '/graphics/icon.tsx#Icon',
        Logo: '/graphics/logo.tsx#Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: slateEditor({}),
  collections: mergedCollections,
  globals: mergedGlobals,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseConfig(),
    },
    push: true, // Enable database migrations
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  secret: process.env.PAYLOAD_SECRET || 'default-secret-for-dev',
  upload: {
    limits: {
      fileSize: 200000000, // 200MB
    },
  },
  sharp,
})
