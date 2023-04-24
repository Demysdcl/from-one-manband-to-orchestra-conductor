import { FilledButton, OutlineButton, useLoaderStore } from '@/modules/Shared'
import {
  Employee,
  deleteEmployee,
} from '@/modules/Shared/service/employeeService'
import { useEmployeesStore } from '../../../Shared/hooks/useEmployeesStore'

let counter = 0

interface DeleteConfirmationModalProps {
  onClose: (employee?: Employee) => void
  selectedEmployee: Employee
}

export const DeleteConfirmationModal = ({
  onClose,
  selectedEmployee,
}: DeleteConfirmationModalProps) => {
  const { showLoader, hideLoader } = useLoaderStore()
  const { removeEmployee } = useEmployeesStore()

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

        <div className="flex gap-4 w-full mt-8">
          <OutlineButton
            color="red"
            onClick={() => onClose()}
            className="flex-1"
          >
            Close
          </OutlineButton>
          <FilledButton color="red" onClick={handleDeletion} className="flex-1">
            Delete
          </FilledButton>
        </div>
      </div>
    </section>
  )
}
