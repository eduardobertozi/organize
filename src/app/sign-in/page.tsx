import { PageTemplate } from '@/components/templates/page-template'
import { SignInForm } from './form'

export default function SignInPage() {
	return (
		<PageTemplate
			content={<SignInForm />}
			description="Entre com seus dados"
			horizontalLogo
			title="Entrar"
		/>
	)
}
