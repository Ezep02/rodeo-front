import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  createPreference,
  createPreferenceWithAlias,
} from "../services/mp_preference";
import { PreferenceRequest } from "../types/Preference";
import { DashboardContext } from "@/context/DashboardContext";

const usePreference = () => {
  const {
    serviceInfo,
    transactionErr,
    setTransactionErr,
    setPrefWithAliasPayment,
  } = useContext(ShopContext)!;

  const {
    selectedSlot,
    paymentType
  } = useContext(DashboardContext)!
  
  const [isPending, setIsPending] = useState(false);

  let payment_final_ptg = paymentType === "total" ? 100 : 50
  
  const onCreatePrefAction = async () => {
    setIsPending(true);
    setTransactionErr(null);

    try {
      if (!serviceInfo?.id || !selectedSlot?.id) {
        throw new Error("Id del servicio no existe");
      }

      const data: PreferenceRequest = {
        payment_percentage: payment_final_ptg,
        services_id: [serviceInfo.id],
        slot_id: selectedSlot.id,
      };

      // crear preferencia
      const res = await createPreference(data);
      if (res) {
        window.location.href = res
      }

      if (!res) throw new Error("No se pudo crear la preferencia");
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.error ||
        error.message ||
        "Error en la transacción";
      setTransactionErr(errMsg);
      return errMsg;
    } finally {
      setIsPending(false);
    }
  };

  const onAliasPrefAction = async () => {
    setIsPending(true);
    setTransactionErr(null);

    try {
      if (!serviceInfo?.id || !selectedSlot?.id) {
        throw new Error("Id del servicio no existe");
      }

      const data: PreferenceRequest = {
        payment_percentage: payment_final_ptg,
        services_id: [serviceInfo.id],
        slot_id: selectedSlot.id,
      };

      const res = await createPreferenceWithAlias(data);
      if (res) {
        setPrefWithAliasPayment(res);
      }

    } catch (error: any) {
      const errMsg =
        error?.response?.data?.error ||
        error.message ||
        "Error en la transacción";
      setTransactionErr(errMsg);
      return errMsg;
    } finally {
      setIsPending(false);
    }
  };

  return {
    transactionErr,
    isPending,
    onCreatePrefAction,
    onAliasPrefAction,
  };
};

export default usePreference;
