import React, { startTransition, useActionState, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, Camera, ImageIcon, X, Loader2, Cloud } from 'lucide-react'
import { Description } from '@radix-ui/react-dialog'



const CloudinaryDialog: React.FC = () => {
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const HandleIsOpen = () => {
        setIsOpen(!isOpen)
    }
 
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setImageFiles(prev => [...prev, ...files])
        setImagePreviews(prev => [...prev, ...newPreviews])

        //  Reset input para poder subir el mismo archivos
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }


    
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`

    const UPLOAD_PRESET = "public_upload"; // preset UNSIGNED creado en Cloudinary

    const [cloudinaryUploadErr, cloudinaryUploadAction, iscloudinaryUploadPending] = useActionState(
        async (_: string | null, img: File[] | []) => {
            try {
                console.log(url)
                for (let i = 0; i < img.length; i++) {
                    formData.append("file", img[i]);
                }
                formData.append("upload_preset", UPLOAD_PRESET);
                formData.append("cloud_name", `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`);

                await fetch(url, {
                    method: "POST",
                    body: formData
                })

                HandleIsOpen()

                return null;
            } catch (error: any) {
                return error?.response?.data || "Error de autenticación";
            }
        },
        null
    );
    const formData = new FormData();


    // Manejar Uploader de cloudinary
    const startUploadTransition = () => {
        startTransition(() => {
            cloudinaryUploadAction(imageFiles);
        });
    };


    return (
        <Dialog open={isOpen} onOpenChange={HandleIsOpen}>
            <DialogTrigger asChild>
                <Button

                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50"
                >
                    <Cloud/>
                    Cloud
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <Camera className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold text-white">Subir Imágenes</DialogTitle>
                            <Description className="text-gray-400">Selecciona y carga imágenes</Description>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Upload Area */}
                    <Card className="border-2 border-dashed border-gray-700 hover:border-rose-500/50 transition-colors">
                        <div className="p-8 relative">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Arrastra y suelta tus imágenes aquí</p>
                                    <p className="text-gray-400 text-sm">o haz clic para seleccionar archivos</p>
                                    <p className="text-gray-500 text-xs mt-2">PNG, JPG, WEBP hasta 10MB cada una</p>
                                </div>
                            </div>
                            <input
                                ref={inputRef} // 👈 vinculado a la referencia
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </Card>

                    {/* Image List */}
                    {imagePreviews.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg font-semibold text-white">Archivos seleccionados ({imageFiles.length})</h3>
                                <ul className="grid grid-cols-2 gap-4">
                                    {imageFiles.map((file, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg relative overflow-hidden"
                                        >
                                            <img
                                                src={imagePreviews[index]}
                                                alt={file.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />

                                            <div className="flex-1">
                                                <p className="text-white font-medium">{file.name}</p>
                                                <p className="text-gray-400 text-sm">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>

                                            <Button
                                                size="icon"
                                                type="button"
                                                className="text-gray-400 hover:text-white flex-shrink-0 bg-transparent hover:bg-transparent"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-zinc-100">Aún no hay archivos seleccionados</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={startUploadTransition}
                        disabled={imagePreviews.length === 0 || iscloudinaryUploadPending}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50"
                    >
                        {iscloudinaryUploadPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Subir {imagePreviews.length} imagen{imagePreviews.length !== 1 ? 'es' : ''}
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CloudinaryDialog
