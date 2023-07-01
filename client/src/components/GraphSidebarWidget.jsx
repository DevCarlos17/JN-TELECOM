import React from "react";

const GraphSidebarWidget = ({ component, dataCard }) => {
  return (
    <section className="flex flex-col p-2 gap-11 justify-center items-center absolute min-w-min h-min">
      {component}
      {dataCard}
    </section>
  );
};

export default GraphSidebarWidget;
