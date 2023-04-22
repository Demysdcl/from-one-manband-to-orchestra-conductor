import { Employee } from '@/modules/Shared/service/employeeService'

let counter = 0

interface DeleteConfirmationModalProps {
  openConfirmationModal: boolean
  handleConfirmation: (employee?: Employee) => void
  name: string
  handleDeletion: () => Promise<void>
}

export const DeleteConfirmationModal = ({
  openConfirmationModal,
  handleConfirmation,
  name,
  handleDeletion,
}: DeleteConfirmationModalProps) => {
  console.log('DeleteConfirmationModal counter', ++counter)

  if (!openConfirmationModal) return null

  return (
    <section
      className={`z-10 top-0 fixed w-full h-full bg-black bg-opacity-50`}
    >
      <div className="bg-white p-8 mt-72 mx-auto max-w-md rounded relative">
        <span
          onClick={() => handleConfirmation()}
          className="absolute right-5 top-5 cursor-pointer"
        >
          ❌
        </span>

        <h1 className="mb-8 text-2xl font-bold">Confirm deletion</h1>

        <span>
          Do you really want to delete <strong>{name}</strong>?
        </span>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => handleConfirmation()}
            className="flex-1 border border-red-500 hover:border-red-700 hover:text-red-700 text-red-500 font-bold py-2 mt-8 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handleDeletion}
            className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-8 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  )
}
