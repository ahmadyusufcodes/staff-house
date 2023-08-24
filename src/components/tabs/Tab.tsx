import React from 'react'

interface TabProps {
    tabs: {
        label: string
        component: React.ReactNode
    }[],
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function Tab({
    tabs,
    activeTab,
    setActiveTab
}: TabProps) {
  return (
    <div className='flex flex-col'>
      <div className="flex border-b">
        {
            tabs.map((tab, index) => (
                <button
                key={index}
                className={`px-4 py-2 text-sm ${activeTab === tab.label.toLowerCase() ? 'text-blue-500 border-b-2 border-blue-600' : 'border-b-2 text-[#757B88] border-transparent hover:border-gray-300'}`}
                onClick={() => setActiveTab(tab.label.toLowerCase())}
                >
                    {tab.label}
                </button>
            ))

        }
      </div>
        <div className='mt-4 text-black text-sm'>
        {tabs.map((tab, index) => (
            <div key={index} className={`transition-all duration-200 ${activeTab === tab.label.toLowerCase() ? 'block' : 'hidden'}`}>
                {tab.component}
            </div>
        ))}
      </div>
    </div>
  )
}
