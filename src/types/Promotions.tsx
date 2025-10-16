export type Promotion = {
  id: number;
  discount: number;
  type: "percentage" | "fixed";
  start_date?: string;
  end_date?: string;
};
