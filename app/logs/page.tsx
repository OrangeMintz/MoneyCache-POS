'use client';

import { fetchTransactions } from '@/utils/fetch';
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
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from 'react';
import { formatNumber } from "../../utils/formatter";
import Preloader from '../comps/preloader';

// Row Component
function Row({ row, handleSave, visibleColumns }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className='hover:bg-gray-200'>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

        </TableCell>
        {visibleColumns.id && <TableCell><span className='text-xs'>{row.id}</span></TableCell>}
        {visibleColumns.cashier && <TableCell><span className='text-xs'>{row.cashier?.name || 'Unknown'}</span></TableCell>}
        {visibleColumns.date && <TableCell align="center"><span className='text-xs'>{new Date(row.created_at).toISOString().split("T")[0]}</span></TableCell>}
        {visibleColumns.time && <TableCell align="center"><span className='text-xs'>{row.time}</span></TableCell>}
        {visibleColumns.trade && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.sub_total_trade > 5000) ? 'text-green-700 bg-green-100' : (row.sub_total_trade > 500 && row.sub_total_trade < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}> ₱ {formatNumber(row.sub_total_trade)} </span></TableCell>}
        {visibleColumns.nonTrade && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.sub_total_non_trade > 5000) ? 'text-green-700 bg-green-100' : (row.sub_total_non_trade > 500 && row.sub_total_non_trade < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}>₱ {formatNumber(row.sub_total_non_trade)}  </span></TableCell>}
        {visibleColumns.grandTotal && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.grand_total > 5000) ? 'text-green-700 bg-green-100' : (row.grand_total > 500 && row.grand_total < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}>₱ {formatNumber(row.grand_total)}  </span></TableCell>}

      </TableRow >

      <TableRow>
  <TableCell colSpan={15} style={{ paddingBottom: 0, paddingTop: 0 }}>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <div className="flex grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-b-md shadow-b-md p-8 mb-5 gap-9">
        <Box style={{ paddingBottom: 10, paddingTop: 0 }} className="col-span-1">
        <div className="md:mb-2 md:ml-1"style={{ fontWeight: 'bold' }}>User Details: </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
    <div style={{ 
      width: 50, 
      height: 50, 
      borderRadius: '50%', 
      backgroundColor: '#1976d2', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      marginRight: 15
    }}>
      {row.cashier?.name ? row.cashier.name.charAt(0).toUpperCase() : '?'}{row.cashier?.name ? row.cashier.name.charAt(1).toLowerCase() : '?'}
    </div>
    <div>
      <div style={{ fontWeight: 'bold' }}>{row.cashier?.name || 'Unknown'}</div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>{row.cashier?.email || 'Unknown'}</div>
      <div style={{ fontSize: '0.8rem', display: 'flex', gap: 10, marginTop: 5 }}>
        <span>Admin</span> • 
        <span>March 12, 2025</span> • 
        <span>14:30</span>
      </div>
    </div>
  </div>
</Box>

        {/* Sub Total Non Trade */}
        <Box style={{ paddingBottom: 10, paddingTop: 0 }} className="col-span-1">
  <Typography variant="h6">
    <span className="text-sm font-semibold">Message: </span>
  </Typography>
  <Table size="small">
    <TableBody>
      <TableRow>
        <TableCell style={{ whiteSpace: 'pre-wrap', padding: '8px' }}>
          {row.message || 'No message available for this transaction.'}
        </TableCell>
      </TableRow>
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

// Main Table Component
export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    cashier: true,
    date: true,
    time: true,
    trade: true,
    nonTrade: true,
    grandTotal: true,
    actions: true,
  });

  useEffect(() => {
    fetchTransactions().then(setData);
  }, []);

  useEffect(() => {
    (data.length > 0) && setLoading(false)
  }, [data]);

  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSave = (updatedData) => {
    const updatedRows = data.map((row) =>
      row.id === updatedData.id ? updatedData : row
    );
    setData(updatedRows);
  };

  const filteredRows = data.filter((row) =>
    row.cashier?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(row.created_at).toISOString().split("T")[0].includes(searchTerm.toLocaleLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  if (loading) {
    return <Preloader />
  }

  return (
    <>
      <Box className='bg-gray-100 m-6 p-6 rounded-md shadow-md'>
        <h2 className="text-2xl font-semibold dark:text-white mb-3">Activity Logs</h2>

        <div className='grid grid-cols-5 flex'>

        <div className='md:col-span-3'>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
              <svg 
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mb-4 flex justify-end col-span-2 relative">
          <button
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-800 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50 transition-colors duration-200"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Columns
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

            <div
              id="dropdownContent"
              className={`absolute top-full right-0 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 sm:w-48 md:w-56 dark:bg-gray-700 transition-all duration-300 ease-in-out transform ${dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"
                }`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {Object.keys(visibleColumns).map((col) => (
                  <li key={col}>
                    <label className="flex items-center gap-1 text-sm px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => handleColumnToggle(col)}
                        className="w-4 h-4"
                      />
                      <span className="ml-2 truncate">{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>



        <TableContainer component={Paper} className='p-7 pb-10'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {visibleColumns.id && <TableCell>ID</TableCell>}
                {visibleColumns.cashier && <TableCell>User Name</TableCell>}
                {visibleColumns.date && <TableCell align='center'>Date</TableCell>}
                {visibleColumns.time && <TableCell align='center'>Time</TableCell>}
                {visibleColumns.trade && <TableCell align='center'>Category</TableCell>}
                {visibleColumns.nonTrade && <TableCell align='center'>i dunno what to add </TableCell>}
                {visibleColumns.grandTotal && <TableCell align='center'>i dunno</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row key={row.id} row={row} handleSave={handleSave} visibleColumns={visibleColumns} />
              ))}
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
      <div className='z-50 border-t'>
      </div>
    </>

  );
}