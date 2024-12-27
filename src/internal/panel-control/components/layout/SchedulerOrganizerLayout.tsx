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
      absolute top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-20 
    "
    >
      {children}
    </div>
  );
};

export default SchedulerOrganizerLayout;
