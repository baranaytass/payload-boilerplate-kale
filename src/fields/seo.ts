import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  label: 'SEO Meta Data',
  type: 'group',
  admin: {
    position: 'sidebar',
    description: 'Search engine optimization settings for this page.',
  },
  fields: [
    {
      name: 'metaTitle',
      label: 'Meta Title',
      type: 'text',
      admin: {
        description: 'Title for search engine results (max 60 characters recommended). Uses the main title if left blank.',
      },
    },
    {
      name: 'metaDescription',
      label: 'Meta Description',
      type: 'textarea',
      admin: {
        description: 'Short description for search engine results (max 160 characters recommended).',
      },
    },
    {
      name: 'metaKeywords',
      label: 'Meta Keywords',
      type: 'text',
      admin: {
        description: 'Comma-separated keywords relevant to the page content (optional).',
      },
    },
  ],
}