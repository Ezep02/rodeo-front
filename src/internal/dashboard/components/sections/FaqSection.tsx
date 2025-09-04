import React from 'react'

const FaqSection: React.FC = () => {
    return (
        <div className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                    <p className="text-xl text-gray-600">Resolvemos las dudas más comunes de nuestros clientes</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm">
                        <details className="group">
                            <summary className="flex justify-between items-center p-6 cursor-pointer">
                                <h3 className="text-lg font-semibold text-gray-900">¿Necesito hacer cita previa?</h3>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Recomendamos hacer cita previa para garantizar tu horario preferido, pero también atendemos clientes
                                sin cita según disponibilidad.
                            </div>
                        </details>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <details className="group">
                            <summary className="flex justify-between items-center p-6 cursor-pointer">
                                <h3 className="text-lg font-semibold text-gray-900">¿Qué métodos de pago aceptan?</h3>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Aceptamos efectivo, tarjetas de débito y crédito, transferencias bancarias y pagos móviles como
                                Bizum.
                            </div>
                        </details>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <details className="group">
                            <summary className="flex justify-between items-center p-6 cursor-pointer">
                                <h3 className="text-lg font-semibold text-gray-900">¿Cuánto tiempo dura cada servicio?</h3>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Un corte clásico toma aproximadamente 30 minutos, arreglo de barba 20 minutos, y el paquete premium
                                completo 60 minutos.
                            </div>
                        </details>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <details className="group">
                            <summary className="flex justify-between items-center p-6 cursor-pointer">
                                <h3 className="text-lg font-semibold text-gray-900">¿Tienen productos para la venta?</h3>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Sí, vendemos productos premium para el cuidado del cabello y barba de las mejores marcas
                                profesionales.
                            </div>
                        </details>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <details className="group">
                            <summary className="flex justify-between items-center p-6 cursor-pointer">
                                <h3 className="text-lg font-semibold text-gray-900">¿Cuál es su horario de atención?</h3>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Lunes a Viernes: 9:00 AM - 8:00 PM, Sábados: 8:00 AM - 7:00 PM, Domingos: 10:00 AM - 5:00 PM.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqSection

