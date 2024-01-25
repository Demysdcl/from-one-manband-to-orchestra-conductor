import { cd } from '@/modules/Shared'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'positive'
  | 'alert'
  | 'error'

export type ButtonVariant = 'filled' | 'outline' | 'text' | 'link'

const mappedColors = {
  primary: 'primary-main',
  secondary: 'secondary-main',
  tertiary: 'tertiary-main',
  disabled: 'neutral-medium',
  positive: 'feedback-positive-main',
  alert: 'feedback-alert-main',
  error: 'feedback-error-main',
}

const getColorByType = (type: ButtonColor) => mappedColors[type]

const getStyleByVariant = (variant: ButtonVariant, color: ButtonColor) => {
  const mappedStyle = {
    filled: `bg-${getColorByType(color)} text-white`,
    outline: `border border-${getColorByType(color)} text-${getColorByType(
      color,
    )}`,
    text: `text-${getColorByType(color)}`,
    link: `text-${getColorByType(color)} underline`,
  }
  return mappedStyle[variant]
}

const getDisabledStyle = (variant: ButtonVariant) => {
  const mappedStyle = {
    filled: 'bg-neutral-medium text-white',
    outline: 'border border-neutral-medium text-neutral-medium',
    text: 'text-neutral-medium',
    link: 'text-neutral-medium outline',
  }
  return mappedStyle[variant]
}

type ComplexButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  variant?: ButtonVariant
  color?: ButtonColor
}

export const ComplexButton = ({
  className,
  children,
  disabled,
  variant = 'filled',
  color = 'primary',
  ...rest
}: ComplexButtonProps) => {
  return (
    <button
      {...rest}
      className={cd(
        'font-bold leading-none px-12 py-4 rounded active:scale-95',
        getStyleByVariant(variant, color),
        className,
        { [getDisabledStyle(variant)]: disabled },
      )}
    >
      {children}
    </button>
  )
}
