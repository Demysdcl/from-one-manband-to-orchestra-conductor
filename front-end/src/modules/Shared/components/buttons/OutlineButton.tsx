import { BaseButton } from './BaseButton'
import { BaseButtonProps } from './types'

export const OutlineButton = ({
  children,
  onClick,
  color = 'indigo',
  className,
}: BaseButtonProps) => {
  const styling = `border border-${color}-500 text-${color}-500 hover:border-${color}-700 hover:text-${color}-700`

  return (
    <BaseButton onClick={onClick} className={`${styling} ${className}`}>
      {children}
    </BaseButton>
  )
}
