import { z } from 'zod'

export const signUpParamsSchema = z.object({
	email: z.email('E-mail inválido'),
	password: z.string('Defina uma senha').min(8, 'Senha muito curta'),
	name: z
		.string('Preencha seu nome')
		.min(3, 'O nome precisa ter pelo menos 3 caracteres'),
})

export type SignUpParams = z.infer<typeof signUpParamsSchema>
