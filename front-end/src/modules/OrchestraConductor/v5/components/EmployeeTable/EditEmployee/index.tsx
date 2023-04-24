import { Employee } from '@/modules/Shared'
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
      <button
        onClick={() => setOpenFormModal(true)}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
      >
        Edit
      </button>
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
