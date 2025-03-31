import React from 'react'
import { MonthlyPopularServices } from '../../models/analyticsModels'

type TopServicesData = {
    PopularServicesList: MonthlyPopularServices[] | []
}

const PopularServicesTable: React.FC<TopServicesData> = ({ PopularServicesList }) => {

    return (
        <div className='rounded-lg shadow-sm border bg-white'>
            <div className='flex flex-col space-y-1.5 p-6'>
                <h3 className='text-2xl font-semibold'>Servicios Populares</h3>
                <p className='text-sm text-zinc-600'>Top servicios del mes</p>
            </div>

            <div className='p-6 pt-0'>
                {
                    PopularServicesList.length > 0 ? (
                        <ul className='space-y-4'>
                            {
                                PopularServicesList.map((srv) => (
                                    <li className='flex items-center justify-between'>
                                        <h4 className='font-medium'>{srv.Service_name}</h4>{" "}<span className='text-sm text-zinc-600'>{srv.Service_count}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p>Sin servicios</p>
                    )
                }

            </div>

        </div>
    )
}

export default PopularServicesTable