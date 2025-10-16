import { useEffect, useState } from "react"
import { GetPopularProduct } from "../services/popular_product"
import { PopularProduct } from "../models/PopularProduct"


const usePopular = () => {

    const [popularProduct, setPopularProduct] = useState<PopularProduct[]>([])

    useEffect(() => {

        const fetchInformation = async () => {

            try {
                let res = await GetPopularProduct()
                if (Array.isArray(res.popular)) {
                    setPopularProduct(res.popular)
                }
            } catch (error) {
                console.warn("ERROR recuperando informacion")
            }
        }

        fetchInformation()
    }, [])

    return {
        popularProduct
    }
}

export default usePopular
