import React from 'react'

type WinAndLossLayoutProps = {
  children:React.ReactNode
}

const WinAndLossLayout:React.FC<WinAndLossLayoutProps> = ({children}) => {
  return (
    <section  
      className='
        xl:col-start-6 xl:col-end-12 xl:row-start-2 xl:row-end-5
        bg-zinc-200 flex w-full h-full
      '
    >
      {children}
    </section>
  )
}

export default WinAndLossLayout
