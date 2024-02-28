import { DataGrid } from "@mui/x-data-grid";
import { useDataContext } from "../../context/DataContext";

const MainDataGrid = () => {
  const { appData, loading, error } = useDataContext();

  const columns = [
    { field: "end_year", headerName: "End Year", width: 150 },
    { field: "intensity", headerName: "Intensity", width: 150 },
    { field: "sector", headerName: "Sector", width: 150 },
    { field: "topic", headerName: "Topic", width: 150 },
    { field: "region", headerName: "Region", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "relevance", headerName: "Relevance", width: 150 },
    { field: "pestle", headerName: "Pestle", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "likelihood", headerName: "Likelihood", width: 150 },
  ];

  const getRowId = (row) => row._id;

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={appData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        pagination
        getRowId={getRowId}
        checkboxSelection
      />
    </div>
  );
};

export default MainDataGrid;
