import { redirect } from 'next/navigation'
import type { JSX } from 'react'
import { getUser } from '@/actions/auth/get-user'
import { Header } from '../header'
import { LogoHorizontal } from '../logo'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

type PageTemplateProps = {
	title: string
	description?: string
	horizontalLogo?: boolean
	content: JSX.Element
}

export const PageTemplate: React.FC<PageTemplateProps> = async ({
	title,
	description,
	horizontalLogo = false,
	content,
}) => {
	const user = await getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	return (
		<div className="flex min-h-[100svh] w-full items-center justify-center px-6 py-2">
			<Header isLogged />
			<Card className="w-full border-none bg-transparent pt-10 md:max-w-sm">
				<CardHeader className="px-0">
					{horizontalLogo && (
						<LogoHorizontal className="mx-auto mb-8 w-full sm:w-40" />
					)}
					<CardTitle className="text-2xl">{title}</CardTitle>
					<CardDescription>{description ?? ''}</CardDescription>
				</CardHeader>
				<CardContent className="p-0">{content}</CardContent>
			</Card>
		</div>
	)
}
