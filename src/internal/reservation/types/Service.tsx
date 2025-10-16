export type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    preview_url: string;
    promotion_discount?: number
    promotion_end_date?: Date
};

export type Category = {
    id?: number
    name: string
    color: string
    created_at?: Date
    updated_at?: Date
}