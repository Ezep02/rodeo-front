import { useState } from "react";
import { ViewMode } from "../../types/ViewMode";
import { Selector } from "../common/Selector";
import OpenFilters from "../dialog/OpenFilters";
import Services from "../Services";
import Categories from "../Categories";

const MyCatalog = () => {
  const [view, setView] = useState<ViewMode>("services");

  const toggleViewMode = (value: ViewMode) => {
    setView(value);
  };

  function ViewModeRender(): React.ReactNode {
    switch (view) {
      case "services":
        return <Services />;
      case "categories":
        return <Categories/>;
      case "product":
        return (
          <div className="p-2">
            <div className="text-center py-8">
              <p className="text-gray-700">Proximamente</p>
            </div>
          </div>
        );
      default:
        return <p>Algo no fue bien</p>;
    }
  }

  return (
    <div className="pt-2.5">
      <div className="flex justify-between py-2.5 gap-2.5 items-center flex-wrap">
        <Selector view={view} onChange={toggleViewMode} />
        <OpenFilters />
      </div>

      {/* Listado de servicios */}
      <div className="flex flex-col flex-grow gap-2">
        <div className="space-y-2">{ViewModeRender()}</div>
      </div>
    </div>
  );
};

export default MyCatalog;
