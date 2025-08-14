import SuccessAlert from '@/components/alerts/SuccessAlert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ImageIcon, Loader2, Upload, X } from 'lucide-react'
import React, { startTransition, useActionState, useRef, useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa6'
import { UploadImg } from '../../services/cloudinary'

type UploadPictureProps = {
  onClose: () => void
  open: boolean
}

const UploadPictureToCloud: React.FC<UploadPictureProps> = ({ onClose, open }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPreviews = files.map(file => URL.createObjectURL(file))

    setImageFiles(prev => [...prev, ...files])
    setImagePreviews(prev => [...prev, ...newPreviews])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const truncateFileName = (name: string, maxLength = 30) => {
    if (name.length <= maxLength) return name
    const extIndex = name.lastIndexOf('.')
    const extension = extIndex !== -1 ? name.slice(extIndex) : ''
    const baseName = name.slice(0, maxLength - extension.length - 3)
    return `${baseName}...${extension}`
  }


  const formData = new FormData()

  const [_, cloudinaryUploadAction, iscloudinaryUploadPending] = useActionState(
    async (_: string | null, img: File[] | []) => {
      try {
        for (let i = 0; i < img.length; i++) {
          formData.append('file', img[i])
        }

        const res = await UploadImg(formData)
       
        if (res) {
          setImagePreviews([])
          setShowAlert(true)
        }

        return null
      } catch (error: any) {
        console.log(error)
        return error?.response?.data || 'Algo no fue bien subiendo imágenes'
      }
    },
    null
  )

  const startUploadTransition = () => {
    startTransition(() => {
      cloudinaryUploadAction(imageFiles)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className=" 
            2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
            xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
            lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
            md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
            max-w-full max-h-full
            w-full h-full 
            p-6 flex flex-col bg-zinc-50 z-50 md:rounded-3xl
            shadow-2xl slide-in-right overflow-hidden"
        style={{ animation: 'slide-in 0.3s ease-out' }}
      >
        {/* Header */}
        <DialogHeader className="mb-6 pt-4">
          <div className="flex items-start flex-col gap-3">
            
            <div className="flex items-center gap-4 mb-6">
              <button
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                onClick={onClose}
              >
                <FaArrowLeft size={18} className="text-zinc-700" />
              </button>
              <h1 className="text-lg font-semibold text-zinc-700">
                Subir imagen
              </h1>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-zinc-900 rounded-xl text-white">
                <BsCloudUpload size={24} />
              </div>
              <div>
                <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                  Carga tus mejores fotos
                </DialogTitle>
                <DialogDescription className="text-start">
                  Sube imágenes que puedas usar luego para tus publicaciones. Cortes, estilos o promociones: dale vida visual a tu barbería.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <main className="flex-1 flex flex-col space-y-6 px-1 overflow-y-auto">
          <section className="space-y-1">
            <h2 className="text-zinc-800 font-medium">Carga tus imágenes</h2>
            <p className="text-sm text-zinc-500">
              Las imágenes que subas estarán disponibles al momento de crear un post.
            </p>
          </section>

          <SuccessAlert
            message="¡Imagen subida exitosamente!"
            show={showAlert}
            onClose={() => setShowAlert(false)}
          />

          <Card className="border-2 border-dashed border-zinc-300 hover:border-rose-300 transition bg-transparent">
            <div className="p-8 relative text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-7 h-7 text-zinc-400" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-700 font-medium">Arrastra y suelta tus imágenes aquí</p>
                <p className="text-sm text-zinc-500">o haz clic para seleccionar archivos</p>
                <p className="text-xs text-zinc-400 mt-1">PNG, JPG, WEBP - máx. 10MB por archivo</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </Card>

          {imagePreviews.length > 0 ? (
            <section className="space-y-2 pt-4 max-h-[350px] lg:max-h-[450px] overflow-y-auto">
              <h3 className="text-zinc-700 font-medium text-base">
                Archivos seleccionados ({imageFiles.length})
              </h3>
              <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {imageFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 p-3 bg-zinc-100 rounded-md"
                  >
                    <img
                      src={imagePreviews[index]}
                      alt={file.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-700 truncate">
                        {truncateFileName(file.name, 20)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      size="icon"
                      type="button"
                      className="text-zinc-500 hover:text-red-500 bg-transparent hover:bg-transparent"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <div className="text-center text-sm text-zinc-400">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ImageIcon className="w-6 h-6 text-zinc-400" />
              </div>
              Aún no has seleccionado archivos
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-zinc-700 hover:text-zinc-900"
          >
            Cerrar
          </Button>

          <Button
            onClick={startUploadTransition}
            disabled={imagePreviews.length === 0 || iscloudinaryUploadPending}
            className="text-zinc-50 hover:text-zinc-200"
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
        </footer>
      </DialogContent>
    </Dialog>
  )
}

export default UploadPictureToCloud