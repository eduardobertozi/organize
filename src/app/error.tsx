'use client'

import { RefreshCcwIcon, Undo2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoHorizontal } from '@/components/logo'
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

export default function ErrorPage({ reset }: ErrorProps) {
	const router = useRouter()

	return (
		<div className="flex h-screen w-full items-center justify-center px-6 py-2">
			<Card>
				<CardHeader>
					<LogoHorizontal className="mx-auto mb-8 w-full sm:w-40" />
					<CardTitle>Ops, algo deu errado</CardTitle>
					<CardDescription>
						Tente novamente ou entre em contato com o suporte
					</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-between gap-2">
					<Button onClick={reset} variant="destructive">
						Tentar novamente <RefreshCcwIcon size={16} />
					</Button>
					<Button
						onClick={() => router.replace('/dashboard')}
						variant="outline"
					>
						Voltar <Undo2Icon size={16} />
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
