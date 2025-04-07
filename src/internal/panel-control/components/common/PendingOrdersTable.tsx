import React from 'react'
import { PendingOrder } from '../../models/OrderModel'


type PendingOrderProps = {
    Data: PendingOrder[] | []
}

const PendingOrdersTable: React.FC<PendingOrderProps> = ({ Data }) => {
  
    return (
        <div
            className='p-6 pt-0 h-full '
        >
            <ul
                className='space-y-4 max-h-[350px] overflow-hidden overflow-y-scroll scroll-abrir-tarjeta scroll-smooth'
            >
                {
                    Data.map((order) => (
                        <li
                            className='flex items-center justify-between space-x-4 border rounded-md p-2'
                        >
                            <div className='flex items-center space-x-4'>
                                <div>
                                    <span className='text-sm font-medium'>
                                        {order.payer_name}{" "}{order.payer_surname}
                                    </span>
                                    <p className='text-sm text-zinc-600'>{order.title}</p>
                                </div>
                            </div>

                            <div className='flex items-center space-x-4'>
                                <div className='flex flex-col items-end'>
                                    <span className='text-sm'>
                                        {order.schedule_start_time}
                                    </span>
                                    <p className='text-sm text-zinc-600'>{new Date(order.schedule_day_date).toLocaleDateString("es-AR", {
                                        day: "2-digit", month: "long", year: "numeric"
                                    })}</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default PendingOrdersTable
