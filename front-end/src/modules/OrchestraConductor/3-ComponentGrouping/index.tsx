import {
  Employee,
  getEmployees,
} from '@/modules/Shared/service/employeeService'
import { useEffect, useState } from 'react'
import { FilterType } from './Shared'
import { AddEmployeeAction } from './components/AddEmployeeAction'
import { EmployeeTable } from './components/EmployeeTable'
import { Filter } from './components/Filter'
import { Loader } from './components/Loader'

let counter = 0

export const OrchestraConductorV3 = () => {
  console.log('OrchestraConductorV3 counter', ++counter)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredList, setFilteredList] = useState<Employee[]>([])

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

      <AddEmployeeAction
        onLoading={setFormLoading}
        onUpdate={handleFormUpdate}
      />

      <EmployeeTable
        filteredList={filteredList}
        onLoading={setEmployeeLoading}
        onUpdate={handleFormUpdate}
        onDeleted={handleDeleted}
      />
    </div>
  )
}
