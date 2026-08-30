import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import './globals.css'

/**
 * Site metadata comes from the CMS, not from this file.
 *
 * Editors change the site name, description and social image in Website
 * Settings and General Contents; none of that should need a deploy.
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })

    const [settings, contents] = await Promise.all([
      payload.findGlobal({ slug: 'website-settings', depth: 1 }),
      payload.findGlobal({ slug: 'general-contents', depth: 1 }),
    ])

    const siteName = settings?.siteName || 'Kale'
    const title = contents?.metaTitle || siteName
    const description = contents?.metaDescription || settings?.siteDescription || undefined

    const ogImage =
      contents?.ogImage && typeof contents.ogImage === 'object' ? contents.ogImage.url : null

    return {
      title: { default: title, template: `%s | ${siteName}` },
      description,
      openGraph: {
        title,
        description,
        siteName,
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      },
    }
  } catch {
    // A database that is unreachable at build time must not fail the build;
    // the page still renders and metadata fills in on the next request.
    return { title: 'Kale' }
  }
}

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  )
}
