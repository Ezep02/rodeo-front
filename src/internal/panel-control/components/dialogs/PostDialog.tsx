import React, { startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import CloudImgSelector from './CloudImgSelector'
import { CloudinaryImage } from '../../models/Cloudinary'
import useCloudinary from '../../hooks/useCloudinary'
import { Create } from '../../services/post'
import { Post } from '../../models/Post'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { TbLayersUnion } from "react-icons/tb";
import PostPreviewCard from '../cards/PostCardPreview'
import { Loader, Upload } from 'lucide-react'
import ErrorAlert from '@/components/alerts/ErrorAlert'

type FormValues = {
    title: string
    description: string
}

type Props = {
    onClose: () => void
    open: boolean
    mode?: 'create' | 'edit'
    initialData?: Post
    onEditSubmit?: (updatedPost: Post) => Promise<void>

}

const PostDialog: React.FC<Props> = ({
    onClose,
    mode = 'create',
    initialData,
    onEditSubmit,
    open
}) => {
    const isEditMode = mode === 'edit'

    const {
        register,
        handleSubmit,
        watch,
        reset,
    } = useForm<FormValues>()

    const {
        cloudImgGallery,
        FetchMoreImg,
        cloudNextCursor
    } = useCloudinary()

    const [showAlert, setShowAlert] = useState(false)
    const [isImgSelectorOpen, setOpenImgSelector] = useState(false)
    const [selectedImg, setSelectedImg] = useState<CloudinaryImage>()

    useEffect(() => {
        if (isEditMode && initialData) {
            reset({
                title: initialData.title,
                description: initialData.description,
            })
            if (initialData.preview_url) {
                setSelectedImg({ secure_url: initialData.preview_url } as CloudinaryImage)
            }
        }
    }, [isEditMode, initialData, reset])

    const handleToggleImgSelector = () => setOpenImgSelector(prev => !prev)
    const handleSelectImg = (image: CloudinaryImage) => {
        setSelectedImg(image)
        setOpenImgSelector(false)
    }

    const title = watch('title')
    const content = watch('description')

    const [postErrorMsg, submitPostAction, isPending] = useActionState(
        async (_state: void | null, data: FormValues) => {
            if (!selectedImg?.secure_url) {
                console.warn("Debe seleccionar una imagen.");
                return;
            }

            const postPayload: Omit<Post, 'id' | 'user_id' | "created_at" | "updated_at" | "is_published"> = {
                title: data.title,
                description: data.description,
                preview_url: selectedImg.secure_url,
            }

            try {
                if (isEditMode && initialData && onEditSubmit) {
                    await onEditSubmit({ ...initialData, ...postPayload })
                } else {
                    const res = await Create(postPayload)
                    if (res) {
                        setShowAlert(true)
                        reset()
                        setSelectedImg(undefined)
                    }
                }
            } catch (error: any) {
                setShowAlert(true)
                return error?.response?.data?.error || "Error creando el post";
            }
        },
        undefined
    )

    const startSubmitTransition = (formData: FormValues) => {
        startTransition(() => {
            submitPostAction(formData)
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
                        shadow-2xl slide-in-right overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta"
                style={{ animation: 'slide-in 0.3s ease-out' }}
            >

                <DialogHeader className="mb-6 pt-2">
                    <div className="flex items-start flex-col gap-3">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={onClose}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">
                                {isEditMode ? 'Editar post' : 'Nuevo post'}
                            </h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <TbLayersUnion size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                                    Comparte con los clientes
                                </DialogTitle>
                                <DialogDescription className="text-start">
                                    Agrega imágenes, crea descripciones llamativas y publica contenido. Ideal para mostrar cortes, logros y novedades.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <ErrorAlert
                    message={postErrorMsg}
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                />

                {isImgSelectorOpen ? (
                    <CloudImgSelector
                        img={cloudImgGallery}
                        onClose={handleToggleImgSelector}
                        onSelect={handleSelectImg}
                        fetchMoreImg={FetchMoreImg}
                        nextCursor={cloudNextCursor}
                    />
                ) : (
                    < form onSubmit={handleSubmit(startSubmitTransition)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* LADO IZQUIERDO */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium text-zinc-700">Título</label>
                                    <input
                                        {...register('title', { required: true })}
                                        placeholder="Título del post"
                                        className="w-full p-3 border border-zinc-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-zinc-700">Descripción</label>
                                    <textarea
                                        {...register('description', { required: true })}
                                        placeholder="Escribe el contenido..."
                                        className="w-full p-3 border border-zinc-300 rounded-md resize-none min-h-[120px]"
                                    />
                                </div>
                            </div>

                            {/* LADO DERECHO */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium text-zinc-700">Imagen del post</label>
                                    <p className="text-sm text-zinc-500 mb-2">Selecciona la imagen que se mostrará en la publicación</p>
                                </div>

                                <div className="rounded-lg border border-zinc-200 p-4 space-y-4">
                                    {selectedImg ? (
                                        <>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={selectedImg.secure_url}
                                                    alt="Seleccionada"
                                                    className="w-28 h-20 object-cover rounded-md border"
                                                />
                                                <Button size="sm" onClick={() => setOpenImgSelector(true)}>Cambiar imagen</Button>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-semibold text-zinc-500 mb-2">Vista previa del post:</h4>
                                                <PostPreviewCard
                                                    title={title}
                                                    description={content}
                                                    imageUrl={selectedImg.secure_url}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-zinc-500">No hay imagen seleccionada</span>
                                            <Button onClick={() => setOpenImgSelector(true)} size="sm">Agregar imagen</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                            <Button type="submit">
                                {isEditMode ? (
                                    isImgSelectorOpen ? 'Guardando...' : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Guardar cambios
                                        </>
                                    )
                                ) : (
                                    <>
                                        {
                                            isPending ? (
                                                <div>
                                                    <Loader />
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Publicar post
                                                </>
                                            )
                                        }
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                )}
            </DialogContent>
        </Dialog >
    )
}

export default PostDialog
