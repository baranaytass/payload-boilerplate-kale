import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Type and lint errors fail the build on purpose. Suppressing them lets
  // broken code reach production, which is exactly what a build is meant to
  // catch. Run `npm run lint` and `npm run typecheck` locally to see them early.
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },

  // The admin panel is not a public page and must never be indexed.
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default withPayload(nextConfig)
