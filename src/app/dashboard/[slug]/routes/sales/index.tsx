'use client'

import { SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchSales } from '@/http/hooks/sales/use-fetch-sales'
import { useGlobalStore } from '@/store/global'
import { AddSale } from './components/add-sale'
import { SaleItem } from './components/sale-item'

export const Sales: React.FC<unknown> = () => {
	const search = useGlobalStore((state) => state.search)
	const setSearch = useGlobalStore((state) => state.setSearch)
	const setTotalPages = useGlobalStore((state) => state.setTotalPages)

	const { data, error, isPending } = useFetchSales()

	if (error) {
		toast.error('Erro ao buscar vendas')
	}

	useEffect(() => {
		setTotalPages(data?.length ?? 0)
	}, [data, setTotalPages])

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value)
	}

	return (
		<div className="space-y-2">
			<InputIcon
				className="h-11"
				icon={SearchIcon}
				onChange={handleSearch}
				placeholder="Pesquisar"
				value={search}
			/>
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
						<Paginate />
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
