import React, { useContext, useState } from 'react'

import { Button } from '@/components/ui/button'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Clock, PencilIcon, PlusIcon, Search, TrashIcon } from 'lucide-react'
import { Service } from '../../models/ServicesModels'
import { FaGears } from "react-icons/fa6";
import { GiBullHorns } from 'react-icons/gi'
import { useSchedules } from '../../hooks/useSchedules'
import { PanelControlContext } from '@/context/PanelControlContext'

type ServiceAndScheduleManagerTabProps = {
    Services: Service[] | []
}

const ServiceAndScheduleManagerTab: React.FC<ServiceAndScheduleManagerTabProps> = ({ Services }) => {

    const {
        HandleOpenScheduler
    } = useSchedules()

    const {
        setCreateModalOpen
    } = useContext(PanelControlContext)!

    // Filtrar servicios según el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    const filteredServices = Services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Tabs defaultValue="Servicios">

            <TabsList className="grid grid-cols-2 w-[300px] mb-4">
                <TabsTrigger value="Servicios">Servicios</TabsTrigger>
                <TabsTrigger value="Horarios">Horarios</TabsTrigger>
            </TabsList>

            <TabsContent value="Servicios" >
                <div className='space-y-4'>
                    <div className="flex items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                className='w-full flex border border-zinc-300 text-sm font-medium focus:ring pl-8 p-2 rounded-md outline-none ring-zinc-200 '
                                placeholder='Buscar servicio...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button onClick={() => setCreateModalOpen(true)}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Agregar
                        </Button>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-2 text-zinc-600">
                            Servicios actualmente activos:{" "}{Services.length > 0 ? Services.length : 0}
                        </p>
                        {
                            Services.length > 0 ? (
                                <ul className='h-[280px] overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta '>
                                    {
                                        filteredServices.map((service) => ((
                                            <li key={service.ID} className="flex items-center justify-between py-3">

                                                <div>
                                                    <h3 className="font-medium">{service.title}</h3>
                                                    <p className="text-sm text-gray-500">{service.description}</p>
                                                    <div className="flex gap-4 mt-1 text-sm">
                                                        <span>${service.price.toFixed(2)}</span>
                                                        <span>{service.service_duration} min</span>

                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="icon" >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-600"
                                                    // onClick={() => openDeleteDialog(service)}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                {/* <div>
                                                    <p className="font-medium">{service.title}</p>
                                                    <p className="text-sm text-green-300 font-semibold">${service.price}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        Editar
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </div> */}


                                            </li>
                                        )))
                                    }
                                </ul>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center h-[200px]"
                                >
                                    <FaGears size={40} className="text-zinc-400" />

                                    <p className="text-zinc-800">
                                        Sin servicios registrados
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="Horarios">
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b ">
                        <h3 className="text-lg font-medium">Horarios de Atención</h3>
                        <Button
                            size="sm"
                            className="bg-black hover:bg-black/80"
                            onClick={HandleOpenScheduler}
                        >
                            <Clock className="mr-2 h-4 w-4" /> Agregar Horarios
                        </Button>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center h-[200px]"
                    >
                        <GiBullHorns size={40} className="text-rose-500" />
                    </div>

                </div>
            </TabsContent>
        </Tabs>
    )
}

export default ServiceAndScheduleManagerTab
