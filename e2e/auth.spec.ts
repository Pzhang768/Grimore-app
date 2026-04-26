import { test, expect } from '@playwright/test'

// TODO: enable once auth guard middleware is implemented
test.skip('unauthenticated user visiting /dashboard is redirected to /login', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login/)
})

test('/ redirects to /dashboard', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/dashboard/)
})
