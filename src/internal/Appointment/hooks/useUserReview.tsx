import { useContext, useEffect, useState } from "react"
import { GetCustomerReviewList } from "../services/reviews_service"
import { AuthContext } from "@/context/AuthContext"
import { Appointment } from "../models/Appointment"


const useUserReview = () => {
    const {
        user
    } = useContext(AuthContext)!

    // Reviews
    const [reviews, setReviews] = useState<Appointment[] | []>([])
    const [reviewOffset, setReviewOffset] = useState<number>(0)

    // Activar loader
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Cargar reviews de los usuarios
    const MoveReviewOffset = () => {
        setReviewOffset((prev) => prev + 1)
    }

    useEffect(() => {

        const FetchUserReview = async () => {
            if (!user?.ID) return null

            try {
                let userReview = await GetCustomerReviewList(user.ID, reviewOffset)
                if (userReview) {
                    setReviews(userReview.reviews)
                }

            } catch (error) {
                console.warn("Error obteniendo reviews")
            }
        }

        FetchUserReview()
    }, [])


    return {
        reviews,
        isLoading,
        MoveReviewOffset,
        setIsLoading
    }
}

export default useUserReview
