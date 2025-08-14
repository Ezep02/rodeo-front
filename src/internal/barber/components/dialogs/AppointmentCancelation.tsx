import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

import { Appointment } from '../../models/Appointments'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { MdFreeCancellation } from "react-icons/md";
import { CancelOrder } from '../../services/order_services'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'


type AppointmentListProps = {
    appt: Appointment
}

const AppointmentCancelation: React.FC<AppointmentListProps> = ({ appt }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDialog = () => setIsOpen(prev => !prev)

    const [showAlert, setShowAlert] = useState<boolean>(false)

    // On success
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [successMsg, setSuccessMsg] = useState<string>("")

    // On error
    const [showOnError, setShowOnError] = useState<boolean>(false)
    const [onErrorMsg, setOnErrorMsg] = useState<string>("")


    // Manejar la cancelacion de la cita
    const onCancelAppointment = async () => {

        try {
            // Contruir objeto

            let res = await CancelOrder(appt.id, {
                expire_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                recharge: 100
            })

            if (res) {
                toggleDialog()
                setSuccessMsg("Cita cancelada exitosamente")
                setShowSuccess(true)
            }

        } catch (error) {
            setShowOnError(true)
            setOnErrorMsg("Algo no fue bien cancelando la cita")
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                size="sm"
                variant="ghost"
                className="text-zinc-800"
                onClick={() => {
                    if (appt.payment_percentage < 100) {
                        setIsOpen(true)
                    } else {
                        setShowAlert(true)
                    }
                }}
            >
                Cancelar Cita
            </Button>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>No puedes cancelar esta cita</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta cita ya fue pagada en su totalidad (100%), Por lo que no puede ser cancelada.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowAlert(false)}>
                            Cerrar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <SuccessAlert
                message={successMsg}
                show={showSuccess}
                onClose={() => setShowAlert(false)}
            />

            <ErrorAlert
                message={onErrorMsg}
                show={showOnError}
                onClose={() => setShowAlert(false)}
            />

            <DialogContent
                className="w-full h-full p-6 bg-zinc-50 z-50 flex flex-col
               overflow-y-auto shadow-2xl rounded-3xl
               max-w-sm max-h-[50vh]
               md:max-w-xl md:max-h-[40vh] md:min-h-[40vh]"
            >
                <DialogHeader className="mb-4">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                            onClick={toggleDialog}
                        >
                            <FaArrowLeft size={18} className="text-zinc-700" />
                        </button>
                        <h1 className="text-xl font-bold text-zinc-800">
                            Cancelar cita
                        </h1>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-zinc-900 rounded-xl text-white">
                            <MdFreeCancellation size={24} />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                                ¿Estás seguro de que deseas cancelar?
                            </DialogTitle>
                            <DialogDescription className="text-zinc-600 mt-1 text-start">
                                Revisa bien esta acción. Una vez cancelada, no se podrá revertir.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <main className="flex flex-col gap-3 text-sm text-zinc-700 pb-5 flex-grow">
                    <p className='p-5 bg-gray-100 rounded-lg shadow-sm font-semibold'>
                        Al cancelar la cita, el cliente obtendrá un <span className="font-semibold text-green-700">descuento del 100%</span> en su próxima compra.
                    </p>
                </main>

                <DialogFooter>

                    <Button
                        size={"sm"}
                        variant={"ghost"}
                        className='text-zinc-800'
                        onClick={toggleDialog}
                    >
                        No, Volver
                    </Button>

                    <Button
                        size={"sm"}
                        onClick={onCancelAppointment}
                    >
                        Si, Cancelar
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default AppointmentCancelation
