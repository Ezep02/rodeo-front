import Avatar from '@/components/common/Avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { FrequentCustomer } from '../../models/analyticsModels'

type CustomerItemProps = {
    FrequentCustomer: FrequentCustomer
}

const CustomerItem: React.FC<CustomerItemProps> = ({ FrequentCustomer }) => {
    return (
        <div className="flex flex-col-reverse  md:grid sm:grid-cols-5 md:items-center p-3 gap-2 sm:gap-0 hover:bg-slate-50 border-b">

            {/* Nombre */}
            <div className="flex items-center md:gap-3 gap-1">
                <div className='hidden md:block'>
                    <Avatar name={FrequentCustomer.Customer_name} bg="bg-zinc-900" />
                </div>

                <span className='md:hidden font-medium'>Cliente:</span>
                <p className="font-medium">{FrequentCustomer.Customer_name}{" "}{FrequentCustomer.Customer_surname}</p>
            </div>

            {/* Visitas */}
            <div className="text-left md:text-center">
                <span className='md:hidden font-medium'>Visita:{" "}</span>{FrequentCustomer.Visits_count}
            </div>

            {/* Total gastado */}
            <div className="text-left md:text-center">
                <span className='md:hidden font-medium'>Total Abonado:{" "}</span>${FrequentCustomer.Total_spent}
            </div>

            {/* Última visita */}
            <div className=" md:text-center">
                <span className='md:hidden font-medium'>Ultima visita:{" "}</span>
                {new Date(FrequentCustomer.Last_visit).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                })}
            </div>

            {/* Botones */}
            <div className="flex justify-end md:justify-end gap-2 mt-2 sm:mt-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                        <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Crear cita</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default CustomerItem
