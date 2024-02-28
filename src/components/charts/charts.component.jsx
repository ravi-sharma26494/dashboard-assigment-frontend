import React from "react";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import { Container, Grid } from "@mui/material";
import HorizontalBarChart from "./horizontal-bar-chart";
import AffectedCountriesDataGrid from "../datagrid/affectedCountries.component";
import "./charts.css";

const Charts = ({ data }) => {
  // Function to calculate sector frequency and rename empty keys
  const calculateFrequency = (data, keyName) => {
    const frequency = {};
    data.forEach((item) => {
      let value = item[keyName];
      if (value === "") value = "Miscellaneous"; // Rename empty key
      if (frequency[value]) {
        frequency[value]++;
      } else {
        frequency[value] = 1;
      }
    });
    return frequency;
  };

  // Function to prepare data for the bar chart, pie chart, and line chart
  const prepareChartData = (frequency) => {
    const labels = Object.keys(frequency);
    const data = Object.values(frequency);
    const backgroundColors = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`
    );
    return {
      labels: labels,
      datasets: [
        {
          label: "Frequency",
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    };
  };

  // Calculate frequency for start_year
  const startYearFrequency = calculateFrequency(data, "start_year");

  // Prepare data for line chart
  const lineChartData = prepareChartData(startYearFrequency);

  // Calculate frequency for sector
  const sectorFrequency = calculateFrequency(data, "sector");

  // Prepare data for bar chart
  const barChartData = prepareChartData(sectorFrequency);

  // Prepare data for pie chart
  const pieChartData = prepareChartData(sectorFrequency);

  // Prepare scatter plot data (random data for demonstration)
  const scatterData = Array.from({ length: 10 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  // Chart options
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Horizontal Bar Chart */}
        <Grid item xs={12} md={7}>
          <div className="chart-wrapper">
            <HorizontalBarChart />
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <AffectedCountriesDataGrid data={data} />
        </Grid>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <div className="square-chart-title">
            Time-Series Data (Line Chart)
          </div>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={options} />
          </div>
        </Grid>

        {/* Scatter Plot */}
        <Grid item xs={12} md={6}>
          <div className="square-chart-title">Correlation (Scatter Plot)</div>
          <div className="chart-wrapper">
            <Scatter
              data={{
                datasets: [
                  {
                    label: "Scatter Data",
                    data: scatterData,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                  },
                ],
              }}
            />
          </div>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <div className="square-chart-title">Sector Frequency (Bar Chart)</div>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={options} />
          </div>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <div className="square-chart-title">Sector Frequency (Pie Chart)</div>
          <div className="chart-wrapper">
            <Pie data={pieChartData} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
