import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for Kale Payload Boilerplate.
 *
 * Test output is produced by `fair-playwright`, an AI-optimized reporter:
 *  - console : progressive terminal output with MAJOR/MINOR step hierarchy
 *  - ai      : markdown summary for pasting into an AI assistant
 *  - json    : machine-readable results, consumed by the fair-playwright MCP server
 *              (registered in ../.mcp.json). Keep this enabled — the MCP server has
 *              nothing to read without it.
 *
 * On CI the reporter is paired with the built-in list + html reporters so that
 * failures stay readable in raw CI logs, where progressive redraw is not available.
 */
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    [
      'fair-playwright',
      {
        mode: isCI ? 'full' : 'progressive',
        output: {
          console: true,
          ai: './test-results/ai-summary.md',
          json: './test-results/results.json',
        },
        compression: {
          passedTests: 'summary',
          failureContext: {
            steps: 3,
            screenshot: true,
            trace: true,
            logs: true,
          },
        },
      },
    ],
    ...(isCI
      ? [['list', {}] as const, ['html', { open: 'never' }] as const]
      : []),
  ],

  // On CI, start the app ourselves. Locally, reuse whatever is already running
  // so `npm run dev` in another terminal keeps its state.
  webServer: isCI
    ? {
        command: 'npm run build && npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: false,
        timeout: 300_000,
      }
    : undefined,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
