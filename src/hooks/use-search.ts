import { useGlobalStore } from '@/store/global'

export const useSearch = () => {
	const search = useGlobalStore((state) => state.search)
	const setSearch = useGlobalStore((state) => state.setSearch)

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value)
	}

	return { search, handleSearch }
}
