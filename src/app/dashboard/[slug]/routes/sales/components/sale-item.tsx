import { Badge } from '@/components/ui/badge'
import { dayjs } from '@/lib/dayjs'
import type { SaleDetails } from '@/types/sale'
import { EditSale } from './edit-sale'

type SaleItemProps = {
	sale: SaleDetails
}

function setBadgeDetails(status: string) {
	switch (status) {
		case 'completed':
			return {
				background: 'bg-emerald-500',
				label: 'Atendido',
			}
		case 'awaiting':
			return {
				background: 'bg-yellow-600',
				label: 'Em espera',
			}
		case 'canceled':
			return {
				background: 'bg-red-500',
				label: 'Cancelado',
			}
		default:
			return {
				background: 'bg-zinc-500',
				label: 'Pendente',
			}
	}
}

export const SaleItem: React.FC<SaleItemProps> = ({ sale }) => {
	const saleObject = {
		id: sale.id,
		clientId: sale.clientId,
		servants: sale.servants,
		amount: sale.amount,
		date: sale.date,
		status: sale.status,
	}

	const { background, label } = setBadgeDetails(sale.status)

	return (
		<EditSale sale={saleObject}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer flex-col gap-2 border-b bg-accent/20 px-2 py-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<div className="flex w-full items-center justify-between gap-2">
						<span>{dayjs(sale.date).format('DD/MM/YYYY')}</span>
						<Badge className={background}>{label}</Badge>
					</div>
					<span className="mt-2 truncate">{sale.name}</span>
				</div>
			</div>
		</EditSale>
	)
}
