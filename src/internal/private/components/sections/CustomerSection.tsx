import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, User } from 'lucide-react'
import React from 'react'
import { FrequentCustomer } from '../../models/analyticsModels'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { TbUsers } from 'react-icons/tb'

type CustomerSectionProps = {
    frequentCustomersList: FrequentCustomer[] | []
}

const CustomerSection: React.FC<CustomerSectionProps> = ({ frequentCustomersList }) => {
    return (
        <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <TbUsers className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="">
                            <CardTitle className="sm:text-xl text-sm font-bold text-white">Análisis de Rendimiento</CardTitle>
                            <CardDescription className='text-gray-400 text-sm'>Top 10 clientes con mayor gasto y frecuencia</CardDescription>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </div>


            </CardHeader>
            {
                Array.isArray(frequentCustomersList) && frequentCustomersList.length > 0 ? (
                    <div className="p-6">

                        {/* Search and Actions */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar cliente..."
                                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Cliente</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Visitas</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Total abonado</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Última visita</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {frequentCustomersList.map((customer, i) => (
                                        <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8 border border-gray-700">
                                                        <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
                                                            <User className="w-4 h-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-white font-medium">{customer.Customer_name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                                    {customer.Visits_count}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-green-500 font-semibold">${customer.Total_spent}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-gray-300">
                                                    {new Date(customer.Last_visit).toLocaleDateString("es-AR", {
                                                        day: "numeric",
                                                        month: "numeric",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <CardFooter className='pt-3'>
                            <p className="text-gray-400 text-sm">Mostrando {frequentCustomersList.length} de 10 clientes</p>
                        </CardFooter>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full p-6">
                        <p className="text-sm font-medium text-slate-500">
                            Sin datos para mostrar
                        </p>
                    </div>
                )
            }
        </Card>
    )
}

export default CustomerSection
