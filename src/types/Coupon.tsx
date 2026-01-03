export interface Coupon {
 id:number
 code:string
 user_id: number
 original_amount:number
 remaining_amount:number
 origin_type: OriginCouponType
 origin_reference_id: number
 status: CouponStatus
 created_at: Date
 expire_at: Date
}

export type OriginCouponType = "cancelation" | "promo" | "manual"
export type CouponStatus = "active" | "exhausted" | "expired" | "blocked"