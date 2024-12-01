import React from 'react'

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout:React.FC<DashboardProps> = ({children}) => {
  return (
    <main className='grid grid-cols-12 grid-rows-12 h-full w-full
      
    '>
        {children}
    </main>
  )
}

export default DashboardLayout
