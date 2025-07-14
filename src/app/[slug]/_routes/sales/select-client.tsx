import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { InputIcon } from '@/components/ui/input-icon'
import type { Option } from '@/components/ui/multiselect'
import { useGlobalStore } from '@/store/global'

type SelectClientProps = {
	items: Option[]
	onSelect: (value: string) => void
}

export const SelectClient: React.FC<SelectClientProps> = ({
	items,
	onSelect,
}) => {
	const [selected, setSelected] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const { search, setSearch } = useGlobalStore((state) => state)

	function handleChangeGlobalSearch(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setSearch(event.target.value)
	}

	function handleSelect({ value, label }: Option) {
		onSelect(value)
		setSelected(label)
		setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen === true) {
			setSearch('')
			setSelected(null)
		}
	}, [isOpen, setSearch])

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<div className="relative">
					<Input
						className="text-start"
						readOnly
						value={selected ?? 'Selecionar'}
					/>
					<ChevronDownIcon
						className="-translate-y-1/2 absolute top-1/2 right-2"
						size={16}
					/>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Selecione</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<header className="w-full border-b py-4">
						<InputIcon
							icon={SearchIcon}
							onChange={handleChangeGlobalSearch}
							placeholder="Pesquisar..."
							value={search}
						/>
					</header>
					{items.map((item) => (
						<button
							className="flex w-full cursor-pointer items-start border-b p-2 text-sm hover:bg-accent/20"
							key={item.value}
							onClick={() => handleSelect(item)}
							type="button"
						>
							{item.label}
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
