import { cd } from '../../utils'
import { BaseButton } from './BaseButton'
import { BaseButtonProps } from './types'

export const FilledButton = ({
  children,
  onClick,
  color = 'indigo',
  className,
}: BaseButtonProps) => {
  const styling = `bg-${color}-500 hover:bg-${color}-700`

  return (
    <BaseButton
      onClick={onClick}
      className={cd(`text-white`, styling, className)}
    >
      {children}
    </BaseButton>
  )
}
