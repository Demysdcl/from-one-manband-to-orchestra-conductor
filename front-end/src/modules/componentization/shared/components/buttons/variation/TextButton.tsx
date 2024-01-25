import { cd } from 'modules/shared'
import { BaseButton } from './BaseButton'
import { ButtonProps, getColorByType } from './types'

export const TextButton = ({
  className,
  disabled,
  color = 'primary',
  ...rest
}: ButtonProps) => (
  <BaseButton
    className={cd(`text-${getColorByType(color)}`, className, {
      'text-neutral-medium': disabled,
    })}
    disabled={disabled}
    {...rest}
  />
)
