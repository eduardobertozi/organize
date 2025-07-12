import { MenuIcon } from 'lucide-react'
import { Logo, LogoHorizontal } from '@/components/logo'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { SignInForm } from './form'

export default function SignInPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center px-6 py-2">
			<header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background px-6 py-2">
				<MenuIcon size={24} />
				<Logo className="size-10" />
			</header>
			<Card className="w-full border-none bg-transparent pt-10 md:max-w-sm">
				<CardHeader>
					<LogoHorizontal className="mx-auto mb-8 w-full" />
					<CardTitle>Entrar</CardTitle>
					<CardDescription>Entre com seus dados</CardDescription>
				</CardHeader>
				<CardContent>
					<SignInForm />
				</CardContent>
			</Card>
		</div>
	)
}
