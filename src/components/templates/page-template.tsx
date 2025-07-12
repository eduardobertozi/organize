import { MenuIcon } from 'lucide-react'
import type { JSX } from 'react'
import { Logo, LogoHorizontal } from '../logo'
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

export const PageTemplate: React.FC<PageTemplateProps> = ({
	title,
	description,
	horizontalLogo = false,
	content,
}) => {
	return (
		<div className="flex min-h-screen w-full items-center justify-center px-6 py-2">
			<header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background px-6 py-2">
				<MenuIcon size={24} />
				<Logo className="size-10" />
			</header>
			<Card className="w-full border-none bg-transparent pt-10 md:max-w-sm">
				<CardHeader>
					{horizontalLogo && (
						<LogoHorizontal className="mx-auto mb-8 w-full sm:w-40" />
					)}
					<CardTitle className="text-2xl">{title}</CardTitle>
					<CardDescription>{description ?? ''}</CardDescription>
				</CardHeader>
				<CardContent>{content}</CardContent>
			</Card>
		</div>
	)
}
