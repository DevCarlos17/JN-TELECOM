import React from "react";
import { useRef, useState } from "react";
import {
  ControlledMenu,
  MenuItem,
  useHover,
  useMenuState,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";

const FinanceMenu = () => {
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

  return (
    <>
      <div
        ref={ref}
        {...anchorProps}
        className=" hover:bg-primary p-1 rounded-lg transition-colors hover:text-black cursor-pointer">
        Finanzas
      </div>

      <ControlledMenu
        {...hoverProps}
        {...menuState}
        arrow
        align="center"
        arrowClassName="bg-secondary-100"
        menuClassName="bg-secondary-100 p-4"
        anchorRef={ref}
        onClose={() => toggle(false)}>
        <Link
          to="registros-financieros"
          className="text-gray-300 transition-colors hover:text-white  hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1 rounded">
          Ingresos y Egresos
        </Link>
      </ControlledMenu>
    </>
  );
};

export default FinanceMenu;
