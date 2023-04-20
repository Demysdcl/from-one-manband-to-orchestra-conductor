import { memo, useState } from 'react'
import { useStore } from '../store'
import Modal from './Modal'

function ExampleModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const count = useStore(({ state }) => state.count)

  console.log('ExampleModal rendered')

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div
          onClick={() => setModalOpen(false)}
          className="flex justify-end w-full px-4 pt-4 cursor-pointer"
        >
          ❌
        </div>
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Modal Title</h1>
          <p className="text-gray-700">
            This is the content of the modal. You can put any HTML or React
            components here. {count}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default memo(ExampleModal)
