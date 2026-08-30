import { timingSafeEqual } from 'crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/** Constant-time comparison, so a wrong secret cannot be guessed by timing. */
const secretMatches = (provided: string | null, expected: string): boolean => {
  if (!provided) return false

  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET

  // Refuse rather than revalidate for anyone: an unset secret would otherwise
  // leave this endpoint open to anonymous cache purges.
  if (!expected) {
    console.error('REVALIDATE_SECRET is not set; refusing to revalidate.')
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 })
  }

  if (!secretMatches(request.headers.get('x-revalidate-secret'), expected)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let collection: string
  let operation: string | undefined

  try {
    const body = await request.json()
    collection = body?.collection
    operation = body?.operation

    if (typeof collection !== 'string' || !collection) {
      return NextResponse.json({ message: 'collection is required' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  switch (collection) {
    case 'media':
      revalidatePath('/')
      revalidateTag('media')
      break

    case 'users':
      // Users do not appear on public pages; nothing to purge.
      break

    default:
      revalidatePath('/')
      revalidateTag(collection)
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    collection,
    operation,
  })
}
