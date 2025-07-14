import { z } from 'zod'

export const formAddClientSchema = z.object({
	name: z.string().min(1, 'Defina o nome do cliente'),
	whatsapp: z.string().min(1, 'Defina o whatsapp do cliente'),
})

export type FormAddClientData = z.infer<typeof formAddClientSchema>
