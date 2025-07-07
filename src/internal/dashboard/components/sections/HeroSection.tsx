import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <div className="mb-16">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Encontra un lugar
        <br />
        Donde la excelencia prevalece.
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl ">
        Tu próxima cita en la barbería a solo un toque de distancia — Reserva un turno en segundos, sin llamadas ni esperas
      </p>

      <div className="flex flex-col sm:flex-row  gap-4">
        <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full">
          Reserva Ya - Es Facil
        </Button>
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm border-2 border-orange-200 text-orange-700 bg-orange-50"
        >
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="font-medium">#1 BARBER PLATFORM</span>
          </div>
        </Badge>
      </div>
    </div>
  )
}

export default HeroSection
