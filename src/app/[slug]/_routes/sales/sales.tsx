'use client'

import { SearchIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchSales } from '@/hooks/useFetchSales'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'
import { uuid } from '@/lib/uuid'
import { AddSale } from './add-sale'
import { EditSale } from './edit-sale'

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
									<EditSale
										key={sale.id}
										sale={{
											id: sale.id,
											amount: sale.amount,
											date: sale.date,
											status: sale.status,
											cliendId: uuid(),
											servantId: [uuid()],
										}}
									>
										<div className="flex w-full items-center justify-between">
											<div className="flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-accent/20 px-2 py-4 text-xs transition duration-300 ease-in-out hover:bg-accent/50">
												<span className="truncate">{sale.name}</span>

												<div className="flex items-center gap-2">
													<span>{dayjs(sale.date).format('DD/MM/YYYY')}</span>
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
									</EditSale>
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
