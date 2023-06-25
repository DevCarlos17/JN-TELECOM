import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { optionsEcharts } from "../helper/EchartsOptions.js";

const EchartsComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const options = optionsEcharts;

    myChart.setOption(options);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default EchartsComponent;
