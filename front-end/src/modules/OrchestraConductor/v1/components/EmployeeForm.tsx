import { Dispatch, FormEvent, SetStateAction } from 'react'

let counter = 0

interface EmployFormProps {
  openFormModal: boolean
  handleOpenForm: () => void
  name: string
  setName: Dispatch<SetStateAction<string>>
  cityField: string
  setCityField: Dispatch<SetStateAction<string>>
  jobField: string
  setJobField: Dispatch<SetStateAction<string>>
  birthday: string
  setBirthday: Dispatch<SetStateAction<string>>
  jobs: string[]
  handleSubmit: (event: FormEvent) => Promise<void>
  selectedId?: string
}

export const EmployForm = ({
  selectedId,
  openFormModal,
  handleOpenForm,
  name,
  setName,
  cityField,
  setCityField,
  jobField,
  setJobField,
  birthday,
  setBirthday,
  jobs,
  handleSubmit,
}: EmployFormProps) => {
  console.log('EmployForm counter', ++counter)

  if (!openFormModal) return <></>

  return (
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
          <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
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
          <label className="block mb-2 font-bold text-gray-700" htmlFor="city">
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
          <label className="block mb-2 font-bold text-gray-700" htmlFor="job">
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
  )
}
