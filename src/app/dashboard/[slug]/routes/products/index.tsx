'use client'

import { InputSearch } from '@/components/input-search'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchProducts } from '@/http/hooks/products/use-fetch-products'
import { AddProduct } from './components/add-product'
import { ProductItem } from './components/product-item'

export const PageSkeleton = () => {
	return (
		<div>
			{Array.from({ length: 3 }, (_, index) => (
				<div
					className="h-14 w-full animate-pulse border-b bg-accent/20"
					key={`${index}-${Date.now()}`}
				/>
			))}
		</div>
	)
}

export const Products = () => {
	const { data, isPending } = useFetchProducts()

	return (
		<div className="space-y-2">
			<InputSearch />
			<AddProduct />

			<div className="pt-4">
				{isPending ? (
					<PageSkeleton />
				) : (
					<div className="space-y-8 text-sm">
						<Paginate />
						<div className="grid grid-cols-1 gap-2">
							<ScrollArea className="max-h-[300px]">
								{data?.products.map((product) => (
									<ProductItem key={product.id} product={product} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.products.length} produtos</p>
					</div>
				)}
			</div>
		</div>
	)
}
