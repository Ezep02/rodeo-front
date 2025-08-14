import { useEffect, useState } from "react";
import { ProductList } from "../../reservation/services/shop_service";
import { Product } from "../model/Product";


export const useProductShop = () => {

    const [serviceList, setServiceList] = useState<Product[] | []>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Cargar inicial de productos
    useEffect(() => {

        const FetchProducts = async () => {
            setIsLoading(true)
            try {
                const res = await ProductList()
                if (res.products) {
                    setServiceList(res.products)
                }
            } catch (error) {
                console.warn("Product shop err", error)
            }

            setIsLoading(false)
        }   
        FetchProducts()
    }, [])

    return {
        serviceList,
        isLoading
    }
}