import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Playwright specs live in tests/ and are run by `npm run test:e2e`.
    include: ['src/**/*.test.ts'],
  },
})
