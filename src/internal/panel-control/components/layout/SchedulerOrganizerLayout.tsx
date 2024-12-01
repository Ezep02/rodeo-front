import React from "react";

type SchedulerOrganizerLayoutProps = {
  children: React.ReactNode;
};

const SchedulerOrganizerLayout: React.FC<SchedulerOrganizerLayoutProps> = ({
  children,
}) => {
  // TODO: manejar la logica de guardado de los datos

  return (
    <div
      className="
      absolute top-0 bottom-0 left-0 right-0 grid grid-rows-12 grid-cols-12 backdrop-blur-sm z-20
      shadow-lg 
    
    "
    >
      {children}
    </div>
  );
};

export default SchedulerOrganizerLayout;
