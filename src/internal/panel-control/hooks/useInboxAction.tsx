import { useContext, useState } from "react";
import { markAsPaid, markAsRejected } from "../services/booking";
import { PanelControlContext } from "../context/PanelControlContext";

const useInboxAction = () => {
  const [error, setError] = useState<string>("");
  const [isErrorOpen, setErrorOpen] = useState<boolean>(false);
  const { setInboxAppointments } = useContext(PanelControlContext)!;

  const handleApprove = async (id: number) => {
    try {
      // Simulamos un error
      const res = await markAsPaid(id);
      if (res) {
        setInboxAppointments((prev) => prev.filter((curr) => curr.id !== id));
      }
    } catch (err: any) {
      setError(err?.message || "Error aceptando solicitud");
      setErrorOpen(true);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await markAsRejected(id);
      if (res) {
        setInboxAppointments((prev) => prev.filter((curr) => curr.id !== id));
      }
    } catch (err: any) {
      setError(err?.message || "Error rechazando solicitud");
      setErrorOpen(true);
    }
  };

  return {
    handleApprove,
    handleReject,
    error,
    isErrorOpen,
    setErrorOpen,
  };
};

export default useInboxAction;
