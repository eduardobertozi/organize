import { render } from '@testing-library/react'
import { vi } from 'vitest'
import PageSignIn from './page'

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		replace: vi.fn(),
	}),
}))

let screen: ReturnType<typeof render>

describe('<PageSignIn />', () => {
	beforeEach(() => {
		screen = render(<PageSignIn />)
	})

	it('should have a title', () => {
		expect(
			screen.getByText('Entrar', { selector: '[data-slot="card-title"]' })
		).toBeInTheDocument()
	})

	it('should have a horizontal logo', () => {
		expect(screen.getByTestId('logo-horizontal')).toBeInTheDocument()
	})

	it('should have a description', async () => {
		const description = await screen.findByText('Entre com seus dados')
		expect(description).toBeInTheDocument()
	})

	it('should render a <SignInForm />', () => {
		expect(screen.getByTestId('sign-in-form')).toBeInTheDocument()
	})
})
