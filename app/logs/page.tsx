'use client';

import { fetchLogs } from '@/utils/fetch';
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
import { formatNumber, formatDate, formatTime } from "../../utils/formatter";
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
        {visibleColumns.user && <TableCell><span className='text-xs'>{row.user?.name || 'Unknown'}</span></TableCell>}
        {visibleColumns.date && <TableCell align="center"><span className={`text-xs px-2 py-1 rounded-full text-white
                                                            ${(row.type == 'user') && 'bg-green-500'}
                                                            ${(row.type == 'transaction') && 'bg-orange-500'}
                                                            ${(row.type == 'attendance') && 'bg-blue-500'}`}>
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}</span></TableCell>}
        {visibleColumns.message && <TableCell align="center"><span className='text-xs'> <span className="text-gray-900">
          {row.user?.name + " "}
          <span className={`font-bold 
                                                                ${(row?.message.split(" ")[0] == 'added') && 'text-green-700'}
                                                                ${(row?.message.split(" ")[0] == 'updated') && 'text-blue-700'}
                                                                ${(row?.message.split(" ")[0] == 'deleted') && 'text-red-700'}
                                                                ${(row?.type == 'attendance') && 'text-violet-700'}
                                                                `}>{
              (row.type == 'attendance') ? row?.message + "!" : row?.message.split(" ")[0]
            }</span>
          {" " + ((row.type == 'user') ? row.activity_user?.name + "." || "" :
            (row.type == 'transaction') && "a " + row.type + "." || "")}
        </span> </span></TableCell>}
        {visibleColumns.role && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.user?.role == 'admin') ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>{row.user?.role} </span></TableCell>}
        {visibleColumns.date && <TableCell align="center"><span className={`px-2 py-1 leading-tight rounded-md text-xs`}>{formatDate(row.created_at)} </span></TableCell>}
        {visibleColumns.time && <TableCell align="center"><span className={`px-2 py-1 leading-tight rounded-md text-xs`}>{formatTime(row.created_at)} </span></TableCell>}

      </TableRow >

      <TableRow>
        <TableCell colSpan={15} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-b-md shadow-b-md p-8 mb-5 gap-9">
              <Box style={{ paddingBottom: 10, paddingTop: 0 }} className="col-span-1">
                <div className="md:mb-2 md:ml-1" style={{ fontWeight: 'bold' }}>User Details: </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex justify-center items-center text-white font-bold mr-4">
                    {row.user?.name ? row.user.name.charAt(0).toUpperCase() + row.user.name.charAt(1).toLowerCase() : '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{row.user?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{row.user?.email || 'Unknown'}</div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', gap: 10, marginTop: 5 }}>
                      <span className='text-[10px]'>ID {row.user?.id}</span> •
                      <span className='text-[10px]'>{row.user?.role.charAt(0).toUpperCase() + row.user?.role.slice(1)}</span> •
                      <span className='text-[10px]'>{formatDate(row.user?.created_at)}</span> •
                      <span className='text-[10px]'>{formatTime(row.user?.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Box>

              {/* Sub Total Non Trade */}
              <Box style={{ paddingBottom: 10, paddingTop: 0 }} className="col-span-1">
                <Typography variant="h6">
                  {(row.type) == 'user' ? (
                    <>
                      {row.category == 'add' && <span className="text-sm font-semibold">Added User: </span>}
                      {row.category == 'delete' && <span className="text-sm font-semibold">Deleted User: </span>}
                      {row.category == 'update' && <span className="text-sm font-semibold">Updated User: </span>}
                    </>)
                    : (row.type) == 'transaction' ? (
                      <>
                        {row.category == 'add' && <span className="text-sm font-semibold">Added Transaction: </span>}
                        {row.category == 'delete' && <span className="text-sm font-semibold">Deleted Transaction: </span>}
                        {row.category == 'update' && <span className="text-sm font-semibold">Updated Transaction: </span>}
                      </>) :
                      <span className="text-sm font-semibold">Log Details: </span>
                  }
                </Typography>
                {(row.type == 'user') &&
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                    <div className={`w-12 h-12 rounded-full ${(row.category == 'add') ? 'bg-green-600' : (row.category == 'update') ? 'bg-yellow-600' : 'bg-red-600'} flex justify-center items-center text-white font-bold mr-4`}>
                      {row.activity_user?.name ? row.activity_user.name.charAt(0).toUpperCase() + row.activity_user.name.charAt(1).toLowerCase() : '?'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{row.activity_user?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{row.activity_user?.email || 'Unknown'}</div>
                      <div style={{ fontSize: '0.8rem', display: 'flex', gap: 10, marginTop: 5 }}>
                        <span className='text-[10px]'>ID {row.activity_user?.id}</span> •
                        <span className='text-[10px]'>{row.activity_user?.role.charAt(0).toUpperCase() + row.activity_user?.role.slice(1)}</span> •
                        <span className='text-[10px]'>{formatDate(row.activity_user?.created_at)}</span> •
                        <span className='text-[10px]'>{formatTime(row.activity_user?.created_at)}</span>
                      </div>
                    </div>
                  </div>}

                {(row.type == 'transaction') &&
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                    <div className={`w-12 h-12 rounded-full ${(row.category == 'add') ? 'bg-green-600' : (row.category == 'update') ? 'bg-yellow-600' : 'bg-red-600'} flex justify-center items-center text-white font-bold mr-4`}>
                      {row.transaction?.id ? row.transaction?.id : "?"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Transaction #{row.transaction?.id || 'Unknown'}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>Issued by: {row.transaction?.cashier?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.8rem', display: 'flex', gap: 10, marginTop: 5 }}>
                        <span className='text-[10px]'>ST: ₱{formatNumber(row.transaction?.sub_total_trade)}</span> •
                        <span className='text-[10px]'>SNT: ₱{formatNumber(row.transaction?.sub_total_non_trade)}</span> •
                        <span className='text-[10px]'>GT: ₱{formatNumber(row.transaction?.grand_total)}</span>
                      </div>
                    </div>
                  </div>}
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow >

    </>
  );
}

// Main Table Component
export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    user: true,
    time: true,
    date: true,
    type: true,
    role: true,
    message: true,
  });

  useEffect(() => {
    fetchLogs().then(setData);
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
                {visibleColumns.id && <TableCell>Log ID</TableCell>}
                {visibleColumns.user && <TableCell>User Name</TableCell>}
                {visibleColumns.type && <TableCell align='center'>Category</TableCell>}
                {visibleColumns.message && <TableCell align='center'>Message</TableCell>}
                {visibleColumns.role && <TableCell align='center'>Role </TableCell>}
                {visibleColumns.date && <TableCell align='center'>Date</TableCell>}
                {visibleColumns.time && <TableCell align='center'>Time</TableCell>}
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