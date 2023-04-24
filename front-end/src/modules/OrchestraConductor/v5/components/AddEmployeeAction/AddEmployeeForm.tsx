import { useLoaderStore } from '@/modules/Shared'
import { Employee, addEmployee } from '@/modules/Shared/service/employeeService'
import { INITIAL_EMPLOYEE } from '../../Shared/constants'
import { useEmployeesStore } from '../../Shared/hooks/useEmployeesStore'
import { EmployForm } from '../Shared/EmployeeForm'

let counter = 0

interface EmployFormProps {
  handleOpenForm: () => void
}

export const AddEmployeeForm = ({ handleOpenForm }: EmployFormProps) => {
  console.log('AddEmployForm counter', ++counter)

  const { showLoader, hideLoader } = useLoaderStore()
  const { addNewEmployee } = useEmployeesStore()

  const handleSubmit = async (employee: Employee) => {
    try {
      showLoader()
      const newEmployee = await addEmployee({
        ...employee,
      })
      addNewEmployee(newEmployee)
    } catch (error) {
      console.error(error)
    } finally {
      hideLoader()
    }
  }

  return (
    <EmployForm
      title="Add Employee"
      initialEmployeeValues={INITIAL_EMPLOYEE}
      onClose={handleOpenForm}
      openFormModal={true}
      onSubmit={handleSubmit}
      clearForm
    />
  )
}
