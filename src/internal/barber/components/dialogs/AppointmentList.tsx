import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoMdList } from "react-icons/io"

import { Appointment } from '../../models/Appointments'
import ApptItemCard from '../cards/OrderItemCard'

type AppointmentListProps = {
  appts: Appointment[]
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appts }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleDialog = () => setIsOpen(prev => !prev)

  const extraCount = appts.length - 2

  if (extraCount <= 0) return null

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="rounded-xl"
        onClick={toggleDialog}
      >
        Ver más (+{extraCount})
      </Button>

      <Dialog open={isOpen} onOpenChange={toggleDialog}>
        <DialogContent
          className="w-full h-full max-w-full max-h-full p-6 bg-zinc-50 z-50 flex flex-col
          overflow-y-auto shadow-2xl md:rounded-3xl
          2xl:max-h-[80vh] 2xl:min-h-[80vh] 2xl:max-w-xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl"
        >
          <DialogHeader className="mb-2 pt-2">
            <div className="flex items-start flex-col gap-3">
              <div className="flex items-center gap-4 mb-6">
                <button
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                  onClick={toggleDialog}
                >
                  <FaArrowLeft size={18} className="text-zinc-700" />
                </button>
                <h1 className="text-lg font-semibold text-zinc-700">
                  Citas Pendientes
                </h1>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-zinc-900 rounded-xl text-white">
                  <IoMdList size={24} />
                </div>
                <div>
                  <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                    Lista de citas pendientes
                  </DialogTitle>
                  <DialogDescription className="text-start">
                    Dale un vistazo a la lista completa de citas activas.
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <main className="flex flex-col gap-1 overflow-hidden overflow-y-auto scroll-abrir-editar-tarjeta">
            {appts.slice(2).map(appt => (
              <ApptItemCard key={appt.id} appointment={appt} />
            ))}
          </main>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppointmentList
