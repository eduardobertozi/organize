import { redirect } from 'next/navigation'
import { PageTemplate } from '@/components/templates/page-template'
import { Clients } from './routes/clients'
import { Products } from './routes/products'
import { Sales } from './routes/sales'
import { Servants } from './routes/servants'

const component = {
	sales: <PageTemplate content={Sales} title="Vendas" />,
	servants: <PageTemplate content={Servants} title="Serviços" />,
	products: <PageTemplate content={Products} title="Produtos" />,
	clients: <PageTemplate content={Clients} title="Clientes" />,
}

type PrivateRoutesProps = {
	params: Promise<{
		slug: string
	}>
}

export default async function PrivateRoutes({ params }: PrivateRoutesProps) {
	const { slug } = await params

	if (!slug) {
		return redirect('/dashboard')
	}

	return component[slug as keyof typeof component]
}
