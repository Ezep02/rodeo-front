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
    Weak_day: string;
    Schedule: string;
    Date: Date
    Shift_id: number
};

export interface ServiceOrderRequest {

    Title: string;
    Description: string;
    Price: number;
    Created_by_id: number;
    Service_duration: number;
    Service_id:number;
    Weak_day: string;
    Date: Date;
    Barber_id: number;
    Schedule: string
    Shift_id: number
}


// type ServiceOrder struct {
// 	ID               int     `json:"ID"`
// 	Title            string  `json:"title"`
// 	Description      string  `json:"description"`
// 	Price            float64 `json:"price"`
// 	Created_by_id    int
// 	Service_Duration int `json:"service_duration"`
// }