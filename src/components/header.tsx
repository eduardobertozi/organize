import { HomeIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Logo } from './logo'

type HeaderProps = {
	isLogged?: boolean
}

export const Header: React.FC<HeaderProps> = ({ isLogged = false }) => {
	return (
		<header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background/80 px-6 py-2 backdrop-blur-md">
			{isLogged && (
				<Avatar>
					{/* <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" /> */}
					<AvatarFallback>
						<User2Icon size={20} />
					</AvatarFallback>
				</Avatar>
			)}
			{isLogged && (
				<Link
					className="flex cursor-pointer items-center gap-1 text-sm"
					href="/dashboard"
				>
					<HomeIcon size={24} /> Home
				</Link>
			)}
			<Logo className="size-10 shadow-md" />
		</header>
	)
}
