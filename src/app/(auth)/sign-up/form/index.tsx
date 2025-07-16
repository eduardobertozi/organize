'use client'

import { LoaderCircleIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import InputPassword from '@/components/ui/extensions/input-password'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/http/actions/auth/sign-up-email-and-password'
import { resolver } from '@/lib/zod'
import { type SignUpParams, signUpParamsSchema } from '@/schemas/sign-up-schema'

export const SignUpForm = () => {
	const [loading, startTransition] = useTransition()

	const form = useForm<SignUpParams>({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
		resolver: resolver(signUpParamsSchema),
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
								<Input
									className="focus:bg-background active:bg-background"
									{...field}
								/>
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
				<Button
					className="w-full bg-indigo-900 text-foreground hover:bg-indigo-800"
					type="submit"
				>
					{loading ? (
						<LoaderCircleIcon className="animate-spin" size={24} />
					) : (
						'Entrar'
					)}
				</Button>
			</form>
		</Form>
	)
}
