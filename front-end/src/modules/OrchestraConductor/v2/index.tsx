import {
  Employee,
  getEmployees,
} from '@/modules/Shared/service/employeeService'
import { useEffect, useState } from 'react'
import { FilterType } from './Shared'
import { AddEmployeeAction } from './components/AddEmployeeAction'
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal'
import { EmployForm } from './components/EmployeeForm'
import { EmployeeTable } from './components/EmployeeTable'
import { Filter } from './components/Filter'
import { Loader } from './components/Loader'

let counter = 0

export const OrchestraConductorV2 = () => {
  console.log('OrchestraConductorV2 counter', ++counter)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredList, setFilteredList] = useState<Employee[]>([])

  const [openFormModal, setOpenFormModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

  const [employeeloading, setEmployeeLoading] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  const showLoading = employeeloading || filterLoading || formLoading

  const findEmployees = async () => {
    setEmployeeLoading(true)
    const response = await getEmployees()
    setEmployees(response)
    setFilteredList(response)
    setEmployeeLoading(false)
  }

  const handleFilter = ({ query, city, job }: FilterType) => {
    setFilteredList(
      employees.filter((item) => {
        const isNameMatched = item.name
          .trim()
          .toLowerCase()
          .includes(query.toLowerCase())
        const isCityMatched = !city || city === 'All' || item.city === city
        const isJobMatched = !job || job === 'All' || item.job === job
        return isNameMatched && isCityMatched && isJobMatched
      }),
    )
  }

  const findEmployeeIndexById = (employee: Employee) =>
    employees.findIndex(({ id }) => id === employee.id)

  const handleFormUpdate = (employee: Employee) => {
    const indexOf = findEmployeeIndexById(employee)
    if (indexOf > -1) {
      const tempEmployees = [...employees]
      tempEmployees[indexOf] = employee
      setEmployees(tempEmployees)
      return
    }
    setEmployees([...employees, employee])
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    handleOpenForm()
  }

  const handleOpenForm = () => {
    setOpenFormModal(!openFormModal)
  }

  const handleConfirmation = (employee?: Employee) => {
    setSelectedEmployee(employee)
    setOpenConfirmationModal(!openConfirmationModal)
  }

  const handleDeleted = (employee?: Employee) => {
    const indexOf = findEmployeeIndexById(employee!)
    employees.splice(indexOf, 1)
  }

  useEffect(() => {
    findEmployees()
  }, [])

  useEffect(() => {
    setFilteredList(employees)
  }, [employees])

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold">Employees manager</h1>

      <Loader showLoading={showLoading} />

      <Filter handleFilter={handleFilter} setLoading={setFilterLoading} />

      <AddEmployeeAction handleClearFields={handleOpenForm} />

      <EmployeeTable
        filteredList={filteredList}
        handleEdit={handleEdit}
        handleConfirmation={handleConfirmation}
      />

      <EmployForm
        openFormModal={openFormModal}
        handleOpenForm={handleOpenForm}
        onLoading={setFormLoading}
        onUpdate={handleFormUpdate}
        initialEmployeeValues={selectedEmployee}
      />

      <DeleteConfirmationModal
        openConfirmationModal={openConfirmationModal}
        handleConfirmation={handleConfirmation}
        selectedEmployee={selectedEmployee}
        onLoading={setEmployeeLoading}
        onDelete={handleDeleted}
      />
    </div>
  )
}
