import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { collection, operation, doc } = body

    // Secret validation for security
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Log revalidation request
    console.log(`🔄 Revalidating after ${operation} on ${collection}:`, doc?.id)

    // Revalidate specific paths based on collection
    switch (collection) {
      case 'media':
        // Revalidate homepage and any pages that use media
        revalidatePath('/')
        revalidatePath('/admin')
        revalidateTag('media')
        break
      
      case 'users':
        revalidatePath('/admin')
        revalidateTag('users')
        break

      default:
        // Revalidate homepage for any other collection changes
        revalidatePath('/')
        revalidateTag(collection)
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      collection,
      operation 
    })

  } catch (err) {
    console.error('❌ Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}