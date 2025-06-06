import React from 'react'

const AppointmentsHeader:React.FC = () => {
    return (
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
                Mis <span className="text-rose-500">Citas</span>
            </h1>
            <p className="text-gray-400 text-lg">Gestiona tus reservas y historial de servicios</p>
        </div>
    )
}

export default AppointmentsHeader
