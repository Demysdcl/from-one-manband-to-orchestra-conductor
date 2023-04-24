import { useLoaderStore } from '@/modules/Shared'
import {
  Employee,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { useEmployeesStore } from '../../hooks/useEmployeesStore'
import { EmployForm } from '../Shared/EmployeeForm'

interface EmployFormProps {
  selectedEmployee: Employee
  openFormModal: boolean
  onClose: () => void
}

export const EditEmployeeForm = ({
  selectedEmployee,
  openFormModal,
  onClose,
}: EmployFormProps) => {
  const { showLoader, hideLoader } = useLoaderStore()
  const { changeEmployee } = useEmployeesStore()

  if (!openFormModal) return null

  const handleSubmit = async (employee: Employee) => {
    try {
      showLoader()
      await updateEmployee(employee?.id!, {
        ...employee,
      })
      changeEmployee(employee)
      hideLoader()
    } catch (error) {
      console.error(error)
    } finally {
      onClose()
      hideLoader()
    }
  }

  return (
    <EmployForm
      title="Edit Employee"
      initialEmployeeValues={selectedEmployee}
      handleOpenForm={onClose}
      openFormModal={openFormModal}
      onSubmit={handleSubmit}
    />
  )
}
