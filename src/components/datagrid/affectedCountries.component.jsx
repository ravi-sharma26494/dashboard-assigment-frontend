import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import "./style.css";

const AffectedCountriesDataGrid = ({ data }) => {
  // State for selected sector
  const [selectedSector, setSelectedSector] = useState("Energy"); // Initially set to "Energy"
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Filtered data based on selected sector
  const [filteredData, setFilteredData] = useState([]);

  // Handle sector selection change
  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
    setPage(0); // Reset page when sector changes
  };

  // Pagination change handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination rows per page change handler
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter data when selected sector changes or when the component mounts
  useEffect(() => {
    const filtered = data.filter(
      (item) => item.sector === selectedSector && item.intensity <= 8
    );
    setFilteredData(filtered);
  }, [data, selectedSector]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => item.sector === "Energy" && item.intensity <= 8)
    );
  }, [data]);

  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="custom-data-grid">
      {/* Header */}
      <div className="header">
        <div className="table-header-title">
          Sector Vs Country: Intensity Wise
        </div>
        <FormControl>
          <InputLabel id="sector-label">Sector</InputLabel>
          <Select
            labelId="sector-label"
            id="sector-label"
            className="sector-label-textarea"
            label="Sector"
            value={selectedSector}
            onChange={handleSectorChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Sector
            </MenuItem>
            {Array.from(new Set(data.map((item) => item.sector))).map(
              (sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>

      {/* Main Section */}
      <TableContainer
        size={"small"}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          marginBottom: "20px",
          fontSize: "0.8rem", // Reduced font size
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "8px" }}>Country</TableCell>
              <TableCell style={{ padding: "8px" }}>Topic</TableCell>
              <TableCell style={{ padding: "8px" }}>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: getRandomColor(),
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "10px",
                          fontSize: "10px",
                        }}
                      >
                        {row.country
                          ? row.country.substring(0, 3).toUpperCase()
                          : ""}
                      </div>
                      {row.country || "Unknown"}
                    </div>
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>{row.topic}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    <Link
                      href={row.url}
                      underline="none"
                      target="_blank"
                      rel="noopener"
                    >
                      Read Article
                    </Link>
                    {/* {row.url} */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <div className="footer">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default AffectedCountriesDataGrid;
