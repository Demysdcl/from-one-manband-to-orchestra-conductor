export const genericReducer = <T>(state: T, partial: Partial<T>): T => ({
  ...state,
  ...partial,
})
