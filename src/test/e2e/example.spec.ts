import { expect, test } from '@playwright/test'

// biome-ignore lint/suspicious/noSkippedTests: only example, skip this
test.skip('has title', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByText('Home')).toBeVisible()
})
