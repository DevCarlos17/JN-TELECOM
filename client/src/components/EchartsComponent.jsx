import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

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

  return <div className="w-full h-[800px]" ref={chartRef} />;
};

export default EchartsComponent;
