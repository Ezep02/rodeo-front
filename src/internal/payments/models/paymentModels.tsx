export type PaymentRequest = {
    token: string
}

export type PaymentResponse = {
	ID: number;
    title: string
	payer_name: string
	payer_surname: string
	barber_id: number
	user_id: number
	schedule_day_date: Date
	price: number
	schedule_start_time: string
	Created_at?: Date
	Updated_at?: Date
	Deleted_at?: Date
}