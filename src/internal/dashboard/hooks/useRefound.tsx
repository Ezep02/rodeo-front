import { useActionState, useContext } from 'react'
import { RefundRequest } from '../models/OrderModels'
import { RefoundingCustomerOrder } from '../services/DashboardService'
import { DashboardContext } from '@/context/DashboardContext'


const useRefound = () => {

    const {
        setBarberSchedules,
        setCustomerPendingOrders
    } = useContext(DashboardContext)!

    const [refundingErr, refundingAction, isrefundingPending] = useActionState(

        async (_: void | null, data: RefundRequest) => {

            try {
                const response = await RefoundingCustomerOrder(data)

                if (response) {
                    // actualizar disponibilidad de los schedules
                    setBarberSchedules((prev_sch) => {

                        const current_schedules = [...prev_sch];

                        // Index del shift a liberar
                        const previus_shift = current_schedules.findIndex(
                            (sch) => sch.ID === data.shift_id
                        );

                        if (previus_shift !== -1) {
                            current_schedules[previus_shift].Available = true;
                        }
                        return current_schedules;
                    })
                    
                    // Remover orden cancelada
                    setCustomerPendingOrders((prev_orders) => {

                        const current_orders = [...prev_orders].filter((val) => val.ID !== data.order_id)

                        // Index de la orden a remover
                    
                        return current_orders
                    })

                    // handleReschedule()
                }
            } catch (error) {
                console.warn("Algo no fue bien", error)
            }
        },
        null
    )







    return {
        refundingErr,
        refundingAction,
        isrefundingPending

    }
}

export default useRefound