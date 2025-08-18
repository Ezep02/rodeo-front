import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import UploadPictureToCloud from '../dialogs/UploadPictureToCloud'
import { IoMdCloudOutline } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";

const CloudManager: React.FC = () => {
    const [isUploadPictureOpen, setUploadPictureOpen] = useState(false)

    const toggleUploadDialog = () => {
        setUploadPictureOpen(prev => !prev)
    }

    return (
        <section className="w-full py-7">
            <header className="flex items-start gap-3 flex-wrap justify-between">

                <div className='flex gap-3'>
                    <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
                        <IoMdCloudOutline size={24} className="text-white" />
                    </div>
                    <div>
                        <h5 className="text-gray-800 text-sm font-semibold">Gestión de archivo</h5>
                        <p className="text-gray-500 text-sm">Subí y organizá tus imágenes</p>
                    </div>
                </div>

                <div className=''>
                    <Button
                        size="sm"
                        onClick={toggleUploadDialog}
                        className="bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                        <HiOutlineUpload className="w-4 h-4 mr-2" />
                        Subir Archivo
                    </Button>
                </div>
            </header>

            {/* CARGAR IMAGEN AL CLOUD */}
            <UploadPictureToCloud
                open={isUploadPictureOpen}
                onClose={toggleUploadDialog}
            />
        </section>
    )
}

export default CloudManager
