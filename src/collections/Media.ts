import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { adminsOrLoggedIn } from '../access/adminsOrLoggedIn'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: adminsOrLoggedIn,
    update: adminsOrLoggedIn,
    delete: adminsOrLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  upload: {
    // Enable static file serving for media uploads
    staticDir: 'media',
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}

export default Media