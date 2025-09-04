import { useEffect, useState } from "react"
import { ReviewDetail } from "../models/Review"
import { GetAppointmentReview } from "../services/review_service"

const useReview = () => {

    const [review, setReview] = useState<ReviewDetail[]>([])

    useEffect(() => {

        const fetchReview = async () => {

            try {
                let res = await GetAppointmentReview()
                if (res) {
                    console.info("[REVIEWS]", res)
                    setReview(res.review)
                }
            } catch (error) {
                console.warn("Algo no fue bien recuperando las reviews")
            }
        }
        fetchReview()
    }, [])

    return {
        review
    }
}

export default useReview
