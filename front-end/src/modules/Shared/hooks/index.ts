import { useReducer } from 'react'

const genericReducer = <T>(state: T, partial: Partial<T>): T => ({
  ...state,
  ...partial,
})

export const useGenericReducer = <T>(initialState: T) =>
  useReducer(genericReducer<T>, initialState)
