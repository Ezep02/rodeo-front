import { Button } from "@/components/ui/button";
import InsightCard from "../../../../components/common/InsightCard";
import ServiceForm from "../dialog/ServiceForm";
import { Plus } from "lucide-react";
import useServiceStats from "../../hooks/useServiceStats";

const CatalogStats = () => {

  const {
    serviceStats 
  } = useServiceStats()


  return (
    <section className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-1 pt-4">
      <InsightCard stat_content={serviceStats?.total_services} text="Servicios" />
      <InsightCard stat_content={0} text="Proximamente" />
      <InsightCard stat_content={0} text="Proximamente" />
      <InsightCard stat_content={0} text="Proximamente" />
      <InsightCard
        text="Agregar"
        inherited_action={
          <ServiceForm
            trigger={
              <Button variant="ghost" size="icon" className="rounded-full cursor-pointer active:scale-95">
                <Plus size={20}/>
              </Button>
            }
          />
        }
      />
    </section>
  );
};

export default CatalogStats;
