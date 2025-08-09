import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Core Collections & Globals
import Users from './collections/Users'
import { Media } from './collections/Media'
import { WebsiteSettings } from './globals/WebsiteSettings'
import { GeneralContents } from './globals/GeneralContents'

// Branch-specific Configuration
import { branchCollections, branchGlobals } from './config/branchConfig'

// Core configurations
const coreCollections = [Users, Media]
const coreGlobals = [WebsiteSettings, GeneralContents]

// Merge core and branch configurations
const mergedCollections = [...coreCollections, ...branchCollections]
const mergedGlobals = [...coreGlobals, ...branchGlobals]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
        Icon: '/graphics/Icon/index.tsx#Icon',
        Logo: '/graphics/Logo/index.tsx#Logo',
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
      connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL,
    },
    push: false,
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
