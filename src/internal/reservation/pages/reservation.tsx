import React, { useState } from "react"
import {
    Check,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Calendar1
} from "lucide-react"
import { SiMercadopago } from "react-icons/si"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useUser } from "@/hooks/useUser"
import { useSlots } from "@/hooks/useSlots"
import Calendar from "@/components/common/Calendar"

import { Product } from "../services/shop_service"
import { Slot } from "../model/Slot"
import { Preference } from "../model/Preference_mp"
import { CreatePreference } from "../services/mp_preference"
import { useProductShop } from "../hooks/useProduct"

const ReservationPage: React.FC = () => {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<Product>()
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedTime, setSelectedTime] = useState<Slot>()
    const [loadingSlots, setLoadingSlots] = useState(false)
    const [paymentPercentage, setPaymentPercentage] = useState("100")

    const { productShop } = useProductShop()
    const { user } = useUser()
    const { date, filteredSlots, setDate, MoveSlotOffset } = useSlots()

    const openBooking = (service: Product) => {
        setSelectedService(service)
        setDialogOpen(true)
    }

    const closeBooking = () => {
        resetStepper()
        setDialogOpen(false)
    }

    const resetStepper = () => {
        setCurrentStep(1)
        setSelectedTime(undefined)
    }

    const steps = [
        { id: 1, title: "Fecha & Hora", icon: Calendar1 },
        { id: 2, title: "Confirmación", icon: Check },
        { id: 3, title: "Pago", icon: CreditCard }
    ]

    const canProceed = () => {
        switch (currentStep) {
            case 1: return date !== null && selectedTime !== undefined && !loadingSlots
            case 2: return true
            case 3: return true
            default: return false
        }
    }

    const HandlePaymentPercentage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentPercentage(e.target.value)
    }

    const CalculatePaymentPercentage = (percentage: string, price: number): number => {
        const percent = parseFloat(percentage)
        if (isNaN(percent)) return price
        return (percent / 100) * price
    }

    const HandlePayment = async () => {
        if (!selectedService || !user || !selectedTime) return

        const selectedProduct = [selectedService.id]
        const slot = filteredSlots.find((s) => s.id === selectedTime.id)

        const req: Preference = {
            customer_name: user.name,
            customer_surname: user.surname,
            date: selectedTime.date instanceof Date ? selectedTime.date.toISOString() : String(selectedTime.date),
            payment_percentage: Number(paymentPercentage),
            products: selectedProduct,
            slotID: selectedTime.id,
            time: slot ? slot.time : ""
        }

        try {
            setLoadingSlots(true)
            const response = await CreatePreference(req)
            window.location.href = response.init_point
        } catch (error) {
            console.error("Error creando link de pago", error)
        } finally {
            setLoadingSlots(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Servicios</h2>
                        <div className="space-y-1">
                            {productShop.map((prod, index) => (
                                <div key={prod.id}>
                                    <div
                                        className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                                        onClick={() => openBooking(prod)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">{prod.name}</h3>
                                            <p className="text-sm text-gray-500">{prod.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-green-400">${prod.price}</span>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                    {index < productShop.length - 1 && <div className="border-b border-gray-100 mx-2" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={closeBooking}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Reservar Cita</DialogTitle>
                    </DialogHeader>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8 px-4">
                        {steps.map((step, index) => {
                            const completed =
                                step.id === 1 ? date !== null && selectedTime !== undefined :
                                    currentStep > step.id

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                            currentStep === step.id ? "bg-rose-500 border-rose-500 text-white"
                                                : completed ? "bg-green-500 border-green-500 text-white"
                                                    : "bg-white border-gray-300 text-gray-400"
                                        )}>
                                            {completed ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                        </div>
                                        <span className="text-xs mt-2 font-medium text-gray-600">{step.title}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={cn("w-16 h-0.5 mx-4 transition-all", currentStep > step.id ? "bg-green-500" : "bg-gray-200")} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Step Content */}
                    {/* Paso 1: Fecha y hora */}
                    {currentStep === 1 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Selecciona fecha y hora</h3>
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Fecha</h4>
                                <div className="overflow-hidden max-w-xl">
                                    <Calendar
                                        selectedDate={date}
                                        setSelectedDate={(newDate) => {
                                            setDate(newDate)
                                            setSelectedTime(undefined)
                                        }}
                                        moveSlotOffset={MoveSlotOffset}
                                    />
                                </div>
                            </div>

                            <h4 className="font-medium mb-3">Hora disponible</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {loadingSlots ? (
                                    <div className="col-span-4 flex justify-center items-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                        <span className="ml-2 text-gray-500 text-sm">Cargando horarios...</span>
                                    </div>
                                ) : filteredSlots.length === 0 ? (
                                    <p className="col-span-4 text-center text-gray-400">No hay horarios disponibles para este día.</p>
                                ) : (
                                    filteredSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            variant={selectedTime?.id === slot.id ? "default" : "outline"}
                                            className={cn(
                                                "h-12",
                                                selectedTime?.id === slot.id && "bg-rose-500 hover:bg-rose-600",
                                                slot.is_booked && "opacity-50 cursor-not-allowed"
                                            )}
                                            disabled={slot.is_booked}
                                            onClick={() => {
                                                if (!slot.is_booked && typeof slot.id === "number") {
                                                    setSelectedTime({
                                                        ...slot,
                                                        id: slot.id as number
                                                    });
                                                }
                                            }}
                                        >
                                            {slot.time}
                                        </Button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Paso 2: Confirmación */}
                    {currentStep === 2 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Confirma tu reserva</h3>
                            <Card className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Servicio:</span>
                                        <span>{selectedService?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Fecha:</span>
                                        <span>{date ? new Date(date).toLocaleDateString() : "-"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Hora:</span>
                                        <span>{selectedTime?.time || "-"}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-500">Seña:</span>
                                        <select value={paymentPercentage} onChange={HandlePaymentPercentage} required>
                                            <option value="100">No</option>
                                            <option value="50">Sí</option>
                                        </select>
                                    </div>
                                    <div className="border-t pt-4 font-semibold flex justify-between text-lg items-center">
                                        <span>Total:</span>
                                        <div className="flex flex-col text-right">
                                            {paymentPercentage === "50" && selectedService ? (
                                                <>
                                                    <span className="line-through text-gray-500">${selectedService.price}</span>
                                                    <span className="text-green-500">
                                                        ${CalculatePaymentPercentage(paymentPercentage, selectedService.price)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-green-500">${selectedService?.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Paso 3: Pago */}
                    {currentStep === 3 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Método de pago</h3>
                            <Card className="p-4 mb-3 cursor-pointer hover:bg-gray-50 border-2 border-rose-500 bg-rose-50">
                                <div className="flex items-center gap-3">
                                    <SiMercadopago size={25} />
                                    <div>
                                        <h4 className="font-medium">Mercado Pago</h4>
                                        <p className="text-sm text-gray-600">Acredita el pago online</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between items-center pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={closeBooking}>Cancelar</Button>
                            {currentStep < 3 ? (
                                <Button
                                    onClick={() => setCurrentStep(currentStep + 1)}
                                    disabled={!canProceed()}
                                    className="bg-rose-500 hover:bg-rose-600 flex items-center gap-2"
                                >
                                    Siguiente <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={HandlePayment}
                                    disabled={loadingSlots}
                                >
                                    {loadingSlots ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin text-zinc-200" />
                                            <span className="text-zinc-50 text-sm">Procesando...</span>
                                        </>
                                    ) : (
                                        <span>Confirmar Reserva</span>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReservationPage
