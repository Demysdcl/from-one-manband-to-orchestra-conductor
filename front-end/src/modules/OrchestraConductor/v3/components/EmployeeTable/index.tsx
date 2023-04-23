import { Employee } from '@/modules/Shared/service/employeeService'
import { parseISO } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { DeleteEmployeeAction } from './DeleteEmployeeAction'
import { EditEmployeeAction } from './EditEmployeeAction'

let counter = 0

interface EmployeeTableProps {
  filteredList: Employee[]
  onLoading: Dispatch<SetStateAction<boolean>>
  onUpdate: (employee: Employee) => void
  onDeleted: (employee: Employee) => void
}

export const EmployeeTable = ({
  filteredList,
  onLoading,
  onUpdate,
  onDeleted,
}: EmployeeTableProps) => {
  console.log('EmployeeTable counter', ++counter)

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
                    <EditEmployeeAction
                      selectedEmployee={{
                        id,
                        name,
                        birthday,
                        city,
                        job,
                      }}
                      onLoading={onLoading}
                      onUpdate={onUpdate}
                    />
                    <DeleteEmployeeAction
                      onDeleted={onDeleted}
                      onLoading={onLoading}
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
