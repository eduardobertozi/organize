import { SearchIcon } from 'lucide-react'
import { useSearch } from '@/hooks/use-search'
import { InputIcon } from './ui/extensions/input-icon'

export const InputSearch = () => {
	const { search, handleSearch } = useSearch()

	return (
		<InputIcon
			className="h-11"
			icon={SearchIcon}
			onChange={handleSearch}
			placeholder="Pesquisar"
			value={search}
		/>
	)
}
