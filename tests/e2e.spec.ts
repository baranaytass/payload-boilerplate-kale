import { test, expect } from '@playwright/test'

test.describe('Basic E2E Tests', () => {
  test('Homepage loads successfully', async ({ page }) => {
    console.log('Testing homepage...')
    await page.goto('/')
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/baranaytas|Kale|Portfolio/)
    
    // Should not show any error messages
    const errorTexts = ['500', 'Internal Server Error', 'Something went wrong']
    for (const errorText of errorTexts) {
      await expect(page.locator('body')).not.toContainText(errorText)
    }
    
    console.log('✓ Homepage test passed')
  })

  test('Admin panel is accessible', async ({ page }) => {
    console.log('Testing admin panel access...')
    await page.goto('/admin')
    
    // Wait for page to load and check for admin content
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Check for admin-specific indicators
    const adminIndicators = [
      'Dashboard - Kale CMS', // Title
      'Kale CMS', // Branding
      'Authentication Required',
      'Email',
      'Password', 
      'Create First User',
      'Sign In',
      'Login'
    ]
    
    const pageContent = await page.content()
    let foundIndicator = false
    
    for (const indicator of adminIndicators) {
      if (pageContent.includes(indicator)) {
        console.log(`✓ Found admin indicator: ${indicator}`)
        foundIndicator = true
        break
      }
    }
    
    expect(foundIndicator).toBe(true)
    
    // Should not show server errors (exclude Next.js redirect codes)
    const errorTexts = ['500: Internal Server Error', 'Cannot connect', 'something went wrong']
    for (const errorText of errorTexts) {
      expect(pageContent.toLowerCase()).not.toContain(errorText.toLowerCase())
    }
    
    console.log('✓ Admin panel test passed')
  })

  test('No critical console errors', async ({ page }) => {
    console.log('Testing for console errors...')
    const errors: string[] = []
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.goto('/admin')
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('extension') &&
      !error.includes('chrome-error') &&
      !error.includes('405') && // Method not allowed (normal for some endpoints)
      !error.includes('Failed to load resource') && // Often non-critical
      !error.includes('importMap') && // Development-time warning
      !error.toLowerCase().includes('warning')
    )
    
    if (criticalErrors.length > 0) {
      console.log('Critical errors found:', criticalErrors)
    }
    
    expect(criticalErrors.length).toBe(0)
    console.log('✓ No critical console errors')
  })
})