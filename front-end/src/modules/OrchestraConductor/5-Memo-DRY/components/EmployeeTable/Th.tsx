import { ReactNode } from 'react'

interface ThProps {
  children: ReactNode
}

export const Th = ({ children }: ThProps) => (
  <th className="border px-4 py-2">{children}</th>
)
