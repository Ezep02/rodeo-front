import { User } from "@/models/AuthModels"

export type BarberInfo = {
	id: number
	user_id:number
	calendar_id: string 

    user: User
}
