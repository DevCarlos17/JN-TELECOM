import DataTableSales from "../../components/DataTable2.jsx";
const GlobalSales = () => {
  return (
    <div className="flex-col justify-center items-center w-full">
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Ventas <span className="text-primary">Globales</span>
      </h1>
      <DataTableSales />
    </div>
  );
};

export default GlobalSales;
