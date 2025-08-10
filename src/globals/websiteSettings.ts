import type { GlobalConfig } from 'payload'
import { admins } from '../access/admins'

export const WebsiteSettings: GlobalConfig = {
  slug: 'website-settings',
  label: 'Website Settings',
  access: {
    read: () => true,
    update: admins,
  },
  admin: {
    group: 'Site Management',
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      required: true,
    },
    {
      name: 'siteDescription',
      label: 'Site Description',
      type: 'textarea',
      admin: {
        description: 'Brief description of your site - used for search engines and social media.',
      },
    },
    {
      name: 'siteKeywords',
      label: 'Site Keywords',
      type: 'text',
      admin: {
        description: 'Comma-separated keywords for SEO',
      },
    },
    {
      name: 'logo',
      label: 'Site Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Site logo - Recommended size: 400x200 pixels or SVG format',
      },
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Browser tab icon - Recommended size: 32x32 pixels (.ico or .png format)',
      },
    },
  ],
}