import { cd } from '../../utils'
import { BaseButton } from './BaseButton'
import { ButtonProps, getColorByType } from './types'

export const FilledButton = ({
  className,
  disabled,
  color = 'primary',
  ...rest
}: ButtonProps) => (
  <BaseButton
    className={cd(
      'text-neutral-lighter',
      `bg-${getColorByType(color)}`,
      className,
      {
        'bg-neutral-medium': disabled,
      },
    )}
    disabled={disabled}
    {...rest}
  />
)
