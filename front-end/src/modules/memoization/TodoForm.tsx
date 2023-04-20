import { Dispatch, FormEvent, SetStateAction } from 'react'

let counter = 0

interface TodoFormProps {
  title: { text: string }
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  newTodo: string
  setNewTodo: Dispatch<SetStateAction<string>>
}

const TodoForm = ({
  title,
  handleSubmit,
  newTodo,
  setNewTodo,
}: TodoFormProps) => {
  console.log('TodoForm counter', ++counter)

  return (
    <>
      <h1 className="font-bold mb-2 w-full text-center">{title.text}</h1>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow px-3 py-2 border-2 border-gray-200 rounded-l focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </form>
    </>
  )
}

export default TodoForm
