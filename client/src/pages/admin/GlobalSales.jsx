import DataTable from "../../components/DataTable.jsx";
import { useSalesContext } from "../../context/salesContext.jsx";
import { columns } from "../../helper/DataGridConfig.jsx";
import CustomToolbar from "../../components/GridToolbar.jsx";
import BtnEnterSale from "../../components/BtnEnterSale.jsx";
const GlobalSales = () => {
  const { salesFiltered, putSale, updateData, sales } = useSalesContext();
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-[90vw]">
        <DataTable
          props={{
            sales,
            updateData,
            salesFiltered,
            putSale,
            columns,
            CustomToolbar,
            BtnEnterSale,
          }}
        />
      </div>
    </div>
  );
};

export default GlobalSales;
