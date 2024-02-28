import React from 'react';
import {PolarArea} from "react-chartjs-2";

const PolarAreaChart = ({ data }) => {
  // Preprocess data to handle edge cases
  const preprocessedData = data.map(entry => {
    // Normalize region values: Convert empty strings to "Unknown" and lowercase all other values
    const region = entry.region.trim().toLowerCase() || 'Unknown';
    return { ...entry, region };
  });

  // Combine regions with same values but different cases
  const regionCounts = {};
  preprocessedData.forEach(entry => {
    if (!regionCounts[entry.region]) {
      regionCounts[entry.region] = new Set();
    }
    regionCounts[entry.region].add(entry.country);
  });

  // Prepare data for the polar area chart
  const labels = Object.keys(regionCounts);
  const counts = Object.values(regionCounts).map(countries => countries.size);

  // Render the polar area chart using Chart.js
  const chartData = {
    labels: labels,
    datasets: [{
        label:"Total Affected Region",
      data: counts,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
      borderWidth: 1,
    }],
  };
console.log('POLAR CHART DATA', chartData)
  const options = {
    maintainAspectRatio: false, // Ensures the chart can resize to fit its container
    plugins: {
      title: {
        display: true,
        text: 'Total Number of Countries Affected in Each Region',
      },
    },
  };

  return <PolarArea data={chartData}  options={options}/>;
};

export default PolarAreaChart;
