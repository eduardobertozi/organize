import { PageTemplate } from '../templates/page-template'
import { Appointments } from './appointments'
import { Clients } from './clients'
import { Products } from './products'
import { Sales } from './sales'
import { Servants } from './servants'

export const privateRoutes = {
	sales: <PageTemplate content={Sales} title="Vendas" />,
	servants: <PageTemplate content={Servants} title="Serviços" />,
	products: <PageTemplate content={Products} title="Produtos" />,
	clients: <PageTemplate content={Clients} title="Clientes" />,
}

export const publicRoutes = {
	appointments: <PageTemplate content={Appointments} title="Agendamentos" />,
}
