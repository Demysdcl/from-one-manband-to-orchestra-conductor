import { useEffect, useState } from 'react'

export function Example1() {
  const [result, setResult] = useState<boolean>()

  const fetchData = async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data from fetch')
      }, 1000)
    })
  }

  const processData = async (): Promise<number> => {
    const data = await fetchData()
    return data.length
  }

  const calculateResult = async (): Promise<boolean> => {
    const processedData = await processData()
    return processedData > 5
  }

  const updateResult = async () => {
    const result = await calculateResult()
    setResult(result)
  }

  useEffect(() => {
    console.log('MyComponent.useEffect')
    updateResult()
  }, [])

  return (
    <div>
      {result ? <strong>Result: {result.toString()}</strong> : 'Loading...'}
    </div>
  )
}
