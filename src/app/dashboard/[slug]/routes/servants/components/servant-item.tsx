import { ClockIcon, DollarSignIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Servant } from '@/types/servant'
import { currency } from '@/utils/currency'
import { EditServant } from './edit-servant'

type SaleItemProps = {
	servant: Servant
}

export const ServantItem: React.FC<SaleItemProps> = ({ servant }) => {
	return (
		<EditServant servant={servant}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-accent/20 px-2 py-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<div>
						<span className="mt-2 truncate">{servant.description}</span>
						<div className="flex items-center gap-2">
							<DollarSignIcon className="text-emerald-600" size={18} />
							<span>{currency(servant.value)}</span>
						</div>
					</div>
					<Badge className="flex items-center gap-2" variant="secondary">
						<ClockIcon className="text-emerald-600" size={18} />
						<span>{servant.duration} minutos</span>
					</Badge>
				</div>
			</div>
		</EditServant>
	)
}
