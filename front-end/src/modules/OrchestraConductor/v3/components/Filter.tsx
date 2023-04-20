import { getCities, getJobs } from '@/modules/Shared/service/employeeService'
import { ChangeEvent, useEffect, useReducer } from 'react'

let counter = 0

type Selectors = {
  jobs: string[]
  cities: string[]
}

const initialSelectors: Selectors = {
  jobs: [],
  cities: [],
}

const selectorsReducer = (
  state: Selectors,
  partial: Partial<Selectors>,
): Selectors => ({
  ...state,
  ...partial,
})

const initialFilter: FilterType = {
  job: '',
  city: '',
  query: '',
}

const filterReducer = (
  state: FilterType,
  partial: Partial<FilterType>,
): FilterType => ({
  ...state,
  ...partial,
})

interface FilterProps {
  handleFilter: (filter: FilterType) => void
}

export const Filter = ({ handleFilter }: FilterProps) => {
  console.log('Filter counter', ++counter)

  const [{ cities, jobs }, setSelectors] = useReducer(
    selectorsReducer,
    initialSelectors,
  )

  const [{ query, job, city }, setFilter] = useReducer(
    filterReducer,
    initialFilter,
  )

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) =>
    setFilter({
      [event.target.name]: event.target.value,
    })

  const fillSelectors = async () => {
    const [cities, jobs] = await Promise.all([getCities(), getJobs()])
    setSelectors({ cities, jobs })
  }

  useEffect(() => {
    fillSelectors()
  }, [])

  return (
    <section className="flex gap-4 w-full">
      <label className="flex-1">
        <span className="block font-bold">Name: </span>
        <input
          type="text"
          value={query}
          name="query"
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border border-gray-400 py-2 px-4 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </label>

      <label>
        <span className="block font-bold">City: </span>
        <select
          value={city}
          name="city"
          onChange={handleChange}
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
      </label>

      <div className="flex self-end mb-1">
        <button
          onClick={() => handleFilter({ query, city, job })}
          className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
    </section>
  )
}
