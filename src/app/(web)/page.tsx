import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1 style={{ color: '#2d3748', marginBottom: '20px' }}>
        Hello World
      </h1>
      <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
        Welcome to Kale Payload Boilerplate! This is a clean starting point for your next project.
      </p>
      <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '10px' }}>Quick Links</h2>
        <ul style={{ color: '#4a5568' }}>
          <li style={{ marginBottom: '8px' }}>
            <Link href="/admin" style={{ color: '#3182ce', textDecoration: 'none' }}>
              Admin Panel
            </Link>
          </li>
          <li>
            <Link href="/api/graphql" style={{ color: '#3182ce', textDecoration: 'none' }}>
              GraphQL API
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}