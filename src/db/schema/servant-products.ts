import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { products } from './product'
import { servants } from './servant'

export const servantProducts = pgTable(
	'servant_product',
	{
		servantId: uuid()
			.notNull()
			.references(() => servants.id),
		productId: uuid()
			.notNull()
			.references(() => products.id),
	},
	(t) => [primaryKey({ columns: [t.servantId, t.productId] })]
)

export const servantProductsRelations = relations(
	servantProducts,
	({ one }) => ({
		product: one(products, {
			fields: [servantProducts.productId],
			references: [products.id],
		}),
		servant: one(servants, {
			fields: [servantProducts.servantId],
			references: [servants.id],
		}),
	})
)
