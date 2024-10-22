import { test, expect } from '@playwright/test';

test('should have title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Angular Task: List');
});
