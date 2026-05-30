import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { adminsOrLoggedIn } from '../access/adminsOrLoggedIn'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: adminsOrLoggedIn,
    update: adminsOrLoggedIn,
    delete: adminsOrLoggedIn,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO. Describe what the image shows.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional caption text that will be displayed with the media.',
      },
    },
  ],
  upload: {
    // Use static directory for local development, Vercel Blob for production
    ...(process.env.VERCEL || process.env.NODE_ENV === 'production' ? {} : { staticDir: 'media' }),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'mobile',
        width: 480,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
}

export default Media