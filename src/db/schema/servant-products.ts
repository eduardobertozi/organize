import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { product } from './product'
import { servant } from './servant'

export const servantProducts = pgTable(
	'servant_product',
	{
		servantId: uuid('servant_id')
			.notNull()
			.references(() => servant.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		productId: uuid('product_id')
			.notNull()
			.references(() => product.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(t) => [primaryKey({ columns: [t.servantId, t.productId] })]
)

export const servantProductsRelations = relations(
	servantProducts,
	({ one }) => ({
		product: one(product, {
			fields: [servantProducts.productId],
			references: [product.id],
		}),
		servant: one(servant, {
			fields: [servantProducts.servantId],
			references: [servant.id],
		}),
	})
)
