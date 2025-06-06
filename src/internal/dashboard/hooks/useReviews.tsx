import { useEffect, useState } from "react"
import { GetCustomerReviews } from "../services/Reviews"
import { CustomerReviews } from "../models/Reviews"




const useReviews = () => {

    const [offsetReviews, setOffsetReviews] = useState<number>(0)

    const [customerReviews, setCustomerReviews] = useState<CustomerReviews[] | []>([])

    // Offset de reviews
    const HandleCustomerReviewsOffset = () => {
        setOffsetReviews((prev) => prev+5)
    }

    // Obtener las reviews, max 5
    useEffect(() => {

        const FetchReviews = async () => {
            let reviewsResponse = await GetCustomerReviews(offsetReviews)

            if(reviewsResponse){
                setCustomerReviews(reviewsResponse)
                HandleCustomerReviewsOffset()
                console.log(reviewsResponse)
            }
        }

        FetchReviews()

    }, [])


    return {
        customerReviews,
        setOffsetReviews
    }
}

export default useReviews
