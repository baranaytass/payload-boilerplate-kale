import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

// Serve from cache and refresh in the background; content edits purge this
// through the revalidate hook rather than waiting for the window to lapse.
export const revalidate = 60

async function getSiteName(): Promise<string> {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'website-settings' })
    return settings?.siteName || 'Kale'
  } catch {
    // Keep rendering if the database is unavailable at build time.
    return 'Kale'
  }
}

export default async function HomePage() {
  const siteName = await getSiteName()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{siteName}</h1>

      <p className="mt-4 text-neutral-600">
        This starting page reads its content from the CMS. Replace it with the real site;
        the wiring for CMS-driven content and metadata is already in place.
      </p>

      <nav className="mt-10 border-t border-neutral-200 pt-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Quick links
        </h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link href="/admin" className="text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
              Admin panel
            </Link>
          </li>
          <li>
            <Link href="/api/graphql" className="text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
              GraphQL API
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}
