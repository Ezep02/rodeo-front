import CatalogStats from "@/internal/catalog/components/sections/CatalogStats";
import HeaderSection from "@/internal/catalog/components/sections/HeaderSection";
import MyCatalog from "@/internal/catalog/components/sections/MyCatalog";

const CatalogPage = () => {
  return (
    <div className="p-5 md:p-10">
      <HeaderSection />

      <CatalogStats />
      
      <MyCatalog />
    </div>
  );
};

export default CatalogPage;
