import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'
import { PageTemplate } from '@/components/templates/page-template'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const NotFoundContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>404 - Nada aqui</CardTitle>
				<CardDescription>Volte para a página inicial</CardDescription>
			</CardHeader>
			<CardContent>
				<Link href="/dashboard">
					<Button className="w-full" variant="outline">
						Voltar para a página inicial <Undo2Icon size={16} />
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: nextjs file convention
export default function NotFound() {
	return <PageTemplate content={<NotFoundContent />} horizontalLogo title="" />
}
