import { ReactNode } from 'react'

let counter = 0

interface LabelProps {
  children: ReactNode
  htmlFor?: string
  className?: string
}

export const Label = ({ children, htmlFor, className }: LabelProps) => (
  <label
    className={`block mb-2 font-bold text-gray-700 ${className}`}
    htmlFor={htmlFor}
  >
    {children}
  </label>
)
