'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signUp } from '@/actions/auth/sign-up-email-and-password'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/input-password'
import {
	type SignUpParams,
	signUpParamsSchema,
} from '@/schemas/sign-up-params.schema'

export const SignUpForm = () => {
	const [loading, startTransition] = useTransition()

	const form = useForm<SignUpParams>({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
		resolver: zodResolver(signUpParamsSchema),
	})

	function handleSubmit(data: SignUpParams) {
		startTransition(async () => {
			const { error } = await signUp(data)

			if (error) {
				toast.error('Não foi possível criar sua conta')
				return
			}

			toast.success('Conta criada com sucesso!')
		})
	}

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome Completo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Seu e-mail</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sua Senha</FormLabel>
							<FormControl>
								<InputPassword className="w-full" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full bg-indigo-900 text-foreground" type="submit">
					{loading ? <LoaderCircleIcon size={24} /> : 'Entrar'}
				</Button>
			</form>
		</Form>
	)
}
