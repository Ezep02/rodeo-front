import { useEffect, useState } from 'react'
import { PromotionList } from '../services/shop_service'
import { Product } from '../model/Product'

const usePromotion = () => {

    // PROMOCIONES
    const [promotionList, setPromotionList] = useState<Product[] | []>([])
    useEffect(() => {
        const FetchPromotion = async () => {
            try {
                const res = await PromotionList()
                if (res.promotion) {
                    setPromotionList(res.promotion)
                }
            } catch (error) {
                console.warn("Product shop err", error)
            }
        }
        FetchPromotion()
    }, [])

    return {
        promotionList
    }

}

export default usePromotion
