import { useEffect, useState } from "react"
import { Appointment } from "../models/Review"
import { GetAppointmentReview } from "../services/review_service"

const useReview = () => {

    const [review, setReview] = useState<Appointment[]>([])

    useEffect(() => {

        const fetchReview = async () => {

            try {
                let res = await GetAppointmentReview()
                if (res) {
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
