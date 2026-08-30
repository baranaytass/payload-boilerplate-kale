import { test, expect } from '@playwright/test'
import { e2e } from 'fair-playwright'

/**
 * Public-facing homepage.
 *
 * Steps are declared through the fair-playwright `e2e` helper so the reporter can
 * render a MAJOR/MINOR hierarchy and, on failure, report exactly which step broke.
 * Do not add manual console.log() calls for progress — the reporter owns that output.
 */
test.describe('Homepage', () => {
  test('renders the landing content', async ({ page }) => {
    await e2e.quick(
      'Homepage renders',
      [
        [
          'Open the homepage',
          async () => {
            await page.goto('/')
          },
          { failure: 'Homepage did not load' },
        ],
        [
          'Page title identifies the boilerplate',
          async () => {
            await expect(page).toHaveTitle(/Kale Payload Boilerplate/)
          },
        ],
        [
          'Heading and welcome copy are visible',
          async () => {
            await expect(page.locator('h1')).toContainText('Hello World')
            await expect(page.locator('p')).toContainText('Welcome to Kale Payload Boilerplate')
          },
        ],
        [
          'Admin and GraphQL entry points are present',
          async () => {
            const adminLink = page.locator('a[href="/admin"]')
            await expect(adminLink).toBeVisible()
            await expect(adminLink).toContainText('Admin Panel')

            const graphqlLink = page.locator('a[href="/api/graphql"]')
            await expect(graphqlLink).toBeVisible()
            await expect(graphqlLink).toContainText('GraphQL API')
          },
        ],
      ],
      { success: 'Homepage rendered with all entry points' }
    )
  })

  test('navigates to the admin panel', async ({ page }) => {
    await e2e.quick('Homepage to admin navigation', [
      [
        'Open the homepage',
        async () => {
          await page.goto('/')
        },
      ],
      [
        'Follow the admin panel link',
        async () => {
          await page.click('a[href="/admin"]')
        },
      ],
      [
        'Land on an admin route',
        async () => {
          // Payload sends first-run visitors to /admin/create-first-user.
          await expect(page).toHaveURL(/.*\/admin/)
        },
        { failure: 'Admin link did not lead to an /admin route' },
      ],
    ])
  })
})
