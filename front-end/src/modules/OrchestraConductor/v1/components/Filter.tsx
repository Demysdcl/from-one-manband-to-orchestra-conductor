import { Dispatch, SetStateAction, useState } from 'react'

let counter = 0

interface FilterProps {
  query: string
  city: string
  job: string
  jobs: string[]
  cities: string[]
  setQuery: Dispatch<SetStateAction<string>>
  setCity: Dispatch<SetStateAction<string>>
  setJob: Dispatch<SetStateAction<string>>
  handleFilter: () => void
}

export const Filter = ({
  query,
  city,
  job,
  jobs,
  cities,
  setQuery,
  setCity,
  setJob,
  handleFilter: handleFilter,
}: FilterProps) => {
  console.log('Filter counter', ++counter)

  const [state, setState] = useState()

  return (
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

      <div className="flex self-end mb-1">
        <button
          onClick={handleFilter}
          className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
    </section>
  )
}
