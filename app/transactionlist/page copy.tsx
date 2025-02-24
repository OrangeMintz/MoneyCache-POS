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
import { useEffect, useState } from 'react';
import api from "../../utils/api";

async function fetchData() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await api.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data.transactions || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function Row({ row }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.cashier?.name || 'Unknown'}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">{row.sub_total_trade}</TableCell>
        <TableCell align="right">{row.sub_total_non_trade}</TableCell>
        <TableCell align="right">{row.grand_total}</TableCell>
        <TableCell align="right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">EDIT</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-2">DELETE</button>
        </TableCell>
      </TableRow>
      {/** Expanded row for future details (if needed) */}
      <TableRow>
        <TableCell colSpan={15} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <div className='flex'>
             <Box style={{ paddingBottom: 10, paddingTop: 0 }}>
              <Typography variant="h6">Trade Transaction</Typography>
              <Table size="small">
              <TableBody>
                {[
                  { key: "cash", label: "Cash" },
                  { key: "check", label: "Check" },
                  { key: "bpi_ccard", label: "BPI Credit Card" },
                  { key: "bpi_dcard", label: "BPI Debit Card" },
                  { key: "metro_ccard", label: "Metro Credit Card" },
                  { key: "metro_dcard", label: "Metro Debit Card" },
                  { key: "paymaya", label: "PayMaya" },
                  { key: "aub_ccard", label: "AUB Credit Card" },
                  { key: "gcash", label: "GCash" },
                  { key: "food_panda", label: "Food Panda" },
                  { key: "streetby", label: "StreetBy" },
                  { key: "grabfood", label: "GrabFood" },
                  { key: "gc_claimed_others", label: "GC Claimed (Others)" },
                  { key: "gc_claimed_own", label: "GC Claimed (Own)" },
                  { key: "mm_head", label: "MM-Head Office" },
                  { key: "mm_commissary", label: "MM-Commissary" },
                  { key: "mm_rm", label: "MM-RM" },
                  { key: "mm_dm", label: "MM-DM" },
                  { key: "mm_km", label: "MM-KM" },
                  { key: "food_charge", label: "Food Charge" },
                  { key: "z_reading_pos", label: "Z Reading POS" },
                  { key: "over_pos", label: "Over POS" }
                ].map(({ key, label }) =>
                  row[key] !== null && row[key] !== undefined ? (
                    <TableRow key={key}>
                      <TableCell>{label}:</TableCell>
                      <TableCell>{row[key]}</TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
              </Table>
            </Box>
            
            <Box style={{ paddingBottom: 10, paddingTop: 0 }}>
              <Typography variant="h6">Trade Transaction</Typography>
              <Table size="small">
              <TableBody>
                {[
                  { key: "cash", label: "Cash" },
                  { key: "check", label: "Check" },
                  { key: "bpi_ccard", label: "BPI Credit Card" },
                  { key: "bpi_dcard", label: "BPI Debit Card" },
                  { key: "metro_ccard", label: "Metro Credit Card" },
                  { key: "metro_dcard", label: "Metro Debit Card" },
                  { key: "paymaya", label: "PayMaya" },
                  { key: "aub_ccard", label: "AUB Credit Card" },
                  { key: "gcash", label: "GCash" },
                  { key: "food_panda", label: "Food Panda" },
                  { key: "streetby", label: "StreetBy" },
                  { key: "grabfood", label: "GrabFood" },
                  { key: "gc_claimed_others", label: "GC Claimed (Others)" },
                  { key: "gc_claimed_own", label: "GC Claimed (Own)" },
                  { key: "mm_head", label: "MM-Head Office" },
                  { key: "mm_commissary", label: "MM-Commissary" },
                  { key: "mm_rm", label: "MM-RM" },
                  { key: "mm_dm", label: "MM-DM" },
                  { key: "mm_km", label: "MM-KM" },
                  { key: "food_charge", label: "Food Charge" },
                  { key: "z_reading_pos", label: "Z Reading POS" },
                  { key: "over_pos", label: "Over POS" }
                ].map(({ key, label }) =>
                  row[key] !== null && row[key] !== undefined ? (
                    <TableRow key={key}>
                      <TableCell>{label}:</TableCell>
                      <TableCell>{row[key]}</TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
              </Table>
            </Box>
            
          </div>
           
          </Collapse>

        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Ensure safe access to cashier's name
  const filteredRows = data.filter(row => 
    row.cashier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />
      <Box sx={{ borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
        <input
          type="text"
          placeholder="Search by Cashier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded w-30px"
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Cashier</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Sub-Total Trade</TableCell>
                <TableCell align="right">Sub-Total Non Trade</TableCell>
                <TableCell align="right">Grand Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => <Row key={row.id} row={row} />)}
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
