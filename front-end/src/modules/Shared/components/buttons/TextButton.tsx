import { BaseButton } from './BaseButton'
import { BaseButtonProps } from './types'

export const TextButton = ({
  children,
  onClick,
  color = 'indigo',
  className,
}: BaseButtonProps) => {
  const styling = `text-${color}-500 hover:text-${color}-700`

  return (
    <BaseButton onClick={onClick} className={`${styling} ${className}`}>
      {children}
    </BaseButton>
  )
}
