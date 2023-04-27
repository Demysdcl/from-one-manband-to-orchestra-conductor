import { useLoaderStore } from '@/modules/Shared'
import {
  Employee,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { useEmployeesStore } from '../../../Shared/hooks/useEmployeesStore'
import { EmployForm } from '../../Shared/EmployeeForm'

interface EmployFormProps {
  selectedEmployee: Employee
  onClose: () => void
}

export const EditEmployeeForm = ({
  selectedEmployee,
  onClose,
}: EmployFormProps) => {
  const { showLoader, hideLoader } = useLoaderStore()
  const { changeEmployee } = useEmployeesStore()

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
      onClose={onClose}
      openFormModal={true}
      onSubmit={handleSubmit}
    />
  )
}
