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
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroVideo',
              label: 'Hero Background Video',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero background video - MP4, max 10MB, 15-30 seconds recommended',
              },
            },
            {
              name: 'heroVideoMobile',
              label: 'Hero Video (Mobile)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Mobile version - Smaller file size recommended',
              },
            },
            {
              name: 'heroPosterImage',
              label: 'Hero Poster Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Video poster image - Shown while video is loading',
              },
            },
            {
              name: 'enableVideoAutoplay',
              label: 'Enable Video Autoplay',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Should the video autoplay?',
              },
            },
            {
              name: 'enableVideoLoop',
              label: 'Enable Video Loop',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Should the video loop?',
              },
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'headerLogo',
              label: 'Header Logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo displayed in the site header.',
              },
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'title1',
              label: 'First Title',
              type: 'text',
              defaultValue: 'About Us',
              required: false,
              admin: {
                description: 'First title in the about section.',
              },
            },
            {
              name: 'aboutContent1',
              label: 'First Content',
              type: 'textarea',
              required: false,
              admin: {
                description: 'First content text in the about section.',
              },
            },
            {
              name: 'title2',
              label: 'Second Title',
              type: 'text',
              defaultValue: 'Our Services',
              required: false,
              admin: {
                description: 'Second title in the about section.',
              },
            },
            {
              name: 'aboutContent2',
              label: 'Second Content',
              type: 'textarea',
              required: false,
              admin: {
                description: 'Second content text in the about section.',
              },
            },
            {
              name: 'aboutImage1',
              label: 'About Image 1',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'First image - Recommended size: 600x400 pixels',
              },
            },
            {
              name: 'aboutImage2',
              label: 'About Image 2',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'Second image - Recommended size: 600x400 pixels',
              },
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'galleryTitle',
              label: 'Gallery Title',
              type: 'text',
              defaultValue: 'Our Gallery',
              required: true,
              admin: {
                description: 'Title for the gallery section.',
              },
            },
            {
              name: 'galleryDescription',
              label: 'Gallery Description',
              type: 'textarea',
              defaultValue: 'Take a look at our workspace and facilities.',
              required: true,
              admin: {
                description: 'Description for the gallery section.',
              },
            },
            {
              name: 'galleryImages',
              label: 'Gallery Images',
              type: 'array',
              required: true,
              admin: {
                description: 'Maximum 10 images can be selected. Images will be displayed in order.',
              },
              validate: (value) => {
                if (!value || value.length === 0) {
                  return 'At least 1 image must be selected.'
                }
                if (value.length > 10) {
                  return 'Maximum 10 images can be selected.'
                }
                return true
              },
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                  admin: {
                    description: 'Gallery image - Recommended size: 800x600 pixels (4:3 ratio)',
                  },
                },
                {
                  name: 'caption',
                  label: 'Image Caption (Optional)',
                  type: 'text',
                  admin: {
                    description: 'Optional caption text for the image.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerLogo',
              label: 'Footer Logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo displayed in the site footer.',
              },
            },
            {
              name: 'footerDescription',
              label: 'Footer Description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Short description in the footer.',
              },
            },
            {
              name: 'copyrightText',
              label: 'Copyright Text',
              type: 'text',
              defaultValue: '© {YEAR} Your Company Name. All rights reserved.',
              admin: {
                description: 'Copyright text in footer. {YEAR} will be automatically replaced with current year.',
              },
            },
          ],
        },
      ],
    },
  ],
}