import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface BaseButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  color?: 'indigo' | 'red'
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}
