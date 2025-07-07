import React from 'react'

const AppointmentsHeader: React.FC = () => {
    return (
        <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
                Mis citas
            </h1>
            <p className="text-sm text-gray-500">Tu historial de reservas</p>
        </div>
    )
}

export default AppointmentsHeader
