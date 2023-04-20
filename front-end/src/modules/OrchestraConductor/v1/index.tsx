import {
  Employee,
  addEmployee,
  deleteEmployee,
  getCities,
  getEmployees,
  getJobs,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { format, parse, parseISO } from 'date-fns'
import { FormEvent, useEffect, useState } from 'react'
import { AddEmployeeAction } from './components/AddEmployeeAction'
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal'
import { EmployForm } from './components/EmployeeForm'
import { EmployeeTable } from './components/EmployeeTable'
import { Filter } from './components/Filter'
import { Loader } from './components/Loader'

let counter = 0

export const OrchestraConductorV1 = () => {
  console.log('OrchestraConductorV1 counter', ++counter)

  const [employeeloading, setEmployeeLoading] = useState(false)
  const [jobsloading, setJobsLoading] = useState(false)
  const [citiesloading, setCitiesLoading] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredList, setFilteredList] = useState<Employee[]>([])

  const [cities, setCities] = useState<string[]>([])
  const [jobs, setJobs] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [job, setJob] = useState('')

  const [openFormModal, setOpenFormModal] = useState(false)
  const [name, setName] = useState('')
  const [cityField, setCityField] = useState('')
  const [jobField, setJobField] = useState('')
  const [birthday, setBirthday] = useState('')

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string>()

  const showLoading = employeeloading || citiesloading || jobsloading

  const findEmployees = async () => {
    setEmployeeLoading(true)
    const response = await getEmployees()
    setEmployees(response)
    setEmployeeLoading(false)
  }

  const findJobs = async () => {
    setJobsLoading(true)
    setJobs(await getJobs())
    setJobsLoading(false)
  }

  const findCities = async () => {
    setCitiesLoading(true)
    setCities(await getCities())
    setCitiesLoading(false)
  }

  const handleFilter = () => {
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

  useEffect(() => {
    handleFilter()
  }, [employees])

  useEffect(() => {
    findEmployees()
    findJobs()
    findCities()
  }, [])

  const handleEdit = (person: Employee) => {
    setSelectedId(person.id)
    setName(person.name)
    setCityField(person.city)
    setJobField(person.job)
    setBirthday(format(parseISO(person.birthday), 'yyyy-MM-dd'))
    handleOpenForm()
  }

  const handleClearFields = () => {
    setSelectedId('')
    setName('')
    setCityField('')
    setJobField('')
    setBirthday('')
    handleOpenForm()
  }

  const save = async () => {
    await addEmployee({
      name,
      city: cityField,
      job: jobField,
      birthday: parse(birthday, 'yyyy-MM-dd', new Date()).toISOString(),
    })
    await findEmployees()
    await findCities()
    handleClearFields()
  }

  const edit = async () => {
    await updateEmployee(selectedId!, {
      name,
      city: cityField,
      job: jobField,
      birthday: parse(birthday, 'yyyy-MM-dd', new Date()).toISOString(),
    })

    await findEmployees()
    await findCities()
    handleClearFields()
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setEmployeeLoading(true)
      if (selectedId) edit()
      else save()
    } catch (error) {
      console.error(error)
    } finally {
      handleClearFields()
      setEmployeeLoading(false)
    }
  }

  const handleOpenForm = () => {
    setOpenFormModal(!openFormModal)
  }

  const handleConfirmation = (employee?: Employee) => {
    setSelectedId(employee?.id)
    setOpenConfirmationModal(!openConfirmationModal)
  }

  const handleDeletion = async () => {
    setEmployeeLoading(true)
    await deleteEmployee(selectedId!)
    await findEmployees()
    handleConfirmation()
    setEmployeeLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold">Employees manager</h1>

      <Loader showLoading={showLoading} />

      <Filter
        query={query}
        city={city}
        job={job}
        jobs={jobs}
        cities={cities}
        setQuery={setQuery}
        setCity={setCity}
        setJob={setJob}
        handleFilter={handleFilter}
      />

      <AddEmployeeAction handleClearFields={handleClearFields} />

      <EmployeeTable
        filteredList={filteredList}
        handleEdit={handleEdit}
        handleConfirmation={handleConfirmation}
      />

      <EmployForm
        selectedId={selectedId}
        openFormModal={openFormModal}
        handleOpenForm={handleOpenForm}
        name={name}
        setName={setName}
        cityField={cityField}
        setCityField={setCityField}
        jobField={jobField}
        setJobField={setJobField}
        birthday={birthday}
        setBirthday={setBirthday}
        jobs={jobs}
        handleSubmit={handleSubmit}
      />

      <DeleteConfirmationModal
        openConfirmationModal={openConfirmationModal}
        handleConfirmation={handleConfirmation}
        name={name}
        handleDeletion={handleDeletion}
      />
    </div>
  )
}
