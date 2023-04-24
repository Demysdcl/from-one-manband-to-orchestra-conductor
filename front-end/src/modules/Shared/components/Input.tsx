import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputProps {
  value: string
  name: string
  type?: HTMLInputTypeAttribute
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, name, onChange, type }: InputProps) => (
  <input
    className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
    type={type}
    id={name}
    value={value}
    name={name}
    onChange={onChange}
  />
)
