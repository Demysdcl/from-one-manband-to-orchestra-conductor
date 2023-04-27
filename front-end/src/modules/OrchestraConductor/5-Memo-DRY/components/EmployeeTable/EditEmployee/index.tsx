import { Employee } from '@/modules/Shared'
import { FilledButton } from '@/modules/Shared/components'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { EditEmployeeForm } from './EditEmployeeForm'

interface EditEmployeeProps {
  selectedEmployee: Employee
}

export const EditEmployee = ({ selectedEmployee }: EditEmployeeProps) => {
  const [openFormModal, setOpenFormModal] = useState(false)

  return (
    <>
      <FilledButton onClick={() => setOpenFormModal(true)}>Edit</FilledButton>

      {openFormModal &&
        createPortal(
          <EditEmployeeForm
            onClose={() => setOpenFormModal(false)}
            selectedEmployee={selectedEmployee}
          />,
          document.body,
        )}
    </>
  )
}
