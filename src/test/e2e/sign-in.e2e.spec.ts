import { expect, test } from '@playwright/test'

test.describe.skip('/sign-in', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/sign-in')
	})

	test('error on send incorrect credentials format', async ({ page }) => {
		await page.fill('input[name="username"]', 'invalid-email')
		await page.fill('input[name="password"]', 'invalid-password')
		await page.getByRole('button', { name: 'Entrar' }).click()

		await expect(page.getByText('Usuário ou senha inválidos')).toBeVisible()
	})

	test('error on send incorrect credentials', async ({ page }) => {
		await page.fill('input[name="username"]', 'invalid@email.com')
		await page.fill('input[name="password"]', 'invalid-password')
		await page.getByRole('button', { name: 'Entrar' }).click()

		const toaster = page.locator('text="Usuário não autorizado"')
		await expect(toaster).toBeVisible()
	})

	test('success on send valid credentials and redirect to /dashboard', async ({
		page,
	}) => {
		await page.fill('input[name="username"]', 'edu.desenvolvedorweb@gmail.com')
		await page.fill('input[name="password"]', 'bjeduardobj15')
		await page.getByRole('button', { name: 'Entrar' }).click()

		// await expect(page).toHaveURL('/dashboard')
	})
})
