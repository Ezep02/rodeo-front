const StatsSection = () => {
    const stats = [
        { number: "4.2", label: "Calificación Promedio", suffix: "/5" },
        { number: "500+", label: "Clientes Satisfechos", suffix: "" },
        { number: "5", label: "Años de Experiencia", suffix: "+" },
        { number: "98%", label: "Recomendaciones", suffix: "" },
    ]

    return (
        <section className="pb-24 px-6">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center space-y-2">
                            <div className="text-5xl font-bold text-white">
                                {stat.number}
                                <span className="text-rose-500">{stat.suffix}</span>
                            </div>
                            <div className="text-gray-400 text-lg">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection