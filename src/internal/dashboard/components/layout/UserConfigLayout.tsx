
import Avatar from '@/components/common/Avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Tabs, TabsList } from '@radix-ui/react-tabs'
import { Bell, ChevronRight, CreditCard, Edit, Gift, Mail, MapPin, Phone, Scissors, Shield, User } from 'lucide-react'
import React, { useState } from 'react'

import { DiscountCard } from '../common/DiscountCard'

const UserConfigLayout: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState({
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@example.com",
        phone: "+52 123 456 7890",
        address: "Ciudad de México, México",
        joinDate: "Enero 2023",
    })

     const discounts = [
    {
      id: 1,
      title: "15% en tu próximo corte",
      code: "CORTE15",
      expiry: "30 Abr 2025",
      isUsed: false,
    },
    {
      id: 2,
      title: "Producto gratis en tu próxima visita",
      code: "REGALO22",
      expiry: "15 May 2025",
      isUsed: false,
    },
    {
      id: 3,
      title: "20% en tratamientos capilares",
      code: "TRAT20",
      expiry: "10 Mar 2025",
      isUsed: true,
    },
  ]

    return (
        <>
            <div className="flex items-center mb-6">

                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Mi Perfil
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Gestiona tu información personal y preferencias
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Profile Header Card */}
                <Card className="md:col-span-12 overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-r from-zinc-900 to-zinc-700">
                        <Button size="icon" variant="outline" className="absolute right-4 top-4 bg-background/80 backdrop-blur-sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between p-6 relative">
                            <div className="flex flex-col md:flex-row md:items-end gap-4">
                                <Avatar name='eze'>

                                </Avatar>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold">eze</h3>
                                    <p className="text-sm text-muted-foreground">Cliente desde Enero 2023</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? "Cancelar" : "Editar perfil"}
                                </Button>
                                {isEditing && <Button onClick={() => setIsEditing(false)}>Guardar cambios</Button>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="md:col-span-8 space-y-6">
                    {/* Personal Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5 text-muted-foreground" />
                                Información personal
                            </CardTitle>
                            <CardDescription>Tu información de contacto y detalles personales</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        < label htmlFor="name">Nombre completo</label >
                                        <input
                                            id="name"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="email">Correo electrónico</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="phone">Teléfono</label>
                                        <input
                                            id="phone"
                                            value={userData.phone}
                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="address">Dirección</label>
                                        <input
                                            id="address"
                                            value={userData.address}
                                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Nombre completo</p>
                                            <p className="font-medium">{userData.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Cliente desde</p>
                                            <p className="font-medium">{userData.joinDate}</p>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Email</p>
                                                <p className="font-medium">{userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Teléfono</p>
                                                <p className="font-medium">{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Dirección</p>
                                                <p className="font-medium">{userData.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-4 space-y-6">
                    {/* Membership Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                                Membresía
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-700 p-4 text-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs opacity-80">Nivel de membresía</p>
                                        <h3 className="text-lg font-bold">Premium</h3>
                                    </div>
                                    <div className="bg-white/20 rounded-full p-1.5">
                                        <Scissors className="h-4 w-4" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs opacity-80">Miembro desde</p>
                                    <p className="font-medium">Enero 2023</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs opacity-80">Puntos acumulados</p>
                                    <p className="text-xl font-bold">350</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Ver beneficios
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Discount Cards */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Gift className="mr-2 h-5 w-5 text-muted-foreground" />
                                Mis descuentos
                            </CardTitle>
                            <CardDescription>Descuentos y promociones disponibles</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {discounts.map((discount) => (
                                <DiscountCard
                                    key={discount.id}
                                    title={discount.title}
                                    code={discount.code}
                                    expiry={discount.expiry}
                                    isUsed={discount.isUsed}
                                />
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Ver todas las promociones
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Security Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
                                Seguridad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Contraseña</h3>
                                    <p className="text-sm text-muted-foreground">Actualizada hace 3 meses</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Cambiar
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Verificación en dos pasos</h3>
                                    <p className="text-sm text-muted-foreground">Desactivada</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Activar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default UserConfigLayout
