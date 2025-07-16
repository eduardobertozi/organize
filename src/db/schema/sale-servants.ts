import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { sale } from './sale'
import { servant } from './servant'

export const saleServants = pgTable(
	'sale_servants',
	{
		saleId: uuid('sale_id')
			.notNull()
			.references(() => sale.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		servantId: uuid('servant_id')
			.notNull()
			.references(() => servant.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(t) => [primaryKey({ columns: [t.saleId, t.servantId] })]
)

export const saleServantsRelations = relations(saleServants, ({ one }) => ({
	servant: one(servant, {
		fields: [saleServants.servantId],
		references: [servant.id],
	}),
	sale: one(sale, {
		fields: [saleServants.saleId],
		references: [sale.id],
	}),
}))
