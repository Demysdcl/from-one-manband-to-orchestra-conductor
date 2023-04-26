import { useEffect, useState } from 'react'

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

const updateResult = async (setResult: (result: boolean) => void) => {
  const result = await calculateResult()
  setResult(result)
}

export function Example2() {
  const [result, setResult] = useState<boolean>()

  useEffect(() => {
    console.log('MyComponent.useEffect')
    updateResult(setResult)
  }, [])

  return (
    <div>
      {result ? <strong>Result: {result.toString()}</strong> : 'Loading...'}
    </div>
  )
}
