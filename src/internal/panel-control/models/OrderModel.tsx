// Order representa los datos de un pedido
export interface PendingOrder {
    ID: number;
    title: string;
    payer_name: string;
    payer_surname: string;
    barber_id: number;
    schedule_day_date: Date;
    schedule_start_time: string;
    mp_status: string,
    shift_id: number,
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null;
}
