
import React from 'react'

type OverviewLayoutProps = {
  children: React.ReactNode
}

const OverviewLayout:React.FC<OverviewLayoutProps> = ({children}) => {
 
  
  // 1. total usuarios registrados 

  // 2. plata total facturada

  // 3. ordenes totales realizadas 

  // 4. cortes totales realizados



  return (
    <div className='
        xl:col-start-1 xl:col-end-6 xl:row-start-2 xl:row-end-5
        bg-zinc-100 w-full h-full flex flex-col  gap-2 p-2

    '>
     
      {children}
    </div>
  )
}

export default OverviewLayout
