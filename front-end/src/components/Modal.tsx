import { memo } from 'react'
import { useStore } from '../store'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element | JSX.Element[]
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  console.log('Modal rendered')

  const count = useStore(({ state }) => state.count)

  if (!isOpen) return <></>

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full">
          {children}
        </div>
      </div>
    </>
  )
}

export default memo(Modal)
