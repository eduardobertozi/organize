'use client'

import { SaleStatus } from '@/app/dashboard/_components/sale-status'
import { InputSearch } from '@/components/input-search'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchSales } from '@/http/hooks/sales/use-fetch-sales'
import { AddSale } from './components/add-sale'
import { SaleItem } from './components/sale-item'

export const Sales: React.FC<unknown> = () => {
	const { data, isPending } = useFetchSales()

	return (
		<div className="space-y-2">
			<InputSearch />
			<AddSale />

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
					<div className="space-y-4 text-sm">
						<SaleStatus />
						<Paginate />
						<div className="grid grid-cols-1 gap-2">
							<ScrollArea className="max-h-[300px]">
								{data?.sales.map((sale) => (
									<SaleItem key={sale.id} sale={sale} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.sales.length} vendas</p>
					</div>
				)}
			</div>
		</div>
	)
}
