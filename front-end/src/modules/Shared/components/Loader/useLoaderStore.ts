import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'

interface LoaderStoreState {
  calls: string[]
  showLoader: () => void
  hideLoader: () => void
}

export const useLoaderStore = create<LoaderStoreState>((set) => ({
  calls: [],
  showLoader: () => {
    const uuid = uuidv4()
    set((state) => ({ calls: [...state.calls, uuid] }))
  },
  hideLoader: () =>
    set((state) => ({
      calls: state.calls.slice(0, state.calls.length - 1),
    })),
}))
