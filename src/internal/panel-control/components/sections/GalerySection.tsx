import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Plus } from 'lucide-react'
import React from 'react'
import CloudinaryDialog from '../dialogs/CloudinaryDialog'
import AddGalleryPostDialog from '../dialogs/AddGalleryPostDialog'

const GalerySection: React.FC = () => {
    return (
        <Card className="bg-gray-900/50 border-gray-800 xl:col-span-2 w-full">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    {/* Header */}
                    <div className="flex items-start sm:items-center gap-3 text-start">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <Camera className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Galería de la Barbería</h2>
                            <p className="text-gray-400 text-sm">Gestiona las imágenes de tu negocio</p>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        {/* Formulario para subir imagenes al cloud */}
                        <CloudinaryDialog />

                        <AddGalleryPostDialog/>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h3 className="text-blue-400 font-medium mb-2">💡 Cómo funciona</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                        <p>
                            <strong>1.</strong> Haz clic en "Cloud" para seleccionar y subir nuevas fotos
                        </p>
                        <p>
                            <strong>2.</strong> Las imágenes se suben automáticamente a Cloudinary
                        </p>
                        <p>
                            <strong>3.</strong> Completa la información y se agregarán a tu galería
                        </p>
                    </div>
                </div>
            </div>

        </Card>
    )
}

export default GalerySection
