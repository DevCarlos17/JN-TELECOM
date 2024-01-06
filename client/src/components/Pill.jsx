import React from "react";

const Pill = ({ name, value }) => {
  const getSeverity = (status) => {
    switch (status) {
      case "VIGENTE":
        return "bg-lime-500/90 border border-lime-500/20 ";

      case "GRATIS":
        return "bg-sky-500 border border-sky-500/20";

      case "VENCIDO":
        return "bg-red-500 border border-red-500/20";
    }
  };

  const color = getSeverity(name);

  return (
    <div
      className={`flex justify-center items-center py-1.5 px-4 rounded-full gap-x-2 transition ${color}`}>
      <span className="text-base tracking-wide text-black">
        {name} {value}
      </span>
    </div>
  );
};

export default Pill;
