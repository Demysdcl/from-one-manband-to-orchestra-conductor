import { getCities } from '@/modules/Shared'
import { create } from 'zustand'

interface CityStore {
  cities: string[]
  fetchCities: () => Promise<void>
  addCity: (employee: string) => void
}

export const useCitiesStore = create<CityStore>((set) => ({
  cities: [],
  fetchCities: async () => {
    const cities = await getCities()
    set({ cities })
  },
  addCity: (city) => {
    set((state) => {
      if (state.cities.includes(city)) return state
      return { cities: [...state.cities, city] }
    })
  },
}))
