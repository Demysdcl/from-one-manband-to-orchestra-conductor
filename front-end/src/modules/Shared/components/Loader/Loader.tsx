import { useLoaderStore } from './useLoaderStore'

let counter = 0

export const Loader = () => {
  console.log('Loader counter', ++counter)
  const { calls } = useLoaderStore()

  if (!calls.length) return <></>

  return (
    <div className="z-20 flex bg-[rgba(0,0,0,0.2)] top-0 items-center justify-center w-full h-full fixed">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin" />
    </div>
  )
}
