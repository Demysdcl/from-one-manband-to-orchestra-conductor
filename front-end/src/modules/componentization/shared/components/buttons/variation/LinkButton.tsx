import { cd } from 'modules/shared'
import { BaseButton } from './BaseButton'
import { ButtonProps, getColorByType } from './types'

export const LinkButton = ({
  className,
  disabled,
  color = 'primary',
  ...rest
}: ButtonProps) => (
  <BaseButton
    className={cd('underline', `text-${getColorByType(color)}`, className, {
      'text-neutral-medium': disabled,
    })}
    disabled={disabled}
    {...rest}
  />
)
