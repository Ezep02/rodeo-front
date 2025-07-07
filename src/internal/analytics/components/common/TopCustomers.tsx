import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"
import { FrequentCustomer } from "../../models/analyticsModels"

type TopCustomersTabProps = {
    TableData: FrequentCustomer[] | []
}

const TopCustomersTab: React.FC<TopCustomersTabProps> = ({ TableData }) => {
    return (
        <Tabs defaultValue="Clientes principales">
            <TabsList className="grid w-[300px] grid-cols-2">
                <TabsTrigger value="Clientes principales">Clientes principales</TabsTrigger>
                <TabsTrigger value="Barberos">Barberos</TabsTrigger>
            </TabsList>

            <TabsContent value="Clientes principales">
                <Card>
                    <CardHeader>
                        <CardTitle>Clientes principales</CardTitle>
                        <CardDescription>
                            Clientes con mayor gasto y frecuencia
                        </CardDescription>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Clientes</TableHead>
                                <TableHead>Visitas</TableHead>
                                <TableHead>Total abonado</TableHead>
                                <TableHead>Ultima visita</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {TableData.map((customer, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{customer.Customer_name}{" "}{customer.Customer_surname}</TableCell>
                                    <TableCell>{customer.Visits_count}</TableCell>
                                    <TableCell>${customer.Total_spent}</TableCell>
                                    <TableCell className="">
                                        {new Date(customer.Last_visit).toLocaleDateString("es-AR", { day: "numeric", month: "numeric", year: "numeric" })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>

            <TabsContent value="Barberos">
                <Card>
                    <CardHeader>
                        <CardTitle>Barberos</CardTitle>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">

                        </div>
                        <div className="space-y-1">

                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default TopCustomersTab