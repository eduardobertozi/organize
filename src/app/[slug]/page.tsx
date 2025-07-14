import { redirect } from 'next/navigation'
import { PageTemplate } from '@/components/templates/page-template'
import { getUser } from '@/http/actions/auth/get-user'
import { Main } from './routes/main'
import { Products } from './routes/products'
import { Sales } from './routes/sales'
import { Servants } from './routes/servants'

const component = {
	dashboard: <PageTemplate content={<Main />} title="Bem vindo de volta" />,
	sales: <PageTemplate content={<Sales />} title="Vendas" />,
	servants: <PageTemplate content={<Servants />} title="Serviços" />,
	products: <PageTemplate content={<Products />} title="Produtos" />,
}

type DashboardProps = {
	params: Promise<{
		slug: string
	}>
}

export default async function Dashboard({ params }: DashboardProps) {
	const { slug } = await params

	const user = await getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	if (!slug) {
		return <PageTemplate content={<Main />} title="Bem vindo de volta" />
	}

	return component[slug as keyof typeof component]
}
