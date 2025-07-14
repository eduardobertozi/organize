'use client'

import { useQuery } from '@tanstack/react-query'
import { SearchIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputIcon } from '@/components/ui/input-icon'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { AddSale } from './add-sale'

const sales = [
	{
		id: '1',
		name: 'John Doe - Corte e Barba',
		date: '15/07/2025',
		status: 'completed',
	},
	{
		id: '2',
		name: 'John Doe - Corte',
		date: '15/07/2025',
		status: 'awaiting',
	},
	{
		id: '3',
		name: 'John Doe - Corte e Barba',
		date: '15/07/2025',
		status: 'canceled',
	},
	{
		id: '4',
		name: 'John Doe - Corte e Barba',
		date: '15/07/2025',
		status: 'completed',
	},
	{
		id: '5',
		name: 'John Doe - Corte e Barba',
		date: '15/07/2025',
		status: 'awaiting',
	},
	{
		id: '6',
		name: 'John Doe - Corte e Barba',
		date: '15/07/2025',
		status: 'completed',
	},
]

function fetchSales() {
	return new Promise<any[]>((resolve) => {
		setTimeout(() => {
			resolve(sales)
		}, 1500)
	})
}

function setBadgeBackground(status: string) {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500'
		case 'awaiting':
			return 'bg-yellow-600'
		case 'canceled':
			return 'bg-red-500'
		default:
			return 'bg-zinc-500'
	}
}

export const Sales: React.FC<unknown> = () => {
	const { data, error, isPending } = useQuery<any[]>({
		queryKey: ['sales'],
		queryFn: () => fetchSales(),
	})

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
									<div
										className="flex w-full items-center justify-between"
										key={sale.id}
									>
										<div className="flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-accent/20 px-2 py-4 text-xs transition duration-300 ease-in-out hover:bg-accent/50">
											<span className="truncate">{sale.name}</span>

											<div className="flex items-center gap-2">
												<span>{sale.date}</span>
												<Badge
													className={cn(
														setBadgeBackground(sale.status),
														'aspect-square size-3 rounded-full px-1'
													)}
												>
													<div />
												</Badge>
											</div>
										</div>
									</div>
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
