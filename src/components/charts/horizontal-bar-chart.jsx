import React from "react";
import { Bar } from "react-chartjs-2";
import { calculateTopRegions } from "../../utils/data-calculation";
import { useDataContext } from "../../context/DataContext";

const options = {
  maintainAspectRatio: false,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      text: "Top Regions Occurrence Percentage",
    },
  },
};

const HorizontalBarChart = () => {
  const { appData, loading, error } = useDataContext();
  const topRegions = calculateTopRegions(appData);
  const labels = topRegions.map((region) => region.regionName);
  const data = {
    labels,
    datasets: [
      {
        label: "Occurrence Percentage",
        data: topRegions.map((region) => region.occurrencePercentage),
        backgroundColor: [
          "#7367f0",
          "#00cfe8",
          "#28c767",
          "#A8AAE",
          "#EA5455",
          "#FF9F43",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default HorizontalBarChart;
