import { account, session, user, verification } from './auth'
import { clients } from './client'
import { products } from './product'
import { sales } from './sale'
import { saleServants } from './sale-servants'
import { servants } from './servant'
import { servantProducts } from './servant-products'
import { store } from './store'
import { suppliers } from './supplier'

export const schema = {
	user,
	account,
	session,
	verification,
	store,
	clients,
	servants,
	products,
	suppliers,
	sales,
	saleServants,
	servantProducts,
}
