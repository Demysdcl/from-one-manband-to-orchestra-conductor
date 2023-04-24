import { ReactNode } from 'react'

let counter = 0

interface ThProps {
  children: ReactNode
}

export const Th = ({ children }: ThProps) => {
  console.log('Th counter', ++counter)

  return <th className="border px-4 py-2">{children}</th>
}
