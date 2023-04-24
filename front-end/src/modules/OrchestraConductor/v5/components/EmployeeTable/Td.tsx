import { ReactNode } from 'react'

interface ThProps {
  children: ReactNode
}

export const Td = ({ children }: ThProps) => {
  return <td className="border px-4 py-2">{children}</td>
}
