import React from 'react'
import { useTurns } from '../../hooks/useTurns'



const CustomerNextTurns: React.FC = () => {

    const {
        cutomerPendingOrders
    } = useTurns()
    console.log(cutomerPendingOrders)

    return (
        <div className='flex flex-col gap-2'>
            {
                cutomerPendingOrders?.length > 0 ? (
                    <>
                        {
                            cutomerPendingOrders.map((pending_order, i) => (

                                <article
                                    key={i}
                                    className="flex justify-between rounded-lg border bg-zinc-100 p-4 flex-col"
                                >
                                    <div className='w-full'>
                                        <h2 className='text-green-500 font-medium'>
                                            Tu cita fue confirmada
                                        </h2>
                                    </div>

                                    <div className="flex flex-col py-5">
                                        <div className="">
                                            <h2 className="text-xl font-medium">Cita programada</h2>
                                        </div>

                                        <div className='p-2 bg-zinc-200'>

                                            <div className='flex gap-3'>
                                                <div className='p-2 rounded-full bg-blue-200'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-600">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                                    </svg>
                                                </div>
                                                
                                                <div className='flex flex-col'>
                                                    <div>
                                                        <h3 
                                                            className='text-zinc-500 text-sm font-medium'
                                                        >
                                                            FECHA & HORA
                                                        </h3>
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        {
                                                            new Date(pending_order.schedule_day_date).toLocaleDateString("es-AR", {
                                                                weekday: "long", 
                                                                month: "long",
                                                                day: "numeric",
                                                                year:"numeric"
                                                            })
                                                        }
                                                        <span>{pending_order.schedule_start_time}{" "}hs</span>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                </article>
                            ))
                        }
                    </>
                ) : (
                    <p>No hay ordenes</p>
                )
            }
        </div>
    )
}

export default CustomerNextTurns
