'use client'

import { SearchIcon } from 'lucide-react'
import { toast } from 'sonner'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchSales } from '@/hooks/useFetchSales'
import { AddSale } from './add-sale'
import { SaleItem } from './sale-item'

export const Sales: React.FC<unknown> = () => {
	const { data, error, isPending } = useFetchSales()

	if (error) {
		toast.error('Erro ao buscar vendas')
	}

	return (
		<div className="space-y-2">
			<InputIcon className="h-11" icon={SearchIcon} placeholder="Pesquisar" />
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
					<div className="space-y-8 text-sm">
						<Paginate currentPage={1} totalPages={1} />
						<div className="grid grid-cols-1 gap-2">
							<ScrollArea className="max-h-[300px]">
								{data?.map((sale) => (
									<SaleItem key={sale.id} sale={sale} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.length} vendas</p>
					</div>
				)}
			</div>
		</div>
	)
}
