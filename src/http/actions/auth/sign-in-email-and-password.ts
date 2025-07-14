'use server'

import {
	type SignInParams,
	signInParamsSchema,
} from '@/app/(auth)/sign-in/form/schema'
import { auth } from '@/lib/auth'

export async function signIn({ username, password }: SignInParams) {
	const validParams = signInParamsSchema.safeParse({ username, password })

	if (!validParams.success) {
		return {
			data: null,
			error: validParams.error.message,
		}
	}

	try {
		const response = await auth.api.signInEmail({
			body: {
				email: username,
				password,
				rememberMe: false,
			},
			asResponse: true,
		})

		if (response.status !== 200) {
			switch (response.status) {
				case 404:
					return {
						data: null,
						error: 'Usuário não encontrado',
					}
				case 401:
					return {
						data: null,
						error: 'Usuário não autorizado',
					}
				default:
					return {
						data: null,
						error: 'Erro ao fazer login',
					}
			}
		}

		const data = await response.json()

		return {
			data,
			error: null,
		}
	} catch (err) {
		console.log(err, 'ERRO AO LOGAR')

		return {
			data: null,
			error: 'Erro ao fazer login',
		}
	}
}
