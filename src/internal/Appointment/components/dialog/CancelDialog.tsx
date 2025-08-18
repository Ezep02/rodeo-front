import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Appointment } from '../../models/Appointment'
import useCancel from '../../hooks/useCancel'
import { getCancellationPolicy } from '../../utils/GetCancellationPolicy'

type CancelProps = {
    appointment: Appointment
}

const CancelDialog: React.FC<CancelProps> = ({ appointment }) => {

    const {
        isWithin24Hours,
        handleReschedule,
        isOpen,
        handleIsOpen,
        isCancelApptPending,
        isCancelWithCouponPending,
        cancelWithCouponErr,
        cancelApptErr
    } = useCancel(appointment)

    // Verificar que condiciones de las politicas cumple
    const policy = getCancellationPolicy(appointment.payment_percentage, isWithin24Hours(appointment.slot.date, appointment.slot.time));

    return (
        <Dialog open={isOpen} onOpenChange={handleIsOpen}>

            <DialogTrigger asChild>
                <button>
                    Cancelar
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                {isCancelApptPending || isCancelWithCouponPending ? (
                    <div className="w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>Cancelando</span>
                    </div>
                ) : (
                    <>
                        <DialogHeader>

                            <DialogTitle>¿Cancelar turno?</DialogTitle>
                            <DialogDescription>
                                {policy.message}

                            </DialogDescription>
                        </DialogHeader>

                        {
                            (cancelApptErr || cancelWithCouponErr) && (
                                <p className='p-2 bg-red-600/10 text-red-500 border rounded-md text-sm'>
                                    Ocurrió un error cancelando la cita
                                </p>
                            )
                        }

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={handleIsOpen}>
                                No, volver
                            </Button>

                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleReschedule}
                            >
                                Sí, cancelar
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CancelDialog
