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
    selectedSlot
  } = useContext(DashboardContext)!

  const [isPending, setIsPending] = useState(false);

  const onCreatePrefAction = async () => {
    setIsPending(true);
    setTransactionErr(null);

    try {
      if (!serviceInfo?.id || !selectedSlot?.id) {
        throw new Error("Id del servicio no existe");
      }

      // Simulación de error
      // throw new Error("Algo no fue bien");
      const data: PreferenceRequest = {
        payment_percentage: 100,
        services_id: [serviceInfo.id],
        slot_id: selectedSlot.id,
      };

      // Código real para crear preferencia
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
        payment_percentage: 100,
        services_id: [serviceInfo.id],
        slot_id: selectedSlot.id,
      };

      //throw new Error("No se pudo crear la preferencia");
      // Código real:
      const res = await createPreferenceWithAlias(data);
      if (res) {
        setPrefWithAliasPayment(res);
      }

      // if (!res) throw new Error("No se pudo crear la preferencia");
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
