import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Spiner() {
  return (
    <div className="h-[100%] flex items-center justify-center pt-14">
      <ProgressSpinner
        style={{ width: "70px", height: "70px" }}
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
}
