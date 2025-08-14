import React, { useState } from 'react'
import useMetric from '../../hooks/useMetric'
import StatCard from '../cards/StatCard'

import { FaUsers } from "react-icons/fa";
import { RiPieChart2Line } from 'react-icons/ri'
import { LuChartColumnIncreasing } from "react-icons/lu";
import ClientRateDialog from '../dialogs/ClientRateDialog';

const Stats: React.FC = () => {
    const {
        ocupationRate,
        barberInformation,
        totalPost,
        clientRate
    } = useMetric()

    const [isClientRateOpen, setClientRate] = useState<boolean>(false)
    const HandleClientRateDialog = () => {
        setClientRate((prev) => !prev)
    }


    return (
        <section className="w-full py-3">
            {/* Encabezado */}
            <header className="mb-4">
                <h2 className="text-lg font-semibold text-zinc-800">Panel de métricas</h2>
                <p className="text-sm text-zinc-500">
                    Una vista general del rendimiento y actividad reciente.
                </p>
            </header>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <StatCard
                    icon={<FaUsers size={24} className="text-white" />}
                    content={barberInformation?.member}
                    title="Usuarios activos"
                    description="Total de usuarios registrados en la plataforma"
                    callToAction={HandleClientRateDialog}
                    visibleButton={true}
                />

                <StatCard
                    icon={<LuChartColumnIncreasing size={24} className="text-white" />}
                    content={totalPost}
                    title="Posts publicados"
                    description="Contenido creado para la comunidad"
                    visibleButton={false}
                />

                <StatCard
                    icon={<RiPieChart2Line size={24} className="text-white" />}
                    content={`${ocupationRate?.ocuppancy_percentage ?? 0}%`}
                    title="Tasa de ocupación"
                    description="Porcentaje de turnos reservados"
                    visibleButton={false}
                />
            </div>


            <ClientRateDialog
                open={isClientRateOpen}
                onClose={HandleClientRateDialog}
                client_rate={clientRate}
            />
        </section>
    )
}

export default Stats
