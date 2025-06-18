export interface RefundResponse {
    ID: number
    title: string
    schedule_day_date: Date
    shift_id: number
    schedule_start_time: string
    transaction_type: string
    refunded_order_id: number
}
