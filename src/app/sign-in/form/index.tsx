'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signIn } from '@/actions/auth/sign-in-email-and-password'
import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	type SignInParams,
	signInParamsSchema,
} from '@/schemas/sign-in-params.schema'

export const SignInForm = () => {
	const { replace } = useRouter()
	const [loading, startTransition] = useTransition()

	const form = useForm<SignInParams>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(signInParamsSchema),
	})

	const formWithError =
		form.formState.errors.username || form.formState.errors.password

	function handleSubmit(data: SignInParams) {
		startTransition(async () => {
			const { error } = await signIn(data)

			if (error) {
				toast.error(error)
				return
			}

			replace('/dashboard')
		})
	}

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				data-testid="sign-in-form"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Usuário</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<InputPassword className="w-full" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button className="w-full bg-indigo-900 text-foreground" type="submit">
					{loading ? (
						<LoaderCircleIcon className="animate-spin" size={24} />
					) : (
						'Entrar'
					)}
				</Button>
				<p className="text-destructive text-sm">
					{formWithError && 'Usuário ou senha inválidos'}
				</p>
			</form>
		</Form>
	)
}
