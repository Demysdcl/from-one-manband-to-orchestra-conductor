import {
  Employee,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction } from 'react'
import { EmployForm } from '../../Shared/EmployeeForm'

interface EmployFormProps {
  selectedEmployee: Employee
  openFormModal: boolean
  handleOpenForm: () => void
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const EditEmployeeForm = ({
  selectedEmployee,
  onLoading,
  onUpdate,
  openFormModal,
  handleOpenForm,
}: EmployFormProps) => {
  if (!openFormModal) return null

  const handleSubmit = async (employee: Employee) => {
    try {
      onLoading(true)
      const newEmployee = await updateEmployee(employee?.id!, {
        ...employee,
      })
      onUpdate(newEmployee)
    } catch (error) {
      console.error(error)
    } finally {
      handleOpenForm()
      onLoading(false)
    }
  }

  return (
    <EmployForm
      title="Edit Employee"
      initialEmployeeValues={selectedEmployee}
      handleOpenForm={handleOpenForm}
      onLoading={onLoading}
      openFormModal={openFormModal}
      onSubmit={handleSubmit}
    />
  )
}
