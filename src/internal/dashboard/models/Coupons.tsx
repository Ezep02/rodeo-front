// Coupon

export interface Coupon {
    code: string
    user_id: number
    discount_percent: Float64Array
    available: boolean
    used: boolean
    created_at: Date
    available_to_date: Date
    used_at: Date
    coupon_type: string
}


// export interface Coupon {
//     Code: string
//     UserID: number
//     discount_percent: Float64Array
//     Available: boolean
//     used: boolean
//     createdAt: Date
//     AvailableToDate: Date
//     UsedAt: Date
//     Coupon_type: string
// }


