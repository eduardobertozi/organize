import { create } from 'zustand'

type GlobalStore = {
	search: string
	setSearch: (search: string) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
}))
