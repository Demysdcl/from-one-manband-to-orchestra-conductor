import { Employee, addEmployee } from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction } from 'react'
import { INITIAL_EMPLOYEE } from '../../Shared/constants'
import { EmployForm } from '../Shared/EmployeeForm'

let counter = 0

interface EmployFormProps {
  openFormModal: boolean
  handleOpenForm: () => void
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const AddEmployeeForm = ({
  onLoading,
  onUpdate,
  openFormModal,
  handleOpenForm,
}: EmployFormProps) => {
  if (!openFormModal) return <></>
  console.log('AddEmployForm counter', ++counter)

  const handleSubmit = async (employee: Employee) => {
    console.log(employee)
    try {
      onLoading(true)
      const newEmployee = await addEmployee({
        ...employee,
      })
      onUpdate(newEmployee)
    } catch (error) {
      console.error(error)
    } finally {
      onLoading(false)
    }
  }

  return (
    <EmployForm
      title="Add Employee"
      initialEmployeeValues={INITIAL_EMPLOYEE}
      handleOpenForm={handleOpenForm}
      onLoading={onLoading}
      openFormModal={openFormModal}
      onSubmit={handleSubmit}
      clearForm
    />
  )
}
