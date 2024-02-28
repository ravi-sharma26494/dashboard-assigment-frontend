import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChart = ({ data }) => {
  // Grouping sectors by pestle and counting occurrences
  const sectorsByPestle = {};
  data.forEach((item) => {
    if (!sectorsByPestle[item.pestle]) {
      sectorsByPestle[item.pestle] = {};
    }
    if (!sectorsByPestle[item.pestle][item.sector]) {
      sectorsByPestle[item.pestle][item.sector] = 1;
    } else {
      sectorsByPestle[item.pestle][item.sector]++;
    }
  });

  // Extracting unique sectors
  const uniqueSectors = new Set();
  Object.values(sectorsByPestle).forEach((pestle) => {
    Object.keys(pestle).forEach((sector) => {
      uniqueSectors.add(sector);
    });
  });

  // Generating datasets for the chart
  const datasets = [];
  Object.keys(sectorsByPestle).forEach((pestle) => {
    const data = [];
    uniqueSectors.forEach((sector) => {
      data.push(sectorsByPestle[pestle][sector] || 0);
    });
    datasets.push({
      label: pestle,
      data: data,
      backgroundColor: getRandomColor(),
    });
  });

  // Generating chart data
  const chartData = {
    labels: Array.from(uniqueSectors),
    datasets: datasets,
  };

  console.log("From stacked Bar Chart", chartData);
  // Chart options
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pestles",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            if (value === 0) {
              return "0";
            } else {
              return `${value - 5}-${value}`;
            }
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <h2>Occurrence Count of Sectors by Pestle</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Function to generate random color
const getRandomColor = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
};

export default StackedBarChart;
