import { Employee } from '@/modules/Shared/service/employeeService'
import { parseISO } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import { INITIAL_EMPLOYEE } from '../../Shared'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import { EditEmployeeForm } from './EditEmployeeForm'

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

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [openFormModal, setOpenFormModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee>(INITIAL_EMPLOYEE)

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
        onLoading={onLoading}
        onUpdate={onUpdate}
        openFormModal={openFormModal}
        selectedEmployee={selectedEmployee}
      />

      <DeleteConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        selectedEmployee={selectedEmployee}
        onLoading={onLoading}
        onDeleted={onDeleted}
      />
    </>
  )
}
