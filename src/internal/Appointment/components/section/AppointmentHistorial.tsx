import React from 'react'
import { useAppointment } from '../../hooks/useAppointment'
import { Calendar } from 'lucide-react'
import AppointmentCard from '../card/AppointmentCard'

const AppointmentHistorial: React.FC = () => {

    const {
        customerAppointment
    } = useAppointment()

    return (
        <section className='flex  border-gray-200 grow'>
            <div className="flex flex-col flex-grow">
                <div className="space-y-4">
                    {
                        Array.isArray(customerAppointment) && customerAppointment.length > 0 ? (
                            <>
                                {
                                    customerAppointment.map((appt, indx) => (
                                        <div key={appt.id}>
                                            <AppointmentCard
                                                appointment={appt}
                                                key={indx}
                                            />
                                            {indx < customerAppointment.length - 1 && <div className="border-b border-gray-100 mx-2" />}
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <div className="p-2">
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 mx-auto mb-3 text-rose-400" />

                                    <p className="text-gray-700">No tienes citas pendientes</p>

                                    <a
                                        href="/reservation"
                                        className="mt-2 inline-block text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 transition"
                                    >
                                        Programar nueva cita
                                    </a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default AppointmentHistorial
