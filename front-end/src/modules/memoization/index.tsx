import { useState } from 'react'
import TodoForm from './TodoForm'
import { Todo } from './types'

let counter = 0

export function TodoList() {
  console.log('TodoList counter', ++counter)
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'Complete React project', completed: false },
    { text: 'Read a chapter of a book', completed: false },
    { text: 'Go for a walk', completed: false },
    { text: 'Cook dinner', completed: true },
    { text: 'Buy groceries', completed: true },
    { text: 'Do laundry', completed: true },
    { text: 'Schedule a dentist appointment', completed: false },
    { text: 'Call a friend', completed: false },
    { text: 'Watch a movie', completed: false },
    { text: 'Learn a new skill', completed: false },
  ])
  const [newTodo, setNewTodo] = useState<string>('')

  const title = { text: 'TODO List manager' }

  const updateTodos = () => {
    setTodos([...todos, { text: newTodo, completed: false }])
    setNewTodo('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTodos()
  }

  const handleDelete = (index: number) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  const handleToggle = (index: number) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  return (
    <div className="max-w-md mx-auto">
      <TodoForm
        title={title}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSubmit={handleSubmit}
      />

      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(index)}
              className="mr-2"
            />
            <span
              className={`flex-grow ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
