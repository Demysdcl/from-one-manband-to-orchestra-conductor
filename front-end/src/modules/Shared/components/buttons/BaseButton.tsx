import { BaseButtonProps } from './types'

export const BaseButton = ({
  children,
  onClick,
  className,
}: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  )
}
