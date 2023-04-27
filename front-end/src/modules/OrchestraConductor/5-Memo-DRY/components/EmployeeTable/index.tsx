import { parseISO } from 'date-fns'
import { memo } from 'react'
import { useEmployeesStore } from '../../Shared/hooks/useEmployeesStore'
import { useFilterStore } from '../Filter/useFilterStore'
import { DeleteEmployee } from './DeleteEmployee'
import { EditEmployee } from './EditEmployee'
import { Td } from './Td'
import { Th } from './Th'

let counter = 0

const EmployeeTable = () => {
  console.log('EmployeeTable counter', ++counter)

  const { employees } = useEmployeesStore()
  const { filter } = useFilterStore()
  const { query, job, city } = filter

  const filteredList = employees.filter((item) => {
    const isNameMatched = item.name
      .trim()
      .toLowerCase()
      .includes(query.toLowerCase())
    const isCityMatched = !city || city === 'All' || item.city === city
    const isJobMatched = !job || job === 'All' || item.job === job
    return isNameMatched && isCityMatched && isJobMatched
  })

  return (
    <>
      <section className="w-full">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Birthday</Th>
              <Th>City</Th>
              <Th>Job</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.map(({ id, name, birthday, city, job }, index) => (
              <tr key={id}>
                <Td>{name}</Td>
                <Td>{parseISO(birthday).toLocaleDateString('pt-br')}</Td>
                <Td>{city}</Td>
                <Td>{job}</Td>
                <Td>
                  <div className="flex items-center justify-center gap-4">
                    <EditEmployee
                      selectedEmployee={{ id, name, birthday, city, job }}
                    />
                    <DeleteEmployee
                      selectedEmployee={{ id, name, birthday, city, job }}
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default memo(EmployeeTable)
