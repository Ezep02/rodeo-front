import React from 'react'

type UsersOverviewProps = {
    children:React.ReactNode
}

const UsersOverview:React.FC<UsersOverviewProps> = ({children}) => {
  return (
    <section
        className='
        xl:col-start-7 xl:col-end-12 xl:row-start-5 xl:row-end-12   
        bg-orange-200
    '
    >
      {children}
    </section>
  )
}

export default UsersOverview
