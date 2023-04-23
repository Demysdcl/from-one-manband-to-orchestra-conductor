import {
  Employee,
  addEmployee,
  getJobs,
  updateEmployee,
} from '@/modules/Shared/service/employeeService'
import { format, parse, parseISO } from 'date-fns'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { genericReducer } from '../Shared'
import { INITIAL_EMPLOYEE } from '../Shared/constants'

let counter = 0

interface EmployFormProps {
  openFormModal: boolean
  handleOpenForm: () => void
  initialEmployeeValues?: Employee
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
}

export const EmployForm = ({
  openFormModal,
  handleOpenForm,
  initialEmployeeValues,
  onLoading,
  onUpdate,
}: EmployFormProps) => {
  console.log('EmployForm counter', ++counter)

  if (!openFormModal) return null

  const [jobs, setJobs] = useState<string[]>([])

  const [{ name, city, job, birthday }, setEmployee] = useReducer(
    genericReducer<Employee>,
    INITIAL_EMPLOYEE,
  )

  const findJobs = async () => {
    onLoading(true)
    setJobs(await getJobs())
    onLoading(false)
  }

  useEffect(() => {
    findJobs()
  }, [])

  useEffect(() => {
    if (initialEmployeeValues)
      setEmployee({
        ...initialEmployeeValues,
        birthday: format(
          parseISO(initialEmployeeValues.birthday),
          'yyyy-MM-dd',
        ),
      })
  }, [initialEmployeeValues])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) =>
    setEmployee({
      [event.target.name]: event.target.value,
    })

  const save = async () => {
    const newEmployee = await addEmployee({
      name,
      city,
      job,
      birthday: parse(birthday, 'yyyy-MM-dd', new Date()).toISOString(),
    })
    onUpdate(newEmployee)
  }

  const edit = async () => {
    const updatedEmployee = await updateEmployee(initialEmployeeValues?.id!, {
      name,
      city,
      job,
      birthday: parse(birthday, 'yyyy-MM-dd', new Date()).toISOString(),
    })
    onUpdate(updatedEmployee)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      onLoading(true)
      if (initialEmployeeValues?.id) edit()
      else save()
    } catch (error) {
      console.error(error)
    } finally {
      onLoading(false)
    }
  }

  return (
    <section className="z-10 top-0 fixed w-full h-full bg-black bg-opacity-50">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="bg-white p-8 mt-16 mx-auto max-w-md rounded relative"
      >
        <span
          onClick={handleOpenForm}
          className="absolute right-5 top-5 cursor-pointer"
        >
          ❌
        </span>

        <h1 className="mb-8 text-2xl font-bold">
          {initialEmployeeValues ? 'Edit' : 'Add'} Employee
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="city">
            City
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            type="text"
            id="city"
            value={city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="job">
            Job
          </label>
          <select
            value={job}
            name="job"
            onChange={handleChange}
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
            name="birthday"
            onChange={handleChange}
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
  )
}
