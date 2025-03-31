
// Promedios ganancias / turnos pedidos / nuevos clientes
export type MonthlyRevenue = {
	Total_month_revenue:Float64Array 
	Avg_compared_last_month: Float64Array 
}

export type MonthlyAppointmens = {
	Total_month_appointments: number     
	Avg_compared_last_month: Float64Array 
}

export type MonthlyNewCustomers = {
	Total_month_new_users:   number    
	Avg_compared_last_month: Float64Array 
}

export type CurrentYearMonthlyRevenue = {
	Month: string
	Month_revenue: Float64Array
}

export type MonthlyPopularServices = {
	Service_name: string
	Service_count: number
}

export type FrequentCustomer = {
	Customer_name: string
	Customer_surname:string
	Visits_count: number
	Total_spent: number | Float64Array
	Last_visit: Date
}








