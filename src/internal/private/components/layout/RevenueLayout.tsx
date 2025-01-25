import React from 'react'

type RevenueLayoutProps = {
    children:React.ReactNode
}

const RevenueLayout:React.FC<RevenueLayoutProps> = ({children}) => {
  return (
    <section
        className='
        xl:col-start-1 xl:col-end-7 xl:row-start-5 xl:row-end-12
        
        
    '
    >
      {children}
    </section>
  )
}

export default RevenueLayout
