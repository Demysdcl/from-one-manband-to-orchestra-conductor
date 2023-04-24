import { OrchestraConductorV4 } from './modules/OrchestraConductor/v4'
import { Loader } from './modules/Shared/components/Loader'

let counter = 0

function App() {
  console.log('App counter', ++counter)
  return (
    <>
      <div className="p-20">
        {/* <TodoList /> */}
        {/* <Bandman /> */}
        {/* <OrchestraConductorV1 /> */}
        {/* <OrchestraConductorV2 /> */}
        {/* <OrchestraConductorV3 /> */}
        <OrchestraConductorV4 />
      </div>
      <Loader />
    </>
  )
}

export default App
