'use client'

import { SearchIcon } from 'lucide-react'
import { toast } from 'sonner'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchProducts } from '@/http/hooks/products/use-fetch-products'
import { AddProduct } from './components/add-product'
import { ProductItem } from './components/product-item'

export const Products = () => {
	const { data, error, isPending } = useFetchProducts()

	if (error) {
		toast.error('Erro ao buscar produtos')
	}

	return (
		<div className="space-y-2">
			<InputIcon className="h-11" icon={SearchIcon} placeholder="Pesquisar" />
			<AddProduct />

			<div className="pt-4">
				{isPending ? (
					<div>
						{Array.from({ length: 3 }, (_, index) => (
							<div
								className="h-14 w-full animate-pulse border-b bg-accent/20"
								key={`${index}-${Date.now()}`}
							/>
						))}
					</div>
				) : (
					<div className="space-y-8 text-sm">
						<div className="grid grid-cols-1 gap-2">
							<ScrollArea className="max-h-[300px]">
								{data?.map((product) => (
									<ProductItem key={product.id} product={product} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.length} produtos</p>
					</div>
				)}
			</div>
		</div>
	)
}
