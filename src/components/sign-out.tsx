'use client'

import { BoltIcon, ChevronDownIcon, LogOutIcon, User2Icon } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/http/actions/auth/sign-out'

export default function SignOutButton() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
			<DropdownMenuTrigger asChild>
				<button
					aria-expanded={isOpen}
					className="flex h-auto items-center gap-2 p-0"
					onClick={() => setIsOpen(!isOpen)}
					type="button"
				>
					<Avatar>
						{/* <AvatarImage alt="Profile image" src="./avatar.jpg" /> */}
						<AvatarFallback>
							<User2Icon size={20} />
						</AvatarFallback>
					</Avatar>
					<ChevronDownIcon
						aria-hidden="true"
						className={`opacity-60 ${isOpen ? 'rotate-180' : ''}`}
						size={16}
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="truncate font-medium text-foreground text-sm">
						Nome do usuário - Loja
					</span>
					<span className="truncate font-normal text-muted-foreground text-xs">
						email@email.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BoltIcon aria-hidden="true" className="opacity-60" size={16} />
						<span>Meu Perfil</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={signOut}>
					<LogOutIcon
						aria-hidden="true"
						className="text-destructive"
						size={16}
					/>
					<span className="text-destructive">Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
