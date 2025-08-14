import { useProductShop } from '@/internal/reservation/hooks/useProduct'
import { Product } from '@/internal/reservation/model/Product'
import React from 'react'
import ServiceCard from '../card/ServiceCard'
import { Loader2 } from 'lucide-react'

type Props = {
    onClickAction: (service: Product) => void
}

const ProductSection: React.FC<Props> = ({ onClickAction }) => {
    const {
        serviceList,
        isLoading
    } = useProductShop()

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {
                isLoading ? (
                    <div className="min-h-[40vh] flex justify-center items-center py-4 md:col-span-2 col-span-1">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                ) : (
                    <>
                        {serviceList?.map((product, i) => (
                            <ServiceCard
                                key={i}
                                onClick={onClickAction}
                                product={product}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ProductSection

