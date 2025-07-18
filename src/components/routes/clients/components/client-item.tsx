import type { Client } from '@/types/client'
import { EditClient } from './edit-client'

type ClientItemProps = {
	client: Client
}

export const ClientItem: React.FC<ClientItemProps> = ({ client }) => {
	return (
		<EditClient client={client}>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-accent/20 px-2 py-4 text-sm transition duration-300 ease-in-out hover:bg-accent/50">
					<div>
						<span className="mt-2 truncate">{client.name}</span>
					</div>
				</div>
			</div>
		</EditClient>
	)
}
