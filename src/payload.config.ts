import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { s3Storage } from '@payloadcms/storage-s3'
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

/**
 * The secret that signs every admin session and password-reset token.
 *
 * There is deliberately no fallback: a default value would silently ship to
 * production, where anyone who knows it can mint a valid admin session.
 */
const getPayloadSecret = (): string => {
  const secret = process.env.PAYLOAD_SECRET

  if (!secret) {
    throw new Error('PAYLOAD_SECRET environment variable is required')
  }

  if (process.env.NODE_ENV === 'production' && secret.length < 32) {
    throw new Error('PAYLOAD_SECRET must be at least 32 characters in production')
  }

  return secret
}

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
    // Vercel deployment: use Vercel Blob storage
    ...(process.env.VERCEL ? [
      vercelBlobStorage({
        enabled: true,
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN!,
      }),
    ] : []),
    // VPS / self-hosted: use MinIO (S3-compatible)
    ...(!process.env.VERCEL && process.env.S3_ENDPOINT ? [
      s3Storage({
        collections: { media: true },
        bucket: process.env.S3_BUCKET || 'media',
        config: {
          endpoint: process.env.S3_ENDPOINT,
          region: process.env.S3_REGION || 'us-east-1',
          forcePathStyle: true, // Required for MinIO
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_KEY!,
          },
        },
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
    // Schema push diffs the models against the live database and offers to drop
    // whatever no longer matches. That is convenient while developing and
    // dangerous in production, where schema changes belong in a migration.
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  secret: getPayloadSecret(),
  upload: {
    limits: {
      fileSize: 200000000, // 200MB
    },
  },
  sharp,
})
