import { Employee } from '@/modules/Shared/service/employeeService'
import { parseISO } from 'date-fns'
import { useState } from 'react'
import { INITIAL_EMPLOYEE } from '../../Shared'
import { useEmployeesStore } from '../../hooks/useEmployeesStore'
import { useFilterStore } from '../Filter/useFilterStore'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import { EditEmployeeForm } from './EditEmployeeForm'

let counter = 0

export const EmployeeTable = () => {
  console.log('EmployeeTable counter', ++counter)

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [openFormModal, setOpenFormModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee>(INITIAL_EMPLOYEE)

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

  const handleConfirmation = (employee: Employee) => {
    setOpenConfirmationModal(!openConfirmationModal)
    setSelectedEmployee(employee)
  }

  const handleOpenForm = (employee: Employee) => {
    setOpenFormModal(!openFormModal)
    setSelectedEmployee(employee)
  }

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
                    <button
                      onClick={() =>
                        handleOpenForm({ id, name, birthday, city, job })
                      }
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleConfirmation({ id, name, birthday, city, job })
                      }
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

      <EditEmployeeForm
        onClose={() => setOpenFormModal(false)}
        openFormModal={openFormModal}
        selectedEmployee={selectedEmployee}
      />

      <DeleteConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        selectedEmployee={selectedEmployee}
      />
    </>
  )
}
