import { Employee } from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'

interface DeleteEmployeeActionProps {
  selectedEmployee: Employee
  onLoading: Dispatch<SetStateAction<boolean>>
  onDeleted: (employee: Employee) => void
}

export const DeleteEmployeeAction = ({
  selectedEmployee,
  onDeleted,
  onLoading,
}: DeleteEmployeeActionProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

  const handleConfirmation = () => {
    setOpenConfirmationModal(!openConfirmationModal)
  }

  return (
    <>
      <button
        onClick={handleConfirmation}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
      >
        Delete
      </button>

      {createPortal(
        <DeleteConfirmationModal
          openConfirmationModal={openConfirmationModal}
          handleConfirmation={handleConfirmation}
          selectedEmployee={selectedEmployee}
          onLoading={onLoading}
          onDeleted={onDeleted}
        />,
        document.body,
      )}
    </>
  )
}
