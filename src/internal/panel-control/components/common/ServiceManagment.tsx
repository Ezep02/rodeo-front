import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Edit, Plus, Scissors, Search, Trash2 } from 'lucide-react'
import { useContext, useState } from 'react'
import { Service } from '../../models/ServicesModels'
import { PanelControlContext } from '@/context/PanelControlContext'

type ServiceAndScheduleManagerTabProps = {
    Services: Service[] | []
}

const ServiceManagment: React.FC<ServiceAndScheduleManagerTabProps> = ({ Services }) => {

    // Filtrar servicios según el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    const filteredServices = Services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const {
        setCreateModalOpen
    } = useContext(PanelControlContext)!


    return (
        <Card className="md:col-span-1">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <Scissors className="h-5 w-5 text-rose-500" />
                        Gestion de Servicios
                    </CardTitle>
                </div>
                <CardDescription>Administra tus servicios y horarios</CardDescription>
            </CardHeader>

            <CardContent className="px-0">
                <div className="px-6 pb-4">
                    <div className="flex gap-2">
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

                        <Button size="icon" onClick={() => setCreateModalOpen(true)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Servicios actualmente activos: {Services.length}</p>
                </div>

                <ul className="space-y-0 ">
                    {
                        filteredServices.map((service, i) => (
                            <li 
                                className='flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors border-t'
                                key={i}
                            >
                                <div>
                                    <p className="font-medium">{service.title}</p>
                                    <p className="text-xs text-slate-500">{service.description}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge variant="outline" className="bg-slate-50 text-slate-700">
                                            ${service.price}
                                        </Badge>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {service.service_duration}{" "}min
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        size="icon" variant="ghost" 
                                        className="h-8 w-8 text-slate-500"
                                        //onClick={() => openDeleteDialog(service)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>

                        ))
                    }

                </ul>
            </CardContent>
        </Card>
    )
}

export default ServiceManagment
