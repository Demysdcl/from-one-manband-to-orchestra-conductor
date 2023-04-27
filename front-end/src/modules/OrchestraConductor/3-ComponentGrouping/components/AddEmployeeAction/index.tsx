import { Employee } from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction, useState } from 'react'
import { AddEmployeeForm } from './AddEmployeeForm'

let counter = 0

interface AddEmployeeActionProps {
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const AddEmployeeAction = ({
  onLoading,
  onUpdate,
}: AddEmployeeActionProps) => {
  console.log('AddEmployeeAction counter', ++counter)

  const [openFormModal, setOpenFormModal] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-1 w-full">
        <h2 className="text-xl font-bold">Employees List</h2>
        <button
          onClick={() => setOpenFormModal(!openFormModal)}
          className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
        >
          Add new employee
        </button>
      </div>

      <AddEmployeeForm
        openFormModal={openFormModal}
        handleOpenForm={() => setOpenFormModal(!openFormModal)}
        onLoading={onLoading}
        onUpdate={onUpdate}
      />
    </>
  )
}
