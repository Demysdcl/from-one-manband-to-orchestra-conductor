import { Employee } from '@/modules/Shared'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'

interface DeleteEmployeeProps {
  selectedEmployee: Employee
}

export const DeleteEmployee = ({ selectedEmployee }: DeleteEmployeeProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpenConfirmationModal(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
      >
        Delete
      </button>
      {openConfirmationModal &&
        createPortal(
          <DeleteConfirmationModal
            onClose={() => setOpenConfirmationModal(false)}
            selectedEmployee={selectedEmployee}
          />,
          document.body,
        )}
    </>
  )
}
