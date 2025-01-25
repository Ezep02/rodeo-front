
import React, {  } from "react";

type OptionProps = {
  children: React.ReactNode
}
const Options: React.FC<OptionProps> = ({children}) => {

  return (
    <div
      className="
          md:hidden 
          col-start-1 col-end-13 row-start-1 row-end-2 bg-white rounded-lg
          flex p-2 gap-2
        "
    >
      
      {
        children
      }

    </div>
  );
};

export default Options;
