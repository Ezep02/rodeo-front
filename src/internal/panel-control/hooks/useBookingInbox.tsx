import { useContext, useEffect } from "react"
import { allPendingPayment } from "../services/booking"
import { PanelControlContext } from "../context/PanelControlContext"


const useBookingInbox = () => {
  const {setInboxAppointments, inboxAppointment} = useContext(PanelControlContext)!

  useEffect(()=> {

    const fetchPendingInbox = async () => {
        let res = await allPendingPayment()
        if(res){
            setInboxAppointments(res)
        }
    }

    fetchPendingInbox()

  }, [])

  return {
    inboxAppointment
  }
}

export default useBookingInbox