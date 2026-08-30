import { test, expect } from '@playwright/test'
import { e2e } from 'fair-playwright'

/**
 * Payload admin panel smoke coverage.
 *
 * Every assertion runs inside a named fair-playwright step, so a failure names the
 * collection or global that broke instead of a bare status-code mismatch.
 */
test.describe('Admin Panel', () => {
  test('loads without runtime errors', async ({ page }) => {
    await e2e.quick(
      'Admin panel boots',
      [
        [
          'Open /admin',
          async () => {
            await page.goto('/admin')
            await page.waitForLoadState('networkidle', { timeout: 10_000 })
          },
          { failure: 'Admin panel did not finish loading' },
        ],
        [
          'Document title carries the CMS branding',
          async () => {
            await expect(page).toHaveTitle(/Kale CMS/)
          },
        ],
        [
          'No Next.js runtime error overlay is rendered',
          async () => {
            const overlay = page.locator(
              '.nextjs-container-runtime-error, [data-nextjs-dialog]'
            )
            await expect(overlay).toHaveCount(0)
          },
          { failure: 'Next.js runtime error overlay is visible on /admin' },
        ],
        [
          'Page shows either the dashboard or an auth gate',
          async () => {
            // A fresh database lands on create-first-user; a seeded one on login.
            const body = page.locator('body')
            await expect(body).toContainText(
              /Kale CMS|Sign In|Login|Create First User|Email/i
            )
            await expect(body).not.toContainText(/Internal Server Error/i)
          },
        ],
      ],
      { success: 'Admin panel reachable and error-free' }
    )
  })

  test('exposes core collections and globals', async ({ page }) => {
    await e2e.quick('Admin routes respond', [
      [
        'Users collection is reachable',
        async () => {
          const response = await page.goto('/admin/collections/users')
          expect(response?.status()).toBeLessThan(400)
        },
        { failure: 'Users collection route failed' },
      ],
      [
        'Media collection is reachable',
        async () => {
          const response = await page.goto('/admin/collections/media')
          expect(response?.status()).toBeLessThan(400)
        },
        { failure: 'Media collection route failed' },
      ],
      [
        'Website settings global is reachable',
        async () => {
          const response = await page.goto('/admin/globals/website-settings')
          expect(response?.status()).toBeLessThan(400)
        },
        { failure: 'Website settings global route failed' },
      ],
      [
        'General contents global is reachable',
        async () => {
          const response = await page.goto('/admin/globals/general-contents')
          expect(response?.status()).toBeLessThan(400)
        },
        { failure: 'General contents global route failed' },
      ],
    ])
  })

  test('produces no critical browser console errors', async ({ page }) => {
    const errors: string[] = []

    // Ignorable noise: asset 404s, browser extensions, and dev-time warnings that
    // do not indicate a broken page.
    const IGNORED = [
      /favicon/i,
      /extension/i,
      /chrome-error/i,
      /\b405\b/,
      /Failed to load resource/i,
      /importMap/i,
      /warning/i,
    ]

    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const text = message.text()
      if (IGNORED.some((pattern) => pattern.test(text))) return
      errors.push(text)
    })

    await e2e.quick(
      'Console stays clean across key routes',
      [
        [
          'Visit the homepage',
          async () => {
            await page.goto('/')
            await page.waitForLoadState('networkidle', { timeout: 10_000 })
          },
        ],
        [
          'Visit the admin panel',
          async () => {
            await page.goto('/admin')
            await page.waitForLoadState('networkidle', { timeout: 10_000 })
          },
        ],
        [
          'No critical console errors were recorded',
          async () => {
            expect(errors, `Critical console errors:\n${errors.join('\n')}`).toEqual([])
          },
          { failure: 'Browser reported critical console errors' },
        ],
      ],
      { success: 'No critical console errors on / or /admin' }
    )
  })
})
