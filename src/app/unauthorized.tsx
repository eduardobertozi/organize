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

const UnauthorizedContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>401 ❌ - Você não tem autorização</CardTitle>
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

export default function Unauthorized() {
	return (
		<PageTemplate content={<UnauthorizedContent />} horizontalLogo title="" />
	)
}
