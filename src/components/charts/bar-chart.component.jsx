import React from "react";
import StackedBarChart from "./stackedbarchart.component";
import PolarAreaChart from "./polarAreaChart";
import DataTable from "../datagrid/datagrid.component";
import { useDataContext } from "../../context/DataContext";

const BarChart = () => {
  const { appData } = useDataContext();
  return (
    <div
      className="charts"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <StackedBarChart data={appData} />
      </div>
      <div>
        <PolarAreaChart data={appData} />
      </div>
      <div>
        <DataTable data={appData} />
      </div>
    </div>
  );
};

export default BarChart;
