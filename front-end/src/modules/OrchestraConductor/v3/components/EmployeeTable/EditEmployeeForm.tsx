import {
  Employee,
  addEmployee,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { parse } from 'date-fns'
import { FormEvent } from 'react'
import { EmployeeForm } from '../Shared/EmployeeForm'

let counter = 0

const filterReducer = (
  state: Employee,
  partial: Partial<Employee>,
): Employee => ({
  ...state,
  ...partial,
})

interface EmployeeFormProps {
  openFormModal: boolean
  handleOpenForm: () => void
  selectedEmployee?: Employee
  onUpdate: () => Promise<void>
}

export const EditEmployeeForm = ({
  selectedEmployee,
  openFormModal,
  handleOpenForm,
  onUpdate,
}: EmployeeFormProps) => {
  if (!openFormModal) return null

  console.log('EditEmployForm counter', ++counter)

  const save = async (employee: Employee) => {
    await addEmployee({
      ...employee,
      birthday: parse(
        employee.birthday,
        'yyyy-MM-dd',
        new Date(),
      ).toISOString(),
    })
  }

  const edit = async (employee: Employee) => {
    await updateEmployee(selectedEmployee?.id!, {
      ...employee,
      birthday: parse(
        employee.birthday,
        'yyyy-MM-dd',
        new Date(),
      ).toISOString(),
    })
  }

  const handleSubmit = async (event: FormEvent, employee: Employee) => {
    event.preventDefault()
    try {
      if (selectedEmployee) {
        await edit(employee)
        handleOpenForm()
      } else await save(employee)
      await onUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <EmployeeForm
      title="Add Employee"
      initialEmployeeValues={selectedEmployee}
      handleOpenForm={handleOpenForm}
      onUpdate={onUpdate}
      openFormModal={openFormModal}
      handleSubmit={handleSubmit}
    />
  )
}
