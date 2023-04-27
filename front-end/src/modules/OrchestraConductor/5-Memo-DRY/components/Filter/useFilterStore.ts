import { create } from 'zustand'

interface Filter {
  query: string
  job: string
  city: string
}

interface FilterStore {
  filter: Filter
  setFilter: (filter: Partial<Filter>) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: {
    query: '',
    job: '',
    city: '',
  },
  setFilter: (partialFilter) => {
    set((state) => ({ filter: { ...state.filter, ...partialFilter } }))
  },
}))
