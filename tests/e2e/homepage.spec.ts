import { test, expect } from '@playwright/test'

/**
 * Homepage E2E Tests for Kale Payload Boilerplate
 * 
 * Basic tests to ensure the public-facing homepage works correctly
 */

test.describe('Homepage', () => {
  test('should display homepage correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/Kale Payload Boilerplate/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Hello World')
    
    // Check welcome message
    await expect(page.locator('p')).toContainText('Welcome to Kale Payload Boilerplate')
    
    // Check admin panel link exists and is clickable
    const adminLink = page.locator('a[href="/admin"]')
    await expect(adminLink).toBeVisible()
    await expect(adminLink).toContainText('Admin Panel')
    
    // Check GraphQL API link exists
    const graphqlLink = page.locator('a[href="/api/graphql"]')
    await expect(graphqlLink).toBeVisible()
    await expect(graphqlLink).toContainText('GraphQL API')
  })

  test('should navigate to admin panel from homepage', async ({ page }) => {
    await page.goto('/')
    
    // Click admin panel link
    await page.click('a[href="/admin"]')
    
    // Should redirect to admin (either dashboard or create-first-user)
    await expect(page).toHaveURL(/.*\/admin/)
  })
})