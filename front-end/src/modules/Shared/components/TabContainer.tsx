import { ReactNode, useState } from 'react'

export interface TabItem {
  name: string
  content: ReactNode
}

interface TabContainerProps {
  tabs: TabItem[]
}

export const TabContainer = ({ tabs }: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const selectedTab = tabs[activeTab] ?? tabs[0]

  return (
    <div className="flex flex-col border border-indigo-500 rounded overflow-hidden">
      <div className="bg-indigo-500 text-white">
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              key={tab.name}
              className={`px-6 py-4 text-center flex items-center justify-center cursor-pointer ${
                activeTab === index && 'bg-indigo-700'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4">{selectedTab.content}</div>
    </div>
  )
}
