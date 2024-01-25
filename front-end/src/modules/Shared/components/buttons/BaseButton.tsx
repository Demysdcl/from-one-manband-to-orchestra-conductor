import { cd } from '../../utils'
import { BaseButtonProps } from './types'

export const BaseButton = ({
  children,
  onClick,
  className,
  type,
}: BaseButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cd('font-bold py-2 px-4 rounded', className)}
    >
      {children}
    </button>
  )
}
