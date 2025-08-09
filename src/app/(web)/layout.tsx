import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kale Payload Boilerplate',
  description: 'A modern Payload CMS boilerplate',
}

export default function WebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </div>
      </body>
    </html>
  )
}