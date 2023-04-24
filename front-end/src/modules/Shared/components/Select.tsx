import { ChangeEvent, ReactNode } from 'react'

interface SelectProps {
  children: ReactNode[]
  value: string | number | string[]
  name?: string
  multiple?: boolean
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
  children,
  value,
  name,
  onChange,
  multiple,
}: SelectProps) => (
  <select
    multiple={multiple}
    id={name}
    value={value}
    name={name}
    onChange={onChange}
    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-indigo-500"
  >
    {children}
  </select>
)
