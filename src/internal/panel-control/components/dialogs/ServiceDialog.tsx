import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import CloudImgSelector from './CloudImgSelector'
import { Upload } from 'lucide-react'
import { Category } from '../../models/Category'
import { Product } from '../../models/ServicesModels'
import { CloudinaryImage } from '../../models/Cloudinary'
import useCloudinary from '../../hooks/useCloudinary'

type Props = {
  open: boolean
  onClose: () => void
  categories: Category[]
  onSubmit: (data: Omit<Product, 'id'>) => void
  initialData?: Product
  mode?: 'create' | 'edit'
  onEditSubmit?: (updatedService: Product) => Promise<void>
}

const ServiceDialog: React.FC<Props> = ({
  open,
  onClose,
  categories,
  onSubmit,
  initialData,
  mode = 'create',
  onEditSubmit
}) => {
  const isEditMode = mode === 'edit'

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<Product & {
    promotion_discount?: number
    promotion_end_date?: string
  }>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category_id: 0,
      preview_url: '',
      promotion_discount: undefined,
      promotion_end_date: undefined,
      has_promotion: initialData?.has_promotion
    }
  })

  const {
    cloudImgGallery,
    FetchMoreImg,
    cloudNextCursor
  } = useCloudinary()

  const [isImgSelectorOpen, setOpenImgSelector] = useState(false)
  const [selectedImg, setSelectedImg] = useState<CloudinaryImage>()
  const [hasPromotion, setHasPromotion] = useState(initialData?.has_promotion || false)

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category_id: initialData.category?.id ?? 0,
        preview_url: initialData.preview_url ?? '',
        promotion_discount: initialData.promotion_discount,
        promotion_end_date: initialData.promotion_end_date
          ? new Date(initialData.promotion_end_date).toISOString().split('T')[0]
          : '',
        has_promotion: initialData.has_promotion
      });

      setHasPromotion(initialData.has_promotion || false);

      if (initialData.preview_url) {
        setSelectedImg({ secure_url: initialData.preview_url } as CloudinaryImage);
      }
    }
  }, [initialData, reset]);


  const handleSelectImg = (img: CloudinaryImage) => {
    setSelectedImg(img)
    setOpenImgSelector(false)
  }

  const onFinalSubmit = (formData: Product & {
    promotion_discount?: number
    promotion_end_date?: string
  }) => {
    if (!selectedImg) return

    const productData: Omit<Product, 'id'> = {
      price: formData.price,
      name: formData.name,
      description: formData.description,
      category_id: formData.category_id,
      preview_url: selectedImg.secure_url,
      has_promotion: hasPromotion
    }


    if (hasPromotion) {
      productData.promotion_discount = formData.promotion_discount
      productData.promotion_end_date = formData.promotion_end_date
    }

    if (isEditMode && initialData) {
      if (onEditSubmit) {
        console.log(initialData)
        onEditSubmit({
          ...productData,
          id: initialData.id
        } as Product)
        return
      }
    }

    onSubmit(productData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
        xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
        lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
        md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
        max-w-full max-h-full
        w-full h-full 
        p-6 flex flex-col bg-zinc-50 md:rounded-3xl
        shadow-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-800">
            {isEditMode ? 'Editar Servicio' : 'Nuevo Servicio'}
          </DialogTitle>
          <DialogDescription>
            Completá la información del servicio que querés ofrecer.
          </DialogDescription>
        </DialogHeader>

        {isImgSelectorOpen ? (
          <CloudImgSelector
            img={cloudImgGallery}
            onClose={() => setOpenImgSelector(false)}
            onSelect={handleSelectImg}
            fetchMoreImg={FetchMoreImg}
            nextCursor={cloudNextCursor}
          />
        ) : (
          <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre</label>
                  <Input {...register('name', { required: true })} placeholder="Ej: Corte clásico" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Descripción</label>
                  <Textarea
                    {...register('description')}
                    placeholder="Descripción del servicio"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Precio</label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register('price', { required: true, valueAsNumber: true })}
                    placeholder="Ej: 2500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Categoría</label>
                  <select
                    {...register('category_id', { required: true, valueAsNumber: true })}
                    className="w-full p-2 border border-zinc-300 rounded-md text-sm"
                  >
                    <option defaultValue={initialData?.category?.name}>Seleccioná una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Checkbox de promoción */}
                <div className="pt-2 space-y-3">
                  <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={hasPromotion}
                      onChange={(e) => setHasPromotion(e.target.checked)}
                      className="w-4 h-4"
                    />

                    ¿Ofrecer promoción?
                  </label>

                  {hasPromotion && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Fecha hasta</label>
                        <Input
                          type="date"
                          {...register('promotion_end_date')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Descuento (%)</label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          defaultValue={initialData?.promotion_discount}
                          step="1"
                          {...register('promotion_discount', { valueAsNumber: true })}
                          placeholder="Ej: 20"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selector de imagen */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-zinc-700 mb-1">Imagen del servicio</label>
                <div className="border border-zinc-200 rounded-lg p-4 space-y-4">
                  {selectedImg ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedImg.secure_url}
                        alt="Vista previa"
                        className="w-28 h-20 object-cover rounded-md border"
                      />
                      <Button size="sm" onClick={() => setOpenImgSelector(true)}>
                        Cambiar imagen
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">No hay imagen seleccionada</span>
                      <Button size="sm" onClick={() => setOpenImgSelector(true)}>
                        Seleccionar imagen
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Upload className="w-4 h-4 mr-2" />
                {isEditMode ? 'Guardar cambios' : 'Crear servicio'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ServiceDialog
