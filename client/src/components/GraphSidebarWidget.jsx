import React from "react";

const GraphSidebarWidget = ({ dateFilter, userPicker, dataCard }) => {
  return (
    <section className="flex flex-col p-2 gap-11 justify-center items-center absolute w-full h-min">
      {userPicker}
      {dateFilter}
      {dataCard}
    </section>
  );
};

export default GraphSidebarWidget;
