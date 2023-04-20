import { Employee, addEmployee } from '@/modules/Shared/service/employeeService'
import { parse } from 'date-fns'
import { FormEvent } from 'react'
import { EmployeeForm } from '../Shared/EmployeeForm'

let counter = 0

interface EmployeeFormProps {
  openFormModal: boolean
  handleOpenForm: () => void
  onUpdate: () => Promise<void>
}

export const AddEmployeeForm = ({
  openFormModal,
  handleOpenForm,
  onUpdate,
}: EmployeeFormProps) => {
  if (!openFormModal) return null

  console.log('AddEmployForm counter', ++counter)

  const handleSubmit = async (event: FormEvent, employee: Employee) => {
    event.preventDefault()
    try {
      await addEmployee({
        ...employee,
        birthday: parse(
          employee.birthday,
          'yyyy-MM-dd',
          new Date(),
        ).toISOString(),
      })
      await onUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <EmployeeForm
      title="Add Employee"
      handleOpenForm={handleOpenForm}
      onUpdate={onUpdate}
      openFormModal={openFormModal}
      handleSubmit={handleSubmit}
    />
  )
}
