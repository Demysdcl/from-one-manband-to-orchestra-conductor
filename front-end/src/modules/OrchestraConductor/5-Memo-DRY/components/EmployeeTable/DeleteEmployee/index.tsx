import { Employee } from '@/modules/Shared'
import { FilledButton } from '@/modules/Shared/components'
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
      <FilledButton onClick={() => setOpenConfirmationModal(true)} color="red">
        Delete
      </FilledButton>
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
