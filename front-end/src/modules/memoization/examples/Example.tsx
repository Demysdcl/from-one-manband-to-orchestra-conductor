import { useCallback, useEffect, useState } from 'react'

export function Example() {
  const [result, setResult] = useState<boolean>()

  const fetchData = useCallback(async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data from fetch')
      }, 1000)
    })
  }, [])

  const processData = useCallback(async (): Promise<number> => {
    const data = fetchData()
    return data.then((result) => result.length)
  }, [fetchData])

  const calculateResult = useCallback(async (): Promise<boolean> => {
    const processedData = await processData()
    return processedData > 5
  }, [processData])

  const updateResult = useCallback(async () => {
    const result = await calculateResult()
    setResult(result)
  }, [calculateResult])

  useEffect(() => {
    updateResult()
  }, [updateResult])

  return (
    <div>
      {result ? <strong>Result: {result.toString()}</strong> : 'Loading...'}
    </div>
  )
}
