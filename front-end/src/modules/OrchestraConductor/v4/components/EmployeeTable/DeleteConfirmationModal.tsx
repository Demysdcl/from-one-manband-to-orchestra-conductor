import { useLoaderStore } from '@/modules/Shared'
import {
  Employee,
  deleteEmployee,
} from '@/modules/Shared/service/employeeService'
import { useEmployeesStore } from '../../hooks/useEmployeesStore'

let counter = 0

interface DeleteConfirmationModalProps {
  openConfirmationModal: boolean
  onClose: (employee?: Employee) => void
  selectedEmployee: Employee
}

export const DeleteConfirmationModal = ({
  openConfirmationModal,
  onClose,
  selectedEmployee,
}: DeleteConfirmationModalProps) => {
  const { showLoader, hideLoader } = useLoaderStore()
  const { removeEmployee } = useEmployeesStore()

  if (!openConfirmationModal) return null

  console.log('DeleteConfirmationModal counter', ++counter)

  const handleDeletion = async () => {
    showLoader()
    await deleteEmployee(selectedEmployee?.id!)
    onClose()
    removeEmployee(selectedEmployee.id!)
    hideLoader()
  }

  return (
    <section
      className={`z-10 top-0 fixed w-full h-full bg-black bg-opacity-50`}
    >
      <div className="bg-white p-8 mt-72 mx-auto max-w-md rounded relative">
        <span
          onClick={() => onClose()}
          className="absolute right-5 top-5 cursor-pointer"
        >
          ❌
        </span>

        <h1 className="mb-8 text-2xl font-bold">Confirm deletion</h1>

        <span>
          Do you really want to delete <strong>{selectedEmployee?.name}</strong>
          ?
        </span>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => onClose()}
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
