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

let counter = 0

export const OneManBand = () => {
  console.log('OneManBand counter', ++counter)

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

  useEffect(() => {
    findEmployees()
    findJobs()
    findCities()
  }, [])

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

  const handleEdit = (index: number, person: Employee) => {
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

  const handleConfirmation = (index: number, id: string, name: string) => {
    setSelectedId(id)
    setName(name)
    setOpenConfirmationModal(!openConfirmationModal)
  }

  const handleDeletion = async () => {
    setEmployeeLoading(true)
    await deleteEmployee(selectedId!)
    await findEmployees()
    handleConfirmation(-1, '', '')
    setEmployeeLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold">Employees manager</h1>

      {showLoading && (
        <div className="z-20 flex bg-[rgba(0,0,0,0.2)] top-0 items-center justify-center w-full h-full fixed">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin" />
        </div>
      )}

      <section className="flex gap-4 w-full">
        <label className="flex-1">
          <span className="block font-bold">Name: </span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter your name"
            className="w-full border border-gray-400 py-2 px-4 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </label>

        <label>
          <span className="block font-bold">City: </span>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-indigo-500`}
          >
            <option value={undefined}>All</option>
            {cities.map((city) => (
              <option className="block py-1" value={city} key={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block font-bold">Job: </span>
          <select
            value={job}
            onChange={(event) => setJob(event.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-indigo-500"
          >
            <option value={undefined}>All</option>
            {jobs.map((job) => (
              <option className="block py-1" value={job} key={job}>
                {job}
              </option>
            ))}
          </select>
        </label>

        <div className="flex self-end mb-1 gap-4">
          <button
            onClick={handleFilter}
            className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center mb-1 w-full">
        <h2 className="text-xl font-bold">Employees List</h2>
        <button
          onClick={handleClearFields}
          className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
        >
          Add new employee
        </button>
      </div>

      <section className="w-full">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Birthday</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Job</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.map(({ id, name, birthday, city, job }, index) => (
              <tr key={id}>
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">
                  {parseISO(birthday).toLocaleDateString('pt-br')}
                </td>
                <td className="border px-4 py-2">{city}</td>
                <td className="border px-4 py-2">{job}</td>
                <td className="border px-4 py-2 ">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() =>
                        handleEdit(index, { id, name, birthday, city, job })
                      }
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleConfirmation(index, id!, name)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {openFormModal && (
        <section className="z-10 top-0 fixed w-full h-full bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 mt-16 mx-auto max-w-md rounded relative"
          >
            <span
              onClick={handleOpenForm}
              className="absolute right-5 top-5 cursor-pointer"
            >
              ❌
            </span>

            <h1 className="mb-8 text-2xl font-bold">
              {selectedId ? 'Edit' : 'Add'} Employee
            </h1>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                type="text"
                id="city"
                value={cityField}
                onChange={(event) => setCityField(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="job"
              >
                Job
              </label>
              <select
                value={jobField}
                onChange={(event) => setJobField(event.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-indigo-500"
              >
                <option value={undefined}>All</option>
                {jobs.map((job) => (
                  <option className="block py-1" value={job} key={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="birthday"
              >
                Birthday
              </label>
              <input
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                type="date"
                id="birthday"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
              />
            </div>
            <button
              className="w-full px-3 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </section>
      )}

      {openConfirmationModal && (
        <section
          className={`z-10 top-0 fixed w-full h-full bg-black bg-opacity-50`}
        >
          <div className="bg-white p-8 mt-72 mx-auto max-w-md rounded relative">
            <span
              onClick={() => handleConfirmation(-1, '', '')}
              className="absolute right-5 top-5 cursor-pointer"
            >
              ❌
            </span>

            <h1 className="mb-8 text-2xl font-bold">Confirm deletion</h1>

            <span>
              Do you really want to delete <strong>{name}</strong>?
            </span>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => handleConfirmation(-1, '', '')}
                className="flex-1 border border-red-500 hover:border-red-700 hover:text-red-700 text-red-500 font-bold py-2 mt-8 px-4 rounded"
              >
                Close
              </button>
              <button
                onClick={handleDeletion}
                className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-8 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
