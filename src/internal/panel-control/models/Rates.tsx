// Informacion de el total de clientes registrados
export interface NewClientRate {
  total_count: number;
  month_data: MonthData[];
}

export interface MonthData {
  month: string;       
  new_clients: number;  
}

// Informacion de el total de ingresos del mes
export interface RevenueRate {
  total_revenue: number;
  month_data: RevenueMonthData[];
}

export interface RevenueMonthData {
  month: string;       
  total_revenue: number;  
}

