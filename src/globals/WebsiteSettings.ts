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
      name: 'siteSlogan',
      label: 'Site Slogan',
      type: 'text',
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
        description: 'Comma-separated keywords (e.g., business, service, company)',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'address',
              label: 'Address',
              type: 'group',
              fields: [
                {
                  name: 'fullAddress',
                  label: 'Full Address',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'contact',
              label: 'Contact Details',
              type: 'group',
              fields: [
                {
                  name: 'phoneNumber1',
                  label: 'Phone Number 1',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'phoneNumber2',
                  label: 'Phone Number 2',
                  type: 'text',
                },
                {
                  name: 'whatsappNumber',
                  label: 'WhatsApp Number',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Include country code (e.g., 905362265947)',
                  },
                },
                {
                  name: 'email',
                  label: 'Email Address',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'mapEmbedUrl',
                  label: 'Google Maps Embed URL',
                  type: 'textarea',
                  admin: {
                    description: 'Paste the iframe code or src URL from Google Maps.',
                  },
                },
              ],
            },
            {
              name: 'operatingHours',
              label: 'Operating Hours',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Visuals',
          fields: [
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
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMediaLinks',
              label: 'Social Media Links',
              type: 'array',
              minRows: 0,
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  label: 'Profile URL',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}