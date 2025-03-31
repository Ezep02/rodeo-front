import React from 'react'


type OverviewCardProps = {
    title: string;
    text: string;
    avg: number | Float64Array
}

const OverviewCard:React.FC<OverviewCardProps> = ({title, text, avg}) => {
  return (
    <div
        className='rounded-lg shadow-sm border bg-white'
    >
        <div className='space-y-1.5 p-6 flex flex-row items-center justify-between pb-2'>
            <h3 className='text-sm font-medium'>{title}</h3>
        </div>

        <div className='p-6 pt-0'>
            <div className='text-2xl font-bold'>
                {text}
            </div>
            <p className='text-xs text-zinc-600'>
                <span className='text-emerald-500 font-medium'>{avg}%</span> desde el mes pasado
            </p>
        </div>
    </div>
  )
}

export default OverviewCard