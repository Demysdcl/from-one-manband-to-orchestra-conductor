import { cd } from 'modules/shared'
import { BaseButton } from './BaseButton'
import { ButtonProps, getColorByType } from './types'

export const OutlineButton = ({
  className,
  disabled,
  color = 'primary',
  ...rest
}: ButtonProps) => {
  const buttonColor = getColorByType(color)

  return (
    <BaseButton
      className={cd(
        'border',
        `border-${buttonColor} text-${buttonColor}`,
        className,
        { 'border-neutral-medium text-neutral-medium': disabled },
      )}
      disabled={disabled}
      {...rest}
    />
  )
}
