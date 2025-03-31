// Order representa los datos de un pedido
export interface PendingOrder {
    ID: number;
    Title: string;
    Payer_name: string;
    Payer_surname: string;
    Barber_id: number;
    Schedule_day_date: Date;
    Schedule_start_time: string;
    Status: string,
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: null;
}
