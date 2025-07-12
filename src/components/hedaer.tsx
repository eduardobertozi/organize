import { MenuIcon, User2Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Logo } from './logo'

type HeaderProps = {
	isLogged?: boolean
}

export const Header: React.FC<HeaderProps> = ({ isLogged = false }) => {
	return (
		<header className="fixed top-0 z-10 flex w-full items-center justify-between bg-background/80 px-6 py-2 backdrop-blur-md">
			{isLogged && (
				<Avatar>
					{/* <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" /> */}
					<AvatarFallback>
						<User2Icon size={20} />
					</AvatarFallback>
				</Avatar>
			)}
			{isLogged && (
				<div className="flex items-center gap-1 text-sm">
					<MenuIcon size={24} /> Menu
				</div>
			)}
			<Logo className="size-10 shadow-md" />
		</header>
	)
}
