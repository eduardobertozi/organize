'use client'

import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchServants } from '@/http/hooks/servants/use-fetch-servants'
import { AddServant } from './components/add-servant'
import { ServantItem } from './components/servant-item'

export const Servants: React.FC<unknown> = () => {
	const { data, error, isPending } = useFetchServants()

	if (error) {
		toast.error('Erro ao buscar serviços')
	}

	return (
		<div className="space-y-2">
			<AddServant />

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
								{data?.map((servant) => (
									<ServantItem key={servant.id} servant={servant} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.length} serviços</p>
					</div>
				)}
			</div>
		</div>
	)
}
