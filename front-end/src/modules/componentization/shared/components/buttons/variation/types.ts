import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'positive'
  | 'alert'
  | 'error'

export type ButtonType = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>

export type ButtonProps = ButtonType & {
  color?: ButtonColor
}

const colorsByType = {
  primary: 'primary-main',
  secondary: 'secondary-main',
  tertiary: 'tertiary-main',
  disabled: 'neutral-medium',
  positive: 'feedback-positive-main',
  alert: 'feedback-alert-main',
  error: 'feedback-error-main',
}

export const getColorByType = (type: ButtonColor) => colorsByType[type]
