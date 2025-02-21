'use client';

import Navbar from '@/app/comps/header';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">EDIT</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-2">DELETE</button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6">History</Typography>
              <Table size="small">
                <TableBody>
                  <TableRow><TableCell>Trade Transaction:</TableCell><TableCell>{row.history.map(h => h.date).join(', ')}</TableCell></TableRow>
                  <TableRow><TableCell>Non Trade Transaction:</TableCell><TableCell>{row.history.map(h => h.customerId).join(', ')}</TableCell></TableRow>
                  <TableRow><TableCell>MM-Head Office:</TableCell><TableCell>{row.history.map(h => h.amount).join(', ')}</TableCell></TableRow>
                  <TableRow><TableCell>MM-Comissionary:</TableCell><TableCell>{row.history.map(h => h.amount).join(', ')}</TableCell></TableRow>
                  <TableRow><TableCell>MM-RM:</TableCell><TableCell>{row.history.map(h => h.amount).join(', ')}</TableCell></TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Brownie', 320, 10.0, 50, 5.0, 2.5),
  createData('Cheesecake', 250, 8.0, 30, 6.0, 4.0),
];

export default function CollapsibleTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />
      <Box sx={{ border: '1px solid black', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
        <input
          type="text"
          placeholder="Search by Dessert..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded w-30px"
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Cashier </TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Sub-Total</TableCell>
                <TableCell align="right">Sub-Total Non Trade</TableCell>
                <TableCell align="right">Grand Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => <Row key={row.name} row={row} />)}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
