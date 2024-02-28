import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, Typography, Grid, Button, MenuItem, Box } from '@mui/material';

const DataTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    const filtered = data.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(keyword)
      );
    });
    setFilteredData(filtered);
    setPage(0); // Reset page when search keyword changes
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPage(0); // Reset page when page size changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const CustomPagination = () => (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Button
        variant="outlined"
        disabled={page === 0}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </Button>
      <Typography variant="body1" component="span">
        Page {page + 1}
      </Typography>
      <Button
        variant="outlined"
        disabled={(page + 1) * pageSize >= filteredData.length}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, sortable: true, filterable: true },
    { field: 'sector', headerName: 'Sector', flex: 1, sortable: true, filterable: true },
    // Add more custom columns as needed
  ];

  const filteredColumns = columns.map((column) => ({
    ...column,
    valueGetter: (params) => params.row[column.field]?.toString().toLowerCase(),
  }));

  // Calculate the rows to be displayed based on the current page and page size
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const rows = filteredData
    .slice(startIndex, endIndex)
    .map((row, index) => ({ ...row, id: index }));

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Data Grid
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchKeyword}
            onChange={handleSearch}
          />
          <TextField
            select
            label="Filter"
            variant="outlined"
            size="small"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Add options for filtering */}
          </TextField>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={rows}
          columns={filteredColumns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          rowCount={filteredData.length}
          pagination
          onPageChange={handlePageChange}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination,
          }}
          componentsProps={{
            pagination: { pageSize },
          }}
        />
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
        <Typography variant="body2">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </Typography>
      </Box>
    </div>
  );
};

export default DataTable;
