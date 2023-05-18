import React, { useState } from "react";

const ExpandableCell = ({ direccion }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={handleClick}>
      {expanded ? (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {direccion}
        </div>
      ) : (
        <div>{direccion}</div>
      )}
    </div>
  );
};

export default ExpandableCell;
