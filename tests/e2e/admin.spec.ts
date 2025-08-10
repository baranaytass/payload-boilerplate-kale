import { test, expect } from '@playwright/test'

test.describe('Admin Panel', () => {
  test('admin panel loads without errors', async ({ page }) => {
    await page.goto('/admin')
    
    // Check for successful load (no 500/webpack errors)
    const title = await page.title()
    expect(title).toContain('Kale CMS')
    
    // Verify no runtime errors
    const errorCount = await page.locator('.nextjs-container-runtime-error, [data-nextjs-dialog]').count()
    expect(errorCount).toBe(0)
    
    console.log(`✓ Admin panel loaded: ${page.url()}`)
  })

  test('collections are accessible', async ({ page }) => {
    const response1 = await page.goto('/admin/collections/users')
    expect(response1?.status()).toBeLessThan(400)
    console.log(`✓ Users collection accessible`)
    
    const response2 = await page.goto('/admin/collections/media')
    expect(response2?.status()).toBeLessThan(400)
    console.log(`✓ Media collection accessible`)
  })

  test('globals are accessible', async ({ page }) => {
    const response1 = await page.goto('/admin/globals/website-settings')
    expect(response1?.status()).toBeLessThan(400)
    console.log(`✓ Website settings accessible`)
    
    const response2 = await page.goto('/admin/globals/general-contents')
    expect(response2?.status()).toBeLessThan(400)
    console.log(`✓ General contents accessible`)
  })
})