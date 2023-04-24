import {
  FilledButton,
  Input,
  Label,
  Select,
  useGenericReducer,
} from '@/modules/Shared'
import { ChangeEvent, memo } from 'react'
import { FilterType, useCitiesStore, useJobsStore } from '../../Shared'
import { useFilterStore } from './useFilterStore'

let counter = 0

const initialFilter: FilterType = {
  query: '',
  city: '',
  job: '',
}

const Filter = () => {
  console.log('Filter counter', ++counter)

  const { cities } = useCitiesStore()
  const { jobs } = useJobsStore()
  const { setFilter } = useFilterStore()

  const [{ query, job, city }, updateFilter] = useGenericReducer(initialFilter)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) =>
    updateFilter({
      [event.target.name]: event.target.value,
    })

  return (
    <section className="flex gap-4 w-full">
      <Label className="flex-1">
        <span className="block font-bold">Name: </span>
        <Input type="text" value={query} name="query" onChange={handleChange} />
      </Label>

      <Label>
        <span className="block font-bold">City: </span>
        <Select value={city} name="city" onChange={handleChange}>
          <option value={undefined}>All</option>
          {cities.map((city) => (
            <option className="block py-1" value={city} key={city}>
              {city}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        <span className="block font-bold">Job: </span>
        <Select value={job} name="job" onChange={handleChange}>
          <option value={undefined}>All</option>
          {jobs.map((job) => (
            <option className="block py-1" value={job} key={job}>
              {job}
            </option>
          ))}
        </Select>
      </Label>

      <div className="flex self-end mb-1">
        <FilledButton onClick={() => setFilter({ query, city, job })}>
          Search
        </FilledButton>
      </div>
    </section>
  )
}

export default memo(Filter)
