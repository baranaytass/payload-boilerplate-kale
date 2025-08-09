import { Media } from '../payload-types'

// Error handling for media operations
export class MediaError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'MediaError'
  }
}

// Safe media URL extraction with error handling
export const getMediaUrl = (media: string | Media | null | undefined): string | null => {
  try {
    if (!media) return null
    
    if (typeof media === 'string') return media
    
    if (typeof media === 'object' && media.url) {
      return media.url
    }
    
    return null
  } catch (error) {
    console.error('Error extracting media URL:', error)
    return null
  }
}

// Safe alt text extraction
export const getMediaAlt = (media: string | Media | null | undefined): string => {
  try {
    if (!media || typeof media === 'string') return ''
    
    if (typeof media === 'object' && media.alt) {
      return media.alt
    }
    
    return ''
  } catch (error) {
    console.error('Error extracting media alt text:', error)
    return ''
  }
}

// Media optimization helper
export const getOptimizedMediaUrl = (
  media: string | Media | null | undefined,
  size: 'thumbnail' | 'card' | 'tablet' = 'card'
): string | null => {
  try {
    const baseUrl = getMediaUrl(media)
    if (!baseUrl || typeof media === 'string') return baseUrl
    
    if (typeof media === 'object' && media.sizes && media.sizes[size]) {
      return media.sizes[size]?.url || baseUrl
    }
    
    return baseUrl
  } catch (error) {
    console.error('Error getting optimized media URL:', error)
    return getMediaUrl(media)
  }
}

// Global error handler for async operations
export const safeAsync = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  errorMessage?: string
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    console.error(errorMessage || 'Async operation failed:', error)
    return fallback
  }
}