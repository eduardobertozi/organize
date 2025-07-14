'use server'

import { auth } from '@/lib/auth'
import { type SignUpParams, signUpParamsSchema } from '@/schemas/sign-up-schema'

export async function signUp({ email, password, name }: SignUpParams) {
	const validParams = signUpParamsSchema.safeParse({ email, password, name })

	if (!validParams.success) {
		return {
			data: null,
			error: validParams.error.message,
		}
	}

	try {
		const response = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
			},
			asResponse: true,
		})

		if (response.status !== 200) {
			return {
				data: null,
				error: 'Não foi possivel criar sua conta',
			}
		}

		const data = await response.json()

		return {
			data,
			error: null,
		}
	} catch (err) {
		console.log(err, 'ERRO AO CRIAR CONTA')

		return {
			data: null,
			error: 'Um erro interno ocorreu ao criar sua conta',
		}
	}
}
