import React from "react";
import IncomeAndExpensesTable2 from "../../components/IncomeAndExpensesTable.jsx";

const IncomeAndExpenses = () => {
  return (
    <div>
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Ingresos <span className="text-primary">& Egresos</span>
      </h1>
      <IncomeAndExpensesTable2 />
    </div>
  );
};

export default IncomeAndExpenses;
