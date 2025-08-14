import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const revalidate = async (collection: string, operation: string, doc?: any) => {
  try {
    const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const revalidateURL = `${serverURL}/api/revalidate?secret=${process.env.PAYLOAD_SECRET}`
    
    const response = await fetch(revalidateURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection,
        operation,
        doc: doc ? { id: doc.id, slug: doc.slug } : null,
      }),
    })

    if (!response.ok) {
      console.error(`❌ Revalidation failed for ${collection}:`, response.status)
      return
    }

    const result = await response.json()
    console.log(`✅ Revalidated ${collection} after ${operation}:`, result)
    
  } catch (error) {
    console.error(`❌ Revalidation error for ${collection}:`, error)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  collection,
}) => {
  // Skip revalidation in development to avoid unnecessary requests
  if (process.env.NODE_ENV === 'development') {
    return doc
  }

  // Perform revalidation in background (don't wait)
  revalidate(collection.slug, operation, doc)
  
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  // Skip revalidation in development to avoid unnecessary requests
  if (process.env.NODE_ENV === 'development') {
    return doc
  }

  // Perform revalidation in background (don't wait)
  revalidate(collection.slug, 'delete', doc)
  
  return doc
}