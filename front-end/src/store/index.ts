import { create } from 'zustand'

interface Store {
  state: {}
  actions: {}
}

export const useStore = create<Store>((set) => ({
  state: {},
  actions: {},
}))
