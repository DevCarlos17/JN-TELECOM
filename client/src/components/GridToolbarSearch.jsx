import React from "react";

//ICONS
import { IoSearchCircleOutline, IoTrashOutline } from "react-icons/io5";

const GridToolbarSearch = ({ props }) => {
  const { handleSearch, search, handleStateSearch, filterSales, clearFilter } =
    props;

  return (
    <div className="flex gap-1">
      <label htmlFor="estados" className="text-warning">
        BUSQUEDA RAPIDA:
      </label>
      <select
        onChange={handleStateSearch}
        name="input"
        className="rounded-lg p-0.5">
        <option defaultValue="select">Seleccionar</option>
        <option value="numeroDocumento">DNI</option>
        <option value="vendedor">VENDEDOR</option>
        <option value="telefonoContacto">TELEFONO</option>
        <option value="distrito">DISTRITO</option>
        <option value="supervisor">SUPERVISOR</option>
      </select>
      <input
        type="search"
        name="search"
        className="pl-4 outline-none rounded-lg border border-gray-600 focus:border-primary"
        value={search}
        onChange={handleSearch}
        placeholder="buscar"
      />

      <button
        onClick={filterSales}
        className="text-2xl text-black hover:text-warning">
        <IoSearchCircleOutline />
      </button>
      <button
        onClick={clearFilter}
        className="text-xl text-black hover:text-warning">
        <IoTrashOutline />
      </button>
    </div>
  );
};

export default GridToolbarSearch;
