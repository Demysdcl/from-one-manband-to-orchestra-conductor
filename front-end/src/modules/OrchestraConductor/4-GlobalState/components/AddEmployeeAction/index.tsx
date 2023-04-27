import { useState } from 'react'
import { AddEmployeeForm } from './AddEmployeeForm'

let counter = 0

export const AddEmployeeAction = () => {
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

      {openFormModal && (
        <AddEmployeeForm
          handleOpenForm={() => setOpenFormModal(!openFormModal)}
        />
      )}
    </>
  )
}
