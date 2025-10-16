import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { createPreference } from "../services/mp_preference";
import { CreatePreferenceRequest } from "../types/Preference";

const usePreference = (service_id?: number) => {
  const { selectedSlot } = useContext(ShopContext)!;

  // Crear preferencia
  const CreatePreferente = async () => {
    try {
      if (!service_id || !selectedSlot?.id) return;

      let preference: CreatePreferenceRequest = {
        payment_percentage: 100,
        services_id: [service_id],
        slot_id: selectedSlot?.id,
      };

      let res = await createPreference(preference);
    
      if(res){
        window.location.href = res
      }
    } catch (error) {
      console.warn("error creando preferencia", error);
    }
  };

  return {
    CreatePreferente,
  };
};

export default usePreference;
