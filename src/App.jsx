import ResponsiveDrawer from "./components/drawer/drawer.component";

import Chart from "chart.js/auto";

import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResponsiveDrawer />}></Route>
      </Routes>
    </>
  );
}

export default App;
