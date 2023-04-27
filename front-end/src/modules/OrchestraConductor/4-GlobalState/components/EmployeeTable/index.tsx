import { parseISO } from 'date-fns'
import { useEmployeesStore } from '../../Shared/hooks/useEmployeesStore'
import { useFilterStore } from '../Filter/useFilterStore'
import { DeleteEmployee } from './DeleteEmployee'
import { EditEmployee } from './EditEmployee'

let counter = 0

export const EmployeeTable = () => {
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
                    <EditEmployee
                      selectedEmployee={{ id, name, birthday, city, job }}
                    />
                    <DeleteEmployee
                      selectedEmployee={{ id, name, birthday, city, job }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
