export type ExpenseRequest = {
    title: string;
    amount: number;
    description?: string;
}


export type Expense= {
    ID: number;
    title: string;
    amount: number;
    description?: string;
    Created_by_name: string;
    CreatedAt: Date;
    UpdatedAt: Date;
};
  