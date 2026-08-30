import type { Config } from 'tailwindcss'

export default {
  // Only the public site is scanned. The Payload admin ships its own styles and
  // must not be swept into this build.
  content: ['./src/app/(web)/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
