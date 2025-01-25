import { AdminContext } from "@/context/AdminContext";
import React, { useContext, useEffect } from "react";

const ExpensesList:React.FC = () => {
  const { LoadExpensesHistorial, expenseList } = useContext(AdminContext)!;
  console.log(expenseList);
  useEffect(() => {
    LoadExpensesHistorial();
  }, []);

  return (
    <div>
      {expenseList.length > 0 ? (
        <ul>
          {expenseList.map((exp) => (
            <li key={exp.ID}>
              {exp.title} ${exp.amount}
            </li>
          ))}
          <button onClick={LoadExpensesHistorial}>
            ver mas
          </button>
        </ul>
      ) : (
        <p>Historial vacio</p>
      )}
    </div>
  );
};

export default ExpensesList;
