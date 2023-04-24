import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputProps {
  value: string
  name: string
  type?: HTMLInputTypeAttribute
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, name, onChange, type }: InputProps) => (
  <input
    className="w-full appearance-none  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-indigo-500"
    type={type}
    id={name}
    value={value}
    name={name}
    onChange={onChange}
  />
)
