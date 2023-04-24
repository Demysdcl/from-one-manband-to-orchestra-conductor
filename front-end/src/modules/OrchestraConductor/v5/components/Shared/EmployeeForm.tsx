import {
  FilledButton,
  Input,
  Label,
  Select,
  useGenericReducer,
} from '@/modules/Shared'
import { Employee } from '@/modules/Shared/service/employeeService'
import { format, parse, parseISO } from 'date-fns'
import { ChangeEvent, FormEvent, useEffect } from 'react'
import { INITIAL_EMPLOYEE } from '../../Shared'
import { useJobsStore } from '../../Shared/hooks/useJobsStore'

let counter = 0

interface EmployFormProps {
  title: string
  openFormModal: boolean
  initialEmployeeValues?: Employee
  clearForm?: boolean
  onClose: () => void
  onSubmit: (employee: Employee) => Promise<void>
}

export const EmployForm = ({
  title,
  openFormModal,
  onClose,
  initialEmployeeValues,
  onSubmit,
  clearForm = false,
}: EmployFormProps) => {
  if (!openFormModal) return null

  console.log('EmployForm counter', ++counter)

  const { jobs } = useJobsStore()

  const [{ id, name, city, job, birthday }, setEmployee] =
    useGenericReducer(INITIAL_EMPLOYEE)

  const formatDate = (date: string) =>
    date ? format(parseISO(date), 'yyyy-MM-dd') : ''

  useEffect(() => {
    if (initialEmployeeValues)
      setEmployee({
        ...initialEmployeeValues,
        birthday: formatDate(initialEmployeeValues.birthday),
      })
  }, [initialEmployeeValues])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) =>
    setEmployee({
      [event.target.name]: event.target.value,
    })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit({
      id,
      name,
      city,
      job,
      birthday: parse(birthday, 'yyyy-MM-dd', new Date()).toISOString(),
    })
    if (clearForm) setEmployee(INITIAL_EMPLOYEE)
  }

  return (
    <section className="z-10 top-0 fixed w-full h-full bg-black bg-opacity-50">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="bg-white p-8 mt-16 mx-auto max-w-md rounded relative"
      >
        <span
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer"
        >
          ❌
        </span>

        <h1 className="mb-8 text-2xl font-bold">{title}</h1>

        <div className="mb-4">
          <Label htmlFor="name">
            Name
            <Input value={name} name="name" onChange={handleChange} />
          </Label>
        </div>

        <div className="mb-4">
          <Label htmlFor="city">
            City
            <Input value={city} name="city" onChange={handleChange} />
          </Label>
        </div>

        <div className="mb-4">
          <Label htmlFor="job">
            Job
            <Select value={job} name="job" onChange={handleChange}>
              <option value={undefined}>All</option>
              {jobs.map((job) => (
                <option className="block py-1" value={job} key={job}>
                  {job}
                </option>
              ))}
            </Select>
          </Label>
        </div>

        <div className="mb-4">
          <Label htmlFor="birthday">
            Birthday
            <Input
              type="date"
              value={birthday}
              name="birthday"
              onChange={handleChange}
            />
          </Label>
        </div>
        <FilledButton type="submit">Submit</FilledButton>
      </form>
    </section>
  )
}
