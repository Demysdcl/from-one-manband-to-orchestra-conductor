export type ToastItem = {
  uuid: string
  title: string
  description: string
  color: ToastColor
}

export type ToastColor = 'success' | 'error' | 'info' | 'alert'

const toastColors = {
  success: 'feedback-positive-main',
  info: 'feedback-info-main',
  alert: 'feedback-alert-main',
  error: 'feedback-error-main',
}

export const getToastColor = (type: ToastColor) => toastColors[type]
