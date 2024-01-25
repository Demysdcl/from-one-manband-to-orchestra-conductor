import { uuidGenerator } from '@/modules/Shared'
import { create } from 'zustand'
import { ToastItem } from '../types'

type ToastState = {
  toasts: ToastItem[]
  hideToast: (uuid: string) => void
  showToast: (toast: Partial<Omit<ToastItem, 'uuid'>>) => void
}

export const useToasts = create<ToastState>((set) => ({
  toasts: [],
  hideToast: (uuid: string) =>
    set(({ toasts }) => ({
      toasts: toasts.filter((item) => item.uuid !== uuid),
    })),
  showToast: ({
    color = 'success',
    description = '',
    title = '',
  }: Partial<Omit<ToastItem, 'uuid'>>) =>
    set(({ toasts }) => ({
      toasts: [...toasts, { color, uuid: uuidGenerator(), description, title }],
    })),
}))
