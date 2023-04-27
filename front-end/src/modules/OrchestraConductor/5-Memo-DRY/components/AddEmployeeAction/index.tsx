import { FilledButton } from '@/modules/Shared'
import { memo, useState } from 'react'
import { AddEmployeeForm } from './AddEmployeeForm'

let counter = 0

const AddEmployeeAction = () => {
  console.log('AddEmployeeAction counter', ++counter)

  const [openFormModal, setOpenFormModal] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-1 w-full">
        <h2 className="text-xl font-bold">Employees List</h2>
        <FilledButton onClick={() => setOpenFormModal(!openFormModal)}>
          Add new employee
        </FilledButton>
      </div>

      {openFormModal && (
        <AddEmployeeForm
          handleOpenForm={() => setOpenFormModal(!openFormModal)}
        />
      )}
    </>
  )
}

export default memo(AddEmployeeAction)
