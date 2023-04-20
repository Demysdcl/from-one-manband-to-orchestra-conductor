import { memo, useState } from 'react'
import { useStore } from '../store'

const Filter = () => {
  console.log('Filter rendered')

  const [selected, setSelected] = useState(1)

  const update = useStore(({ actions }) => actions.update)

  const handleChange = (event) => {
    setSelected(+event.target.value)
    update(+event.target.value)
  }

  return (
    <div className="flex gap-2">
      <select value={selected} onChange={handleChange}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <p>{selected}</p>
    </div>
  )
}

export default memo(Filter)
