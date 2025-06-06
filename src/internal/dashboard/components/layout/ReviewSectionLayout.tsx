import React from 'react'


type ReviewSectionLayoutProps = {
    children: React.ReactNode
}

const ReviewSectionLayout: React.FC<ReviewSectionLayoutProps> = ({ children }) => {

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900">

            <div className="container">
                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
                        <span className="text-rose-400 text-sm font-medium">Lo que dicen nuestros clientes</span>
                    </div>
                    
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Testimonios de <span className="text-rose-500">Clientes</span>
                    </h2>
                 
                </div>

                {/* Header con estadísticas */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
                    {children}
                </div>
            </div>


        </section>
    )
}

export default ReviewSectionLayout
