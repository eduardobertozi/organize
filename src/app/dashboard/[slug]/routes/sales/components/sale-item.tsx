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
	const { background, label } = setBadgeDetails(sale.status)

	return (
		<EditSale sale={sale}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer flex-col gap-4 border-b bg-accent/20 p-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<div className="flex w-full items-center justify-between">
						<Badge className={background}>{label}</Badge>
						<span>{dayjs(sale.date).format('DD/MM/YYYY')}</span>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground">Cliente: </p>
							<p className="truncate">{sale.name}</p>
						</div>
						<div>
							<p className="text-end text-muted-foreground">Atendido por: </p>
							<p className="truncate">{sale.seller}</p>
						</div>
					</div>
				</div>
			</div>
		</EditSale>
	)
}
