import { XMarkIcon } from '@heroicons/react/16/solid'
import { effect } from '@preact/signals-react'
import { useToasts } from './hooks'
import { ToastItem, getToastColor } from './types'

export const Toast = ({ title, description, color, uuid }: ToastItem) => {
  const hideToast = useToasts((state) => state.hideToast)

  const handleClose = () => {
    hideToast(uuid)
  }

  effect(() => {
    setTimeout(handleClose, 5000)
  })

  return (
    <div
      className={`relative text-neutral-lighter flex flex-col gap-2 justify-center py-4 px-10 rounded-md bg-${getToastColor(
        color
      )}`}
    >
      <XMarkIcon
        width={24}
        className="absolute top-3 right-3 cursor-pointer"
        onClick={handleClose}
      />

      <h1 className="text-xl">{title}</h1>

      <p>{description}</p>
    </div>
  )
}
