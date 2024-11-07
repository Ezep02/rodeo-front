import React from 'react'

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout:React.FC<DashboardProps> = ({children}) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default DashboardLayout
