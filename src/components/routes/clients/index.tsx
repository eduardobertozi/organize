'use client'

import { PageSkeleton } from '@/app/dashboard/_components/page-skeleton'
import { InputSearch } from '@/components/input-search'
import { Paginate } from '@/components/ui/paginate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchClients } from '@/http/hooks/clients/use-fetch-clients'
import { AddClient } from './components/add-client'
import { ClientItem } from './components/client-item'

export const Clients = () => {
	const { data, isPending } = useFetchClients()

	return (
		<div className="space-y-2">
			<InputSearch />
			<AddClient />

			<div className="pt-4">
				{isPending ? (
					<PageSkeleton />
				) : (
					<div className="space-y-8 text-sm">
						<Paginate />
						<div className="grid grid-cols-1 gap-2">
							<ScrollArea className="max-h-[300px]">
								{data?.clients.map((client) => (
									<ClientItem client={client} key={client.id} />
								))}
							</ScrollArea>
						</div>
						<p>Listando {data?.clients.length} clientes</p>
					</div>
				)}
			</div>
		</div>
	)
}
