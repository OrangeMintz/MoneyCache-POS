'use client';

import { fetchAttendance, timeIn, timeOut } from '@/utils/fetch';
import { formatDate, formatTime, formatNumber } from '@/utils/formatter';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ArrowDown, ArrowUp, ChevronDown, LogIn, LogOut } from "lucide-react";
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import Toast from 'typescript-toastify';
import Preloader from '../comps/preloader';

// Row Component
function Row({ row, handleSave, visibleColumns }) {

  return (
    <>
      <TableRow>
        {visibleColumns.id && <TableCell align="center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mb-1">
              {row.user ? row.user?.name.charAt(0).toUpperCase() : ''}
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">{row.user?.name || ''}</span>
              <span className="text-xs text-gray-500">{row.user?.email || ''}</span>
              <span className="text-xs mt-0.5 px-2 py-0.5 bg-gray-100 rounded-full inline-block">{row.user?.id}</span>

            </div>
          </div>
        </TableCell>}
        {visibleColumns.in && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-green-700 bg-green-100'>{formatTime(row.created_at)}</span></TableCell>}
        {visibleColumns.out && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-purple-700 bg-purple-100'>{formatTime(row.timeOut)}</span></TableCell>}
        {visibleColumns.hour && <TableCell align="center"><span className='text-xs'>{row.totalHours || "N/A"}</span></TableCell>}
        {visibleColumns.rate && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-green-700 bg-green-100'>{row.totalRate ? "₱ " + formatNumber(row.totalRate) : "N/A"}</span></TableCell>}
        {visibleColumns.status && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.status == 'Early') ? 'text-green-700 bg-green-100' : (row.status == 'On Time') ? 'text-blue-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>{row.status}</span></TableCell>}
        {visibleColumns.date && <TableCell align="center"><span className='text-xs'>{formatDate(row.created_at)}</span></TableCell>}
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
  const [loading, setLoading] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    in: true,
    out: true,
    hour: true,
    rate: true,
    status: true,
    date: true,
  });


  useEffect(() => {
    fetchAttendance().then(setData);
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("my-event");

    channel.bind("myEvent", (data: any) => {
      console.log(JSON.stringify(data))
      fetchAttendance().then(setData);
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to laravel channel!");
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    (data.length > 0) && setLoading(false);
  }, [data]);

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTimeIn = async (event: React.FormEvent) => {
    event.preventDefault()
    const res = await timeIn()

    new Toast({
      position: "bottom-right",
      toastMsg: res.message,
      autoCloseTime: 2000,
      canClose: true,
      showProgress: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      type: (res.status == 'success') ? 'success' : 'error',
      theme: 'dark',
    });
  }

  const handleTimeOut = async (event: React.FormEvent) => {
    event.preventDefault()
    const res = await timeOut()

    new Toast({
      position: "bottom-right",
      toastMsg: res.message,
      autoCloseTime: 2000,
      canClose: true,
      showProgress: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      type: (res.status == 'success') ? 'success' : 'error',
      theme: 'dark',
    });
  }


  const handleSave = (updatedData) => {
    const updatedRows = data.map((row) =>
      row.id === updatedData.id ? updatedData : row
    );
    setData(updatedRows);
  };

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to get sorted data
  const getSortedData = (dataToSort) => {
    if (!sortConfig.key) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      // Handle different data types
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Special cases for columns with more complex data
      if (sortConfig.key === 'id') {
        aValue = a.name ? a.name.toLowerCase() : '';
        bValue = b.name ? b.name.toLowerCase() : '';
      } else if (sortConfig.key === 'in' || sortConfig.key === 'out') {
        // Since we have fixed values for demo, this just maintains order
        return 0;
      } else if (sortConfig.key === 'hour') {
        // If hour values were dynamic, we'd extract them here
        aValue = 490;
        bValue = 490;
      } else if (sortConfig.key === 'rate') {
        aValue = 250.50;
        bValue = 250.50;
      } else if (sortConfig.key === 'status') {
        aValue = 'pending';
        bValue = 'pending';
      } else if (sortConfig.key === 'date') {
        aValue = new Date('2025-03-12');
        bValue = new Date('2025-03-12');
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter the data based on search term
  const filteredRows = data.filter((row) =>
    row.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(row.created_at).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered data
  const sortedRows = getSortedData(filteredRows);

  // Apply pagination to the sorted data
  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  // Get the sort direction icon for a column
  const getSortDirectionIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === 'ascending' ?
      <ArrowUp className="w-3 h-3 ml-1 inline" /> :
      <ArrowDown className="w-3 h-3 ml-1 inline" />;
  };

  // Column mapping for header labels
  const columnLabels = {
    id: "User Details",
    in: "Time In",
    out: "Time Out",
    hour: "Total Hours",
    rate: "Total Rate",
    status: "Status",
    date: "Date"
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Box className='bg-white m-6 p-6 rounded-lg shadow-lg'>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendance Summary</h2>

        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
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

          <div className="flex justify-end items-center gap-2 md:col-span-2">
            <button
              onClick={handleTimeIn}
              className="inline-flex items-center justify-center gap-x-1 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              Time In
            </button>

            <button
              onClick={handleTimeOut}
              className="inline-flex items-center justify-center gap-x-1 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Time Out
            </button>

            <div className="relative">
              <button
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-800 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50 transition-colors duration-200"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Columns
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <div
                className={`absolute top-full right-0 mt-1 z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-48 transition-all duration-200 ease-in-out transform ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <div className="py-2">
                  {Object.keys(visibleColumns).map((col) => (
                    <label
                      key={col}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => handleColumnToggle(col)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2">{columnLabels[col]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <TableContainer component={Paper} className='rounded-lg shadow-md overflow-hidden border border-gray-200'>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                {Object.keys(visibleColumns).map(col =>
                  visibleColumns[col] && (
                    <TableCell
                      key={col}
                      align="center"
                      className="font-medium text-gray-700 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => requestSort(col)}
                    >
                      <div className="flex items-center justify-center">
                        {columnLabels[col]}
                        {getSortDirectionIcon(col)}
                      </div>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row key={row.id} row={row} handleSave={handleSave} visibleColumns={visibleColumns} />
              ))}
              {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} align="center" className="py-8 text-gray-500">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-4">
          <TablePagination
            rowsPerPageOptions={[6, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="text-sm"
          />
        </div>
      </Box>
    </>
  );
}