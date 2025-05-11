// Order representa los datos de un pedido
export interface Order {
    ID: number;
    Title: string;
    Price: string;
    Service_Duration: number;
    User_id: number;
    Service_id: string;
    Payment_id: number;
    Payer_name: string;
    Payer_surname: string;
    Email: string;
    Payer_phone: string;
    Mp_order_id: number;
    Date_approved: string;
    Mp_status: string;
    Mp_status_detail: string;
    Schedule_start_time: string
    Schedule_day_date: Date;
    Shift_id: number
};

export interface ServiceOrderRequest {
    User_id: number;
    Payer_name: string;
    Payer_surname: string;
    Payer_email: string;
    Payer_phone_number: string;
    Barber_id: number;
    Created_by_id: number;
    Description: string;
    Price: number;
    Service_duration: number;
    Service_id: number;
    Title: string;
    Schedule_start_time: string
    Schedule_day_date: Date;
    Shift_id: number
}

export interface CustomerPendingOrder {
    ID: number;
    title: string;
    shift_id: number;
    schedule_start_time: string
    schedule_day_date: Date;
    UpdatedAt?: string;
    CreatedAt?: string;
    DeletedAt?: null;
}

// Rescheduling
export interface RescheduleRequest {
    old_schedule_id: number
    order_id: number
    shift_id: number
    barber_id: number
    service_title: string
    start_time: string
    schedule_day_date: Date
}

export interface UpdatedCustomerPendingOrder {
	ID: number
	title:string
	schedule_day_date: Date
	schedule_start_time:string
}
