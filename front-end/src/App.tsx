import { OneManBand } from './modules/OneManBand'
import { OrchestraConductorV1 } from './modules/OrchestraConductor/1-MarkupSegregation'
import { OrchestraConductorV2 } from './modules/OrchestraConductor/2-ResponsabilitySegregation'
import { OrchestraConductorV3 } from './modules/OrchestraConductor/3-ComponentGrouping'
import { OrchestraConductorV4 } from './modules/OrchestraConductor/4-GlobalState'
import { OrchestraConductorV5 } from './modules/OrchestraConductor/5-Memo-DRY'
import { Loader } from './modules/Shared'
import { TabContainer, TabItem } from './modules/Shared/components/TabContainer'
import { TodoList } from './modules/memoization'

let counter = 0

const tabs: TabItem[] = [
  {
    name: 'Todo',
    content: <TodoList />,
  },
  { name: 'One-man band', content: <OneManBand /> },
  { name: 'Markup segregation', content: <OrchestraConductorV1 /> },
  { name: 'Responsability segregation', content: <OrchestraConductorV2 /> },
  { name: 'Component grouping', content: <OrchestraConductorV3 /> },
  { name: 'Global state', content: <OrchestraConductorV4 /> },
  { name: 'Memo DRY', content: <OrchestraConductorV5 /> },
]

function App() {
  console.log('App counter', ++counter)
  return (
    <>
      <div className="p-20">
        <TabContainer tabs={tabs} />
      </div>
      <Loader />
    </>
  )
}

export default App
