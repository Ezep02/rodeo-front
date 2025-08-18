import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { BiMailSend } from 'react-icons/bi'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'

import { GrSend } from "react-icons/gr";

type ReminderProps = {
    Client: string
}

const AppointmentReminder: React.FC<ReminderProps> = ({ Client }) => {

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
    const ToggleDialog = () => {
        setDialogOpen((prev) => !prev)
    }


    // Manejar la solicitud de envio del recordatorio
    const SendReminder = async () => {

        try {
            //let response = await SendAppointmentReminder(Client)
            // if (response) {
            //     console.log("envio exitoso")
            // }

            ToggleDialog()
        } catch (error) {
            console.warn("Algo no fue bien enviando el recordatorio", error)
        }
    }


    return (
        <Dialog open={isDialogOpen} onOpenChange={ToggleDialog}>

            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size={"sm"}
                    onClick={() => ToggleDialog}
                >
                    <IoIosSend />
                    Enviar Recordatorio
                </Button>
            </DialogTrigger>

            <DialogContent
                className='
                    w-full h-full p-6 bg-zinc-50 z-50 flex flex-col
                    overflow-y-auto shadow-2xl rounded-3xl
                    max-w-sm max-h-[50vh]
                    md:max-w-xl md:max-h-[40vh] md:min-h-[40vh]
                '
            >
                <DialogHeader className="mb-2 pt-1">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={ToggleDialog}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">
                                Correo
                            </h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <BiMailSend size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                                    Enviar Recordatorio
                                </DialogTitle>
                                <DialogDescription className="text-start text-zinc-600">
                                    Enviale un recordatorio al cliente.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <main className='flex flex-grow'>
                    TODO: implementar envio
                    {Client}
                </main>

                <DialogFooter>
                    <Button
                        size={"sm"}
                        onClick={SendReminder}
                    >
                        <GrSend />
                        Enviar
                    </Button>
                </DialogFooter>


            </DialogContent>
        </Dialog>
    )
}

export default AppointmentReminder
