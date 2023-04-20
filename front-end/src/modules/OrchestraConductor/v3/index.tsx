import {
  Employee,
  getEmployees,
} from '@/modules/Shared/service/employeeService'
import { useEffect, useState } from 'react'
import { AddEmployeeAction } from './components/AddEmployeeAction'

import { EmployeeTable } from '../v1/components/EmployeeTable'
import { Filter } from './components/Filter'
import { Loader } from './components/Loader'
import { EmployeeForm } from './components/Shared/EmployeeForm'

let counter = 0

export const OrchestraConductorV3 = () => {
  console.log('OrchestraConductorV2 counter', ++counter)

  const [employeeLoading, setEmployeeLoading] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([])

  const [filteredList, setFilteredList] = useState<Employee[]>([])

  const [openFormModal, setOpenFormModal] = useState(false)

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()

  const findEmployees = async () => {
    setEmployeeLoading(true)
    const response = await getEmployees()
    setEmployees(response)
    setEmployeeLoading(false)
  }

  useEffect(() => {
    findEmployees()
  }, [])

  useEffect(() => {
    setFilteredList(employees)
  }, [employees])

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

  const handleOpenForm = () => {
    setOpenFormModal(!openFormModal)
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold">Employees manager</h1>

      <Loader showLoading={employeeLoading} />

      <Filter handleFilter={handleFilter} />

      <AddEmployeeAction handleOpenForm={handleOpenForm} />

      <EmployeeTable
        findEmployees={findEmployees}
        setEmployeeLoading={setEmployeeLoading}
        filteredList={filteredList}
        handleOpenForm={handleOpenForm}
        setSelectedEmployee={setSelectedEmployee}
      />

      <EmployeeForm
        handleSubmit={() => Promise.resolve()}
        title="Add Employee"
        initialEmployeeValues={selectedEmployee}
        openFormModal={openFormModal}
        handleOpenForm={handleOpenForm}
        onUpdate={findEmployees}
      />
    </div>
  )
}
