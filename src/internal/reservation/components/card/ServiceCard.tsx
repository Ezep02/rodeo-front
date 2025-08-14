import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import { Product } from '../../model/Product'
import { TbTags } from 'react-icons/tb'
import { DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GoArrowUpRight } from 'react-icons/go'

type CardProps = {
    product: Product
    onClick: (product: Product) => void
}

const ServiceCard: React.FC<CardProps> = ({ product, onClick }) => {
    return (
        <div className="flex flex-wrap md:flex-nowrap border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
            {/* Left preview image area as background */}
            <div className="w-44 h-auto  md:h-auto flex items-center justify-center bg-gray-100">
                {product.preview_url ? (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.preview_url})` }}
                    />
                ) : (
                    <GiBullHorns size={40} className="text-gray-400" />
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-xs text-gray-600">{product.description || "Sin descripción"}</p>

                    <div className="flex items-center gap-1 text-xs mt-1">
                        <TbTags className="w-4 h-4 text-gray-400" />
                        <span
                            className="px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: product.category?.color || "#aaa" }}
                        >
                            {product.category?.name || "Sin categoría"}
                        </span>
                    </div>

                    <div className="flex flex-col text-green-600 font-semibold text-sm gap-2">
                        <div className="flex flex-col gap-1">
                            {product.promotion_discount && product.promotion_discount > 0 ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 line-through flex items-center font-semibold gap-0.5">
                                            <DollarSign className="w-4 h-4" />
                                            {product.price}
                                        </span>
                                        <span className="flex items-center text-green-600 font-semibold text-lg gap-1">
                                            <DollarSign className="w-5 h-5" />
                                            {(product.price * (1 - product.promotion_discount / 100)).toFixed(2)}
                                        </span>
                                    </div>

                                    <p className="text-xs text-emerald-600 font-semibold mt-1">
                                        Ahorra un {product.promotion_discount}%
                                    </p>
                                </>
                            ) : (
                                <span className="flex items-center gap-1 text-lg">
                                    <DollarSign className="w-5 h-5" />
                                    {product.price}
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-2 mt-2">
                    <Button
                        size="sm"
                        variant="default"
                        onClick={() => onClick(product)}
                        className='w-full'
                    >
                        <GoArrowUpRight className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        Reservar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
