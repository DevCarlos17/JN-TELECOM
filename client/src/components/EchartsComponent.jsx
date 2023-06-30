import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import CardEchartData from "./CardEchartData.jsx";

const EchartsComponent = ({ options }) => {
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
      <CardEchartData salesData={options} />
    </div>
  );
};

export default EchartsComponent;
