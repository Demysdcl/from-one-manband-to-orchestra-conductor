let counter = 0

interface AddEmployeeActionProps {
  handleOpenForm: () => void
}

export const AddEmployeeAction = ({
  handleOpenForm: handleClearFields,
}: AddEmployeeActionProps) => {
  console.log('AddEmployeeAction counter', ++counter)

  return (
    <div className="flex justify-between items-center mb-1 w-full">
      <h2 className="text-xl font-bold">Employees List</h2>
      <button
        onClick={handleClearFields}
        className="bg-indigo-500 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded"
      >
        Add new employee
      </button>
    </div>
  )
}
