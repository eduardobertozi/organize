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
	content: React.ElementType<unknown>
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
	title,
	description,
	horizontalLogo = false,
	content: Content,
}) => {
	return (
		<div className="flex min-h-[100svh] w-full items-center justify-center px-6 py-2">
			<Header />
			<Card className="w-full border-none bg-transparent pt-10 md:max-w-sm">
				<CardHeader className="px-0">
					{horizontalLogo && (
						<LogoHorizontal className="mx-auto mb-8 w-full sm:w-40" />
					)}
					<CardTitle className="text-2xl">{title}</CardTitle>
					<CardDescription>{description ?? ''}</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					<Content />
				</CardContent>
			</Card>
		</div>
	)
}
