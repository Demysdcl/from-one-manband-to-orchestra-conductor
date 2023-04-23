import { Employee } from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'
import { EditEmployeeForm } from './EditEmployeeForm'

interface EditEmployeeActionProps {
  selectedEmployee: Employee
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const EditEmployeeAction = ({
  selectedEmployee,
  onLoading,
  onUpdate,
}: EditEmployeeActionProps) => {
  const [openFormModal, setOpenFormModal] = useState(false)

  const handleOpenForm = () => {
    setOpenFormModal(!openFormModal)
  }

  return (
    <>
      <button
        onClick={handleOpenForm}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
      >
        Edit
      </button>

      {createPortal(
        <EditEmployeeForm
          handleOpenForm={handleOpenForm}
          onLoading={onLoading}
          onUpdate={onUpdate}
          openFormModal={openFormModal}
          selectedEmployee={selectedEmployee}
        />,
        document.body,
      )}
    </>
  )
}
