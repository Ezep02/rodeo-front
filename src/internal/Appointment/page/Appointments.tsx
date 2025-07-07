import React, { Suspense} from 'react'

import {Loader2 } from 'lucide-react'

const AppointmentHistorial = React.lazy(() => import("../components/section/AppointmentHistorial"))

const Appointments: React.FC = () => {

  return (
    <div className="pt-24 pb-16 sm:px-6">

      <div className="container mx-auto max-w-4xl">

        {/* Historial de Citas */}
        <Suspense
          fallback={
            <div className="bg-gray-900/50 border-gray-800 min-h-[60vh] lg:col-span-2 flex justify-center items-center rounded-md">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <AppointmentHistorial />
        </Suspense>
      </div>
    </div >
  )
}
export default Appointments
