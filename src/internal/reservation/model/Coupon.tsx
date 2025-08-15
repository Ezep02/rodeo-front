export type Coupon = {
    id: number
    code: string
    user_id: number
    discount_percentage: number
    is_available: boolean
    created_at: Date
    expire_at: Date
}