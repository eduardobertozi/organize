import { z } from 'zod'

export const signInParamsSchema = z.object({
	username: z.email(),
	password: z.string().min(8),
})

export type SignInParams = z.infer<typeof signInParamsSchema>
