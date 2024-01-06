import React from "react";

const Pill = ({ name, value }) => {
  const getSeverity = (status) => {
    switch (status) {
      case "VIGENTE":
        return "lime";

      case "GRATIS":
        return "sky";

      case "VENCIDO":
        return "red";
    }
  };

  const color = getSeverity(name);

  return (
    <div
      className={`bg-${color}-500/10 flex justify-center items-center py-1.5 px-4 border border-${color}-500/20 rounded-full gap-x-2 transition hover:bg-${color}-500/20`}>
      <span className="text-base tracking-wide">
        {name} {value}
      </span>
    </div>
  );
};

export default Pill;
