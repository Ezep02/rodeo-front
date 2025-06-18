
// Promedios ganancias / turnos pedidos / nuevos clientes
export type MonthlyRevenue = {
	Total_month_revenue:number 
	Avg_compared_last_month: number 
}

export type MonthlyAppointmens = {
	Total_month_appointments: number     
	Avg_compared_last_month: number 
}

export type MonthlyNewCustomers = {
	Total_month_new_users:   number    
	Avg_compared_last_month: number 
}

export type CurrentYearMonthlyRevenue = {
	Month: string
	Month_revenue: number
}

export type MonthlyPopularServices = {
	Service_name: string
	Service_count: number
}

export type FrequentCustomer = {
	Customer_name: string
	Customer_surname:string
	Visits_count: number
	Total_spent: number
	Last_visit: Date
}








