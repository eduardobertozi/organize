import { PageTemplate } from '@/components/templates/page-template'
import { Status } from './_routes/dashboard'
import { Sales } from './_routes/sales/sales'
import { Servants } from './_routes/servants/servants'

const component = {
	dashboard: <PageTemplate content={<Status />} title="Bem vindo de volta" />,
	sales: <PageTemplate content={<Sales />} title="Vendas" />,
	servants: <PageTemplate content={<Servants />} title="Serviços" />,
}

type DashboardProps = {
	params: Promise<{
		slug: string
	}>
}

export default async function Dashboard({ params }: DashboardProps) {
	const { slug } = await params

	if (!slug) {
		return <PageTemplate content={<Status />} title="Bem vindo de volta" />
	}

	return component[slug as keyof typeof component]
}
