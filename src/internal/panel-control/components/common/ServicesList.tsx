import React, { useContext } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";

const ServicesList: React.FC = () => {
  const { serviceList, serviceOffset } = useContext(PanelControlContext)!;

  return (
    <ul className="flex flex-col">
      {serviceList.map((ser) => (
        <li
          key={ser.ID}
          className="bg-zinc-100 p-3 flex justify-between rounded-sm"
        >
          <span>{ser.title}</span>

          <button>editar</button>
        </li>
      ))}
      {serviceOffset > 1 && serviceOffset < serviceList.length && (
        <button>
          ver mas
        </button>
      )}
    </ul>
  );
};

export default ServicesList;
