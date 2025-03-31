import React from 'react'

type CardLayoutProps = {
    children: React.ReactNode
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
    return (
        <div
            className='rounded-lg border shadow-sm bg-zinc-50'
        >
            {children}
        </div>
    )
}

export default CardLayout
