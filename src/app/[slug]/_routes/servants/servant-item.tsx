import { DollarSignIcon } from 'lucide-react'
import type { Servant } from '@/types/servant'
import { EditServant } from './edit-servant'

type SaleItemProps = {
	servant: Servant
}

export const ServantItem: React.FC<SaleItemProps> = ({ servant }) => {
	return (
		<EditServant servant={servant}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer flex-col gap-2 border-b bg-accent/20 px-2 py-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<span className="mt-2 truncate">{servant.description}</span>
					<div className="flex items-center gap-2">
						<DollarSignIcon className="text-emerald-600" size={18} />
						<span>R$: {servant.value.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</EditServant>
	)
}
