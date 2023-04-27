import {
  Employee,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { Dispatch, SetStateAction } from 'react'
import { EmployForm } from '../Shared/EmployeeForm'

interface EmployFormProps {
  selectedEmployee: Employee
  openFormModal: boolean
  onClose: () => void
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const EditEmployeeForm = ({
  selectedEmployee,
  onLoading,
  onUpdate,
  openFormModal,
  onClose,
}: EmployFormProps) => {
  if (!openFormModal) return <></>

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
      onClose()
      onLoading(false)
    }
  }

  return (
    <EmployForm
      title="Edit Employee"
      initialEmployeeValues={selectedEmployee}
      handleOpenForm={onClose}
      onLoading={onLoading}
      openFormModal={openFormModal}
      onSubmit={handleSubmit}
    />
  )
}
