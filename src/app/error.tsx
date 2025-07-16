'use client'

import { RefreshCcwIcon, Undo2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PageTemplate } from '@/components/templates/page-template'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

type ErrorProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorContent = ({ reset }: ErrorProps) => {
	const router = useRouter()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Ops, algo deu errado</CardTitle>
				<CardDescription>
					Tente novamente ou entre em contato com o suporte
				</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-2">
				<Button onClick={reset} variant="destructive">
					Tentar novamente <RefreshCcwIcon size={16} />
				</Button>
				<Button onClick={() => router.replace('/dashboard')} variant="outline">
					Voltar <Undo2Icon size={16} />
				</Button>
			</CardContent>
		</Card>
	)
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: nextjs file convention
export default function Error(props: ErrorProps) {
	return (
		<PageTemplate
			content={<ErrorContent {...props} />}
			horizontalLogo
			title=""
		/>
	)
}
