import React from 'react'
import ClientRateChart from '../charts/ClientRate'
import { ClientRate } from '../../models/Metric'
import { IoAnalytics } from "react-icons/io5"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FaArrowLeft } from 'react-icons/fa6'

type ClientRateDialogProps = {
    open: boolean
    onClose: () => void
    client_rate: ClientRate[]
}

const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-").map(Number)
    const date = new Date(year, month - 1)
    return date.toLocaleString("es-ES", { month: "long", year: "numeric" })
}

const ClientRateDialog: React.FC<ClientRateDialogProps> = ({
    open,
    onClose,
    client_rate,
}) => {
    const hasData = client_rate && client_rate.length > 0

    const total = hasData ? client_rate.reduce((acc, curr) => acc + curr.new_clients, 0) : 0
    const average = hasData ? total / client_rate.length : 0

    const topMonthData = hasData
        ? client_rate.reduce((prev, curr) =>
            curr.new_clients > prev.new_clients ? curr : prev
        )
        : null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="w-full p-6 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl bg-zinc-50 overflow-y-auto max-h-[80vh] "

            >
                <DialogHeader className="mb-2 pt-2">
                    <div className="flex items-start flex-col gap-3">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={onClose}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">
                                Registros Mensuales
                            </h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <IoAnalytics size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                                    Tasa de Nuevos Registros
                                </DialogTitle>
                                <DialogDescription className="text-start">
                                    Visualiza la evolución de los registros mensuales para detectar
                                    tendencias de crecimiento o estacionalidad.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {hasData ? (
                    <main className="flex flex-col space-y-6 px-1">
                        <section className="bg-gray-100 p-4 rounded-xl text-sm text-zinc-700 mb-6">
                            <p>
                                <strong>Promedio mensual:</strong> {average.toFixed(2)} clientes
                            </p>
                            <p>
                                <strong>Mes con más registros:</strong>{' '}
                                {formatMonth(topMonthData!.month)} ({topMonthData!.new_clients}{' '}
                                clientes)
                            </p>
                        </section>

                        <section className="pb-4">
                            <div className="mb-3">
                                <h2 className="text-sm font-medium text-zinc-700">
                                    Estadísticas mensuales
                                </h2>
                            </div>
                            <ClientRateChart month_client_rate={client_rate} />
                        </section>
                    </main>
                ) : (
                    <div className="text-center text-zinc-500 py-12">
                        <p className="text-sm">No hay registros disponibles para mostrar.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ClientRateDialog

