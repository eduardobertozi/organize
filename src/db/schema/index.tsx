import { account, session, user, verification } from './auth'
import { client } from './client'
import { product } from './product'
import { sale } from './sale'
import { saleServants } from './sale-servants'
import { servant } from './servant'
import { servantProducts } from './servant-products'
import { store } from './store'
import { supplier } from './supplier'

export const schema = {
	user,
	account,
	session,
	verification,
	store,
	client,
	servant,
	product,
	supplier,
	sale,
	saleServants,
	servantProducts,
}
