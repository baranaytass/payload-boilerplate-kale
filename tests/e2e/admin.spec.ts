import { test, expect } from '@playwright/test'

/**
 * Admin Panel E2E Tests for Kale Payload Boilerplate
 * 
 * These tests are designed to be AI-friendly with:
 * - Clear test descriptions and assertions
 * - Descriptive selectors and actions
 * - Comprehensive error handling
 * - Step-by-step validation
 */

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage first
    await page.goto('/')
    
    // Ensure the page is loaded
    await expect(page).toHaveTitle(/Kale Payload Boilerplate/)
  })

  test('should redirect to create-first-user when accessing admin for the first time', async ({ page }) => {
    // Click on the Admin Panel link from homepage
    await page.click('a[href="/admin"]')
    
    // Should redirect to create-first-user page
    await expect(page).toHaveURL(/.*\/admin\/create-first-user/)
    
    // Verify the create first user form is visible
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('should access admin panel without webpack errors', async ({ page }) => {
    // Navigate to admin panel
    await page.goto('/admin')
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    // Verify the page loaded successfully (no 500 errors or webpack issues)
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Kale CMS')
    
    // Check that the page is not showing error states
    const hasRuntimeError = await page.locator('.nextjs-container-runtime-error, [data-nextjs-dialog]').count()
    expect(hasRuntimeError).toBe(0)
    
    // Verify the admin interface is loading (regardless of login/create-user state)
    const hasValidAdminContent = await page.locator('body:not(:empty)').count()
    expect(hasValidAdminContent).toBeGreaterThan(0)
    
    console.log(`Admin panel loaded successfully at: ${page.url()}`)
  })

  test('should display admin dashboard elements correctly', async ({ page }) => {
    // This test assumes a user already exists
    await page.goto('/admin')
    
    // If redirected to create-first-user, create one
    if (page.url().includes('create-first-user')) {
      await expect(page.locator('input[name="email"]:not([disabled])')).toBeVisible({ timeout: 15000 })
      await page.locator('input[name="email"]').fill('admin@test.com')
      await page.locator('input[name="password"]').fill('testpassword123')
      await page.locator('input[name="confirm-password"]').fill('testpassword123')
      await page.locator('input[name="firstName"]').fill('Test')
      await page.locator('input[name="lastName"]').fill('Admin')
      await page.waitForTimeout(1000)
      await expect(page.locator('button[type="submit"]:not([disabled])')).toBeVisible({ timeout: 5000 })
      await page.click('button[type="submit"]')
      await expect(page).toHaveURL(/.*\/admin$/, { timeout: 20000 })
    }
    
    // Verify admin panel is accessible and functional
    await expect(page).toHaveURL(/.*\/admin/)
    
    // Check for Payload CMS admin interface elements
    const adminElements = [
      'nav', '.nav', '[role="navigation"]', 
      '.collections', '.dashboard', 
      'a[href*="collections"]'
    ]
    
    // At least one admin element should be visible
    let elementFound = false
    for (const selector of adminElements) {
      try {
        if (await page.locator(selector).isVisible({ timeout: 5000 })) {
          elementFound = true
          break
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    expect(elementFound).toBe(true)
  })

  test('should allow access to collections', async ({ page }) => {
    await page.goto('/admin')
    
    // Handle create-first-user flow if needed
    if (page.url().includes('create-first-user')) {
      await expect(page.locator('input[name="email"]:not([disabled])')).toBeVisible({ timeout: 15000 })
      await page.locator('input[name="email"]').fill('admin@test.com')
      await page.locator('input[name="password"]').fill('testpassword123')
      await page.locator('input[name="confirm-password"]').fill('testpassword123')
      await page.locator('input[name="firstName"]').fill('Test')
      await page.locator('input[name="lastName"]').fill('Admin')
      await page.waitForTimeout(1000)
      await expect(page.locator('button[type="submit"]:not([disabled])')).toBeVisible({ timeout: 5000 })
      await page.click('button[type="submit"]')
      await expect(page).toHaveURL(/.*\/admin$/, { timeout: 20000 })
    }
    
    // Try to access Users collection
    await page.goto('/admin/collections/users')
    await expect(page).toHaveURL(/.*\/admin\/collections\/users/)
    
    // Try to access Media collection
    await page.goto('/admin/collections/media')
    await expect(page).toHaveURL(/.*\/admin\/collections\/media/)
  })
})