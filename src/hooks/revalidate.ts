import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Ask the Next.js cache to drop the pages a collection feeds.
 *
 * The shared secret travels in a header, never in the URL: query strings are
 * written verbatim into server, proxy and CDN access logs, and this secret is
 * the one that signs every admin session.
 */
const revalidate = async (collection: string, operation: string, doc?: { id?: string | number; slug?: string }) => {
  const secret = process.env.REVALIDATE_SECRET

  // Without a dedicated secret there is nothing to authenticate with, so skip
  // rather than fall back to PAYLOAD_SECRET and put it on the wire.
  if (!secret) {
    return
  }

  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    const response = await fetch(`${serverURL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({
        collection,
        operation,
        doc: doc ? { id: doc.id, slug: doc.slug } : null,
      }),
    })

    if (!response.ok) {
      console.error(`Revalidation failed for ${collection}: ${response.status}`)
    }
  } catch (error) {
    console.error(`Revalidation error for ${collection}:`, error)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  collection,
}) => {
  if (process.env.NODE_ENV === 'development') {
    return doc
  }

  // Fire and forget: a slow cache purge must not hold up the editor's save.
  void revalidate(collection.slug, operation, doc)

  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  collection,
}) => {
  if (process.env.NODE_ENV === 'development') {
    return doc
  }

  void revalidate(collection.slug, 'delete', doc)

  return doc
}
