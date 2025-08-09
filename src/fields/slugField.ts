import { Field, FieldHook } from 'payload'
import { formatSlug } from '../utilities/formatSlug'

// Define the hook type explicitly
// The hook receives the source field name via closure
const createFormatSlugHook = (fieldToUseSource: string): FieldHook => {
  return async ({ value, data }) => {
    // Use the source field name passed via closure
    if (!value && data && data[fieldToUseSource]) {
      return formatSlug(data[fieldToUseSource])
    }
    // If value exists, format it anyway to ensure consistency
    if (typeof value === 'string') {
      return formatSlug(value)
    }
    return value
  }
}

export const slugField = (fieldToUseSource: string, label: string = 'Slug'): Field => ({
  name: 'slug',
  label,
  type: 'text',
  index: true,
  unique: true, // Ensure slugs are unique across the collection
  admin: {
    position: 'sidebar',
    description: 'Generated automatically from title, but can be edited manually. Must be unique.',
    readOnly: false, // Allow manual editing
  },
  hooks: {
    beforeValidate: [
      createFormatSlugHook(fieldToUseSource), // Create the hook with source field name
    ],
  },
})