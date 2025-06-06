import React from "react";

import { useAnalytics } from "../hooks/useAnalytics";

import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Download, Filter, MoreHorizontal, PlusCircle, Scissors, Search, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs} from "@/components/ui/tabs";
import { PieChart, LineChart } from "@/components/charts/charts";
import StatCard from "../components/common/StatsCard";
import PopularServiceCard from "../components/common/PopularServiceCard";
import CustomerItem from "../components/common/CustomerItem";

const PrivatePage: React.FC = () => {

  const {
    monthlyAppointmens,
    monthlyNewCustomers,
    monthlyRevenue,
    currentYearMonthlyRevenue,
    monthlyPopularServices,
    frequentCustomersList
  } = useAnalytics()


  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-slate-500 mt-1">Monitorea el rendimiento de la barbería</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="gap-2 bg-rose-500 hover:bg-rose-600">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          avg={monthlyRevenue?.Avg_compared_last_month ? monthlyRevenue?.Avg_compared_last_month : 0}
          text={`$${monthlyRevenue?.Total_month_revenue}`}
          title={"Ganancias totales"}
          icon={<DollarSign className="h-6 w-6 text-green-500" />}
        />

        <StatCard
          avg={monthlyAppointmens?.Avg_compared_last_month ? monthlyAppointmens?.Avg_compared_last_month : 0}
          text={`${monthlyAppointmens?.Total_month_appointments}`}
          title={"Reservas"}
          icon={<Calendar className="h-6 w-6 text-blue-500" />}
        />

        <StatCard
          avg={monthlyNewCustomers?.Avg_compared_last_month ? monthlyNewCustomers?.Avg_compared_last_month : 0}
          text={`${monthlyNewCustomers?.Total_month_new_users}`}
          title={"Nuevos Clientes"}
          icon={<Users className="h-6 w-6 text-amber-500" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Revenue Trend */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Tendencia de Ingresos</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Descargar datos</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Ingresos mensuales del año en curso</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              {
                currentYearMonthlyRevenue?.length > 0 ? (
                  <LineChart
                    Data={currentYearMonthlyRevenue}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-sm font-medium text-slate-500">
                      Sin datos para mostrar
                    </p>
                  </div>
                )
              }
            </div>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Servicios Populares</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3 w-3" />
                Filtrar
              </Button>
            </div>
            <CardDescription>Top servicios del mes</CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="space-y-4">
              {
                Array.isArray(monthlyPopularServices) && monthlyPopularServices.length > 0 ? (
                  <>
                    {
                      monthlyPopularServices.map((srv, indx) => {
                        const progressBarColors = ["bg-blue-500", "bg-rose-500", "bg-amber-500"]
                        const iconColors = ["text-blue-600", "text-rose-600", "text-amber-600"]
                        const iconBackground = ["bg-blue-100", "bg-rose-100", "bg-amber-100"]
                        return (
                          <PopularServiceCard
                            key={indx}
                            service_count={srv.Service_count}
                            service_name={srv.Service_name}
                            icon={
                              <div className={`h-9 w-9 rounded-full flex items-center justify-center ${iconBackground[indx]}`}>
                                <Scissors className={`h-5 w-5 ${iconColors[indx]}`} />
                              </div>}
                            progress_bar={<div className={`h-full rounded-full  ${progressBarColors[indx]}`} style={{ width: 50 - indx }}></div>}
                          />
                        )
                      })
                    }

                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-sm font-medium text-slate-500">
                      Sin datos para mostrar
                    </p>
                  </div>
                )
              }
            </div>

            <div className="mt-6">
              <div className="h-[150px] w-full">
                {

                  Array.isArray(monthlyPopularServices) && monthlyPopularServices.length > 0 ? (
                    <>
                      <PieChart
                        Data={monthlyPopularServices}
                      />
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-sm font-medium text-slate-500">
                        Sin datos para mostrar
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients and Barbers Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <Tabs defaultValue="clientes">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Análisis de Rendimiento</CardTitle>
            </div>
            <CardDescription>Clientes con mayor gasto y frecuencia</CardDescription>
          </Tabs>
        </CardHeader>

        <CardContent className="pt-4">

          <div className="flex gap-2 flex-wrap pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <input placeholder="Buscar cliente..." className="pl-8 p-2 rounded-md  border  placeholder-gray-400 text-sm" />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button size="sm" className="h-9 bg-rose-500 hover:bg-rose-600">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="hidden md:grid sm:grid-cols-5 bg-slate-50 p-3 text-sm font-medium text-slate-500">
              <div>Cliente</div>
              <div className="text-center">Visitas</div>
              <div className="text-center">Total abonado</div>
              <div className="text-center">Última visita</div>
              <div className="text-right">Acciones</div>
            </div>

            <div className="divide-y">

              {
                frequentCustomersList.map((customer, i) => (
                  <CustomerItem
                    key={i}
                    FrequentCustomer={customer}
                  />
                ))
              }

            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500">Mostrando 2 de 2 clientes</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PrivatePage;