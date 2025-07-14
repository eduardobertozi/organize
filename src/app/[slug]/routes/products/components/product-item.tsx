import { DollarSignIcon } from 'lucide-react'
import type { Product } from '@/types/product'
import { EditProduct } from './edit-product'

type SaleItemProps = {
	product: Product
}

export const ProductItem: React.FC<SaleItemProps> = ({ product }) => {
	return (
		<EditProduct product={product}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer flex-col gap-2 border-b bg-accent/20 px-2 py-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<span className="mt-2 truncate">{product.description}</span>
					<div className="flex items-center gap-2">
						<DollarSignIcon className="text-emerald-600" size={18} />
						<span>R$: {product.coast.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</EditProduct>
	)
}
