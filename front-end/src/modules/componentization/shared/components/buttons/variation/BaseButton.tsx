import { cn } from '@/lib/utils'
import { ButtonType } from './types'

export const BaseButton = ({ children, className, ...rest }: ButtonType) => (
  <button
    {...rest}
    className={cn(
      'font-bold leading-none px-12 py-4 rounded active:scale-95',
      className,
    )}
  >
    {children}
  </button>
)
