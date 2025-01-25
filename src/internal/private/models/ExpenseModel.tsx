export type ExpenseRequest = {
    title: string;
    amount: number;
    despcription?: string;
}

export type Expense= {
    ID: number;
    title: string;
    amount: number;
    despcription?: string;
    created_by_name: string;
    created_at: Date;
    updated_at: Date;
};
  