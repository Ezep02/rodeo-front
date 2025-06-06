

export type ReviewRequest = {
    Schedule_id: number
    Order_id: number
    Comment: string
    Rating: number
}

export type CustomerReviews = {
    schedule_id: number
    order_id: number
    comment: string
    rating: number
    user_id:number
    title: string
    schedule_day_date: Date
    schedule_start_time: string
    payer_name:string
    payer_surname:string
    CreatedAt: Date
}