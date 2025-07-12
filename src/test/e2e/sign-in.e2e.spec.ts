import { expect, test } from '@playwright/test'

test.describe('/sign-in', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/sign-in')
	})

	test('error on send incorrect credentials format', async ({ page }) => {
		await page.goto('/sign-in')

		await page.fill('input[name="username"]', 'invalid-email')
		await page.fill('input[name="password"]', 'invalid-password')
		await page.getByRole('button', { name: 'Entrar' }).click()

		await expect(page.getByText('Usuário ou senha inválidos')).toBeVisible()
	})

	test('error on send incorrect credentials', async ({ page }) => {
		await page.goto('/sign-in')

		await page.fill('input[name="username"]', 'invalid@email.com')
		await page.fill('input[name="password"]', 'invalid-password')
		await page.getByRole('button', { name: 'Entrar' }).click()

		const toaster = page.locator('text="Usuário não autorizado"')
		await expect(toaster).toBeVisible()
	})
})
