import { create } from 'zustand'

type GlobalStore = {
	search: string
	setSearch: (search: string) => void
	currentPage: number
	setPage: (page: number) => void
	totalPages: number
	setTotalPages: (totalPages: number) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
	currentPage: 1,
	setPage: (page: number) => set({ currentPage: page }),
	totalPages: 1,
	setTotalPages: (totalPages: number) => set({ totalPages }),
}))
