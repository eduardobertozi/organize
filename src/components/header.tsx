import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { getUser } from '@/http/actions/auth/get-user'
import { Logo } from './logo'
import { SignOutButton } from './sign-out'

export const Header = async () => {
	const session = await getUser()

	return (
		<header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background/80 px-6 py-2 backdrop-blur-md">
			{session ? <SignOutButton user={session.user} /> : <div />}
			{session ? (
				<Link
					className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-sm transition-colors hover:bg-accent"
					href="/dashboard"
				>
					<HomeIcon size={24} /> Home
				</Link>
			) : (
				<div />
			)}
			<Logo className="size-10 shadow-md" />
		</header>
	)
}
