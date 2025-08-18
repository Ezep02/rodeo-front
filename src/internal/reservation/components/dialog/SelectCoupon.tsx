import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Coupon } from '../../model/Coupon'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { FaArrowLeft } from 'react-icons/fa6'
import { TbTags } from 'react-icons/tb'
import { BiCopy } from 'react-icons/bi'

type Props = {
    couponList: Coupon[]
    selectCoupon: (coupon: Coupon) => void
}

const SelectCoupon: React.FC<Props> = ({ couponList, selectCoupon }) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const onClose = () => {
        setOpen((prev) => !prev)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogTrigger asChild>
                <Button>
                    Ver
                </Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-lg max-w-sm p-6 rounded-3xl shadow-2xl bg-white">
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
                                Cupones
                            </h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <TbTags size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold text-zinc-700">
                                    Cupones disponibles
                                </DialogTitle>
                                <DialogDescription>
                                    Selecciona un cupón activo para aplicarlo a tu compra y obtener un descuento.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>


                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {couponList.length > 0 ? (
                        couponList.map((coupon) => (
                            <div
                                key={coupon.id}
                                className="flex items-center justify-between bg-zinc-100 rounded-xl px-4 py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="text-sm text-zinc-800 font-medium">{coupon.code}</div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => selectCoupon(coupon)}
                                    >
                                        <BiCopy className="w-4 h-4" />
                                        Seleccionar
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-zinc-500 text-center py-4">
                            No hay categorías activas.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default SelectCoupon
