import React from "react";

type ExpensesPopUpProp = {
  children: React.ReactNode;
};

const ExpensesPopUpLayout: React.FC<ExpensesPopUpProp> = ({ children }) => {
  return (
    <div className="inset-0 absolute bg-opacity-70 bg-zinc-800 z-50 grid grid-rows-12 grid-cols-12 ">
      {children}
    </div>
  );
};

export default ExpensesPopUpLayout;
