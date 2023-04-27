import { OneManBand } from './modules/OneManBand'
import { OneManBandCode } from './modules/OneManBand/Code'
import { OrchestraConductorV1 } from './modules/OrchestraConductor/1-MarkupSegregation'
import { MarkupSegregationCode } from './modules/OrchestraConductor/1-MarkupSegregation/Code'
import { OrchestraConductorV2 } from './modules/OrchestraConductor/2-ResponsabilitySegregation'
import { ResponsabilitySegregationCode } from './modules/OrchestraConductor/2-ResponsabilitySegregation/Code'
import { OrchestraConductorV3 } from './modules/OrchestraConductor/3-ComponentGrouping'
import { ComponentGroupingCode } from './modules/OrchestraConductor/3-ComponentGrouping/Code'
import { OrchestraConductorV4 } from './modules/OrchestraConductor/4-GlobalState'
import { GlobalStateCode } from './modules/OrchestraConductor/4-GlobalState/Code'
import { OrchestraConductorV5 } from './modules/OrchestraConductor/5-Memo-DRY'
import { MemoDRYCode } from './modules/OrchestraConductor/5-Memo-DRY/Code'
import { Loader } from './modules/Shared'
import { TabContainer, TabItem } from './modules/Shared/components/TabContainer'
import { TodoList } from './modules/memoization'
import { Example } from './modules/memoization/examples/Example'
import { Example1 } from './modules/memoization/examples/Example1'
import { Example2 } from './modules/memoization/examples/Example2'

let counter = 0

const tabs: TabItem[] = [
  {
    name: 'Memoization',
    content: (
      <TabContainer
        tabs={[
          { name: 'TodoList', content: <TodoList /> },
          { name: 'Example', content: <Example /> },
          { name: 'Example1', content: <Example1 /> },
          { name: 'Example2', content: <Example2 /> },
        ]}
      />
    ),
  },
  {
    name: 'One-man band',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OneManBand /> },
          { name: 'Code', content: <OneManBandCode /> },
        ]}
      />
    ),
  },
  {
    name: 'Markup segregation',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OrchestraConductorV1 /> },
          { name: 'Code', content: <MarkupSegregationCode /> },
        ]}
      />
    ),
  },
  {
    name: 'Responsability segregation',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OrchestraConductorV2 /> },
          { name: 'Code', content: <ResponsabilitySegregationCode /> },
        ]}
      />
    ),
  },
  {
    name: 'Component grouping',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OrchestraConductorV3 /> },
          { name: 'Code', content: <ComponentGroupingCode /> },
        ]}
      />
    ),
  },
  {
    name: 'Global state',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OrchestraConductorV4 /> },
          { name: 'Code', content: <GlobalStateCode /> },
        ]}
      />
    ),
  },
  {
    name: 'Memo DRY',
    content: (
      <TabContainer
        tabs={[
          { name: 'Page', content: <OrchestraConductorV5 /> },
          { name: 'Code', content: <MemoDRYCode /> },
        ]}
      />
    ),
  },
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
