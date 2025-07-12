import { PageTemplate } from '@/components/templates/page-template'
import { SignInForm } from './form'

export default function SignInPage() {
	return (
		<PageTemplate
			description="Entre com seus dados"
			form={<SignInForm />}
			horizontalLogo
			title="Entrar"
		/>
	)
}
