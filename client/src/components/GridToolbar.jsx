import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import GridToolbarSearch from "./GridToolbarSearch.jsx";
import { TbReload } from "react-icons/tb";
import { useSalesContext } from "../context/salesContext.jsx";
import { useUserContext } from "../context/userContext.jsx";

const CustomToolbar = () => {
  const { user } = useUserContext();
  const {
    getSales,
    handleSearch,
    search,
    handleStateSearch,
    filterSales,
    clearFilter,
  } = useSalesContext();
  return (
    <GridToolbarContainer className="my-1">
      <GridToolbarColumnsButton color="warning" />
      <GridToolbarFilterButton color="warning" />
      <GridToolbarDensitySelector color="warning" />
      <GridToolbarExport color="warning" />
      <div className="flex justify-between flex-1">
        <GridToolbarSearch
          props={{
            handleSearch,
            search,
            handleStateSearch,
            filterSales,
            clearFilter,
          }}
        />
        <button
          onClick={() => getSales(user)}
          className="text-xl text-black hover:text-warning">
          <TbReload />
        </button>
      </div>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
