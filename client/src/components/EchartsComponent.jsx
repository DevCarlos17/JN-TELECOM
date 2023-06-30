import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import CardEchart from "./CardEchart.jsx";

const EchartsComponent = ({ options, filter }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    myChart.setOption(options);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [options]);

  return (
    <div className="flex w-full relative justify-end">
      <div className="w-full h-[800px]" ref={chartRef} />
      <CardEchart component={filter} />
    </div>
  );
};

export default EchartsComponent;
