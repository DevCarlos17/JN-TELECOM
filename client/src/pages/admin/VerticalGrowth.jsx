import React from "react";
import VerticalGrouthTable from "../../components/VerticalGrouthTable.jsx";

const VerticalGrowth = () => {
  return (
    <div>
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Crecimiento <span className="text-primary">Vertical</span>
      </h1>
      <VerticalGrouthTable />
    </div>
  );
};

export default VerticalGrowth;
