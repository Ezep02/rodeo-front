import React from 'react'

type UsersOverviewProps = {
    children:React.ReactNode
}

const UsersOverview:React.FC<UsersOverviewProps> = ({children}) => {
  return (
    <section
        className='
        xl:col-start-1 xl:col-end-6 xl:row-start-7 xl:row-end-12   
        rounded-md border-2 border-zinc-100 p-2
    '
    >
      {children}
    </section>
  )
}

export default UsersOverview
