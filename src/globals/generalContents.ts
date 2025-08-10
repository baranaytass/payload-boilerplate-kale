import { GlobalConfig } from 'payload'
import { admins } from '../access/admins'

export const GeneralContents: GlobalConfig = {
  slug: 'general-contents',
  label: 'General Contents',
  access: {
    read: () => true,
    update: admins,
  },
  admin: {
    group: 'Content Management',
  },
  fields: [
    {
      name: 'metaTitle',
      label: 'Meta Title',
      type: 'text',
      admin: {
        description: 'Page meta title for SEO - appears in browser tab and search results',
      },
    },
    {
      name: 'metaDescription',
      label: 'Meta Description',
      type: 'textarea',
      admin: {
        description: 'Page meta description for SEO - appears in search results',
      },
    },
    {
      name: 'ogImage',
      label: 'Open Graph Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image for social media sharing - Recommended size: 1200x630 pixels',
      },
    },
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      defaultValue: '© {YEAR} Your Company Name. All rights reserved.',
      admin: {
        description: 'Copyright text. {YEAR} will be automatically replaced with current year.',
      },
    },
  ],
}