import { MenuIcon } from 'lucide-react'
import { Logo, LogoHorizontal } from '@/components/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SignUpForm } from './form'

export default function SignUnPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-6">
			<header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background px-6 py-2">
				<MenuIcon size={24} />
				<Logo className="size-10" />
			</header>
			<Card className="w-full max-w-sm border-none bg-transparent pt-10">
				<CardHeader>
					<LogoHorizontal className="mx-auto mb-8 w-full" />
					<CardTitle>Crie sua conta</CardTitle>
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
			</Card>
		</div>
	)
}
