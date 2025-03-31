import React from 'react'
import { PendingOrder } from '../../models/OrderModel'
import Avatar from '@/components/common/Avatar'


type PendingOrderProps = {
    Data: PendingOrder[] | []
}

const PendingOrdersTable: React.FC<PendingOrderProps> = ({ Data }) => {



    const getStatusClass = (order: PendingOrder): string => {
        if (order.Status.toLowerCase() === "cancelado") {
            return "bg-red-500";
        }

        if (new Date(order.Schedule_start_time) < new Date()) {
            return "bg-green-500"; // Completado
        }
        return "bg-zinc-800"; // Pendiente
    };

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
                            className='flex items-center justify-between space-x-4 p-1 '
                        >
                            <div className='flex items-center space-x-4'>
                                <Avatar name={order.Payer_name} bg='bg-zinc-700' />
                                <div>
                                    <span className='text-sm font-medium'>
                                        {order.Payer_name}{" "}{order.Payer_surname}
                                    </span>
                                    <p className='text-sm text-zinc-600'>{order.Title}</p>
                                </div>
                            </div>

                            <div className='flex items-center space-x-4'>
                                <div className='flex flex-col items-end'>
                                    <span className='text-sm'>
                                        {order.Schedule_start_time}
                                    </span>
                                    <p className='text-sm text-zinc-600'>{new Date(order.Schedule_day_date).toLocaleDateString("es-AR", {
                                        day: "2-digit", month: "long", year: "numeric"
                                    })}</p>
                                </div>

                                <div

                                    className={`inline-flex items-center text-sm px-2 py-1 rounded-full text-zinc-50 font-medium ${getStatusClass(order)}`}
                                >
                                    {order.Status}
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
