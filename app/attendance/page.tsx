'use client';

import { fetchAttendance, timeIn, timeOut } from '@/utils/fetch';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from 'react';
import Toast from 'typescript-toastify';
import Preloader from '../comps/preloader';
import { formatTime, formatDate } from '@/utils/formatter';
import Pusher from 'pusher-js';

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
              <span className="text-xs mt-0.5 px-2 py-0.5 bg-gray-100 rounded-full inline-block">{row.user?.id}</span> {/* default search value is id, i change ra by role */}

            </div>
          </div>
        </TableCell>}
        {visibleColumns.in && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-green-700 bg-green-100'>{formatTime(row.created_at)}</span></TableCell>}
        {visibleColumns.out && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-purple-700 bg-purple-100'>{formatTime(row.timeOut)}</span></TableCell>}
        {visibleColumns.hour && <TableCell align="center"><span className='text-xs'>{row.totalHours || "N/A"}</span></TableCell>}
        {visibleColumns.rate && <TableCell align="center"><span className='px-2 py-1 font-semibold leading-tight rounded-md text-xs text-green-700 bg-green-100'>{row.totalRate || "N/A"}</span></TableCell>}
        {visibleColumns.status && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.status == 'early') ? 'text-green-700 bg-green-100' : (row.status == 'early') ? 'text-blue-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>{row.status}</span></TableCell>}
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

  const filteredRows = data.filter((row) =>
    row.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(row.created_at).toString().toLowerCase().includes(searchTerm.toLocaleLowerCase())
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
        <h2 className="text-2xl font-semibold dark:text-white mb-3">Attendance Summary</h2>

        <div className='grid grid-cols-5 flex'>

          <div className='col-span-3 '>
            <input
              type="text"
              placeholder="Search by Date or Cashier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" mb-4 text-sm p-2 border rounded w-1/4"
            />
          </div>


          <div className="mb-4 flex justify-end col-span-2 relative">

            <div>
              <button
                id="TimeInButton"
                onClick={handleTimeIn}
                className="inline-flex items-center justify-center gap-x-1 md:mr-1 rounded-md bg-green-400 sm:px-3 sm:py-3 text-xs font-normal text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-opacity-10"
              >
                <LogIn className="w-4 h-4" />
                Time In
              </button>

            </div>
            <div>
              <button
                id="TimeInButton"
                onClick={handleTimeOut}
                className="inline-flex items-center justify-center gap-x-1 md:mr-1 rounded-md bg-red-400 sm:px-3 sm:py-3 text-xs font-normal text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-opacity-10"
              >
                <LogOut className="w-4 h-4" />
                Time Out
              </button>
            </div>
            <button
              id="dropdownDefaultButton"
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-normal text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Visibility
              <svg
                className="w-2.5 h-5.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
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
                {visibleColumns.id && <TableCell align="center">User Details</TableCell>}
                {visibleColumns.in && <TableCell align="center">Time In</TableCell>}
                {visibleColumns.out && <TableCell align='center'>Time Out</TableCell>}
                {visibleColumns.hour && <TableCell align='center'>Total Hours</TableCell>}
                {visibleColumns.rate && <TableCell align='center'>Total Rate</TableCell>}
                {visibleColumns.status && <TableCell align='center'>Status</TableCell>}
                {visibleColumns.date && <TableCell align='center'>Date</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row key={row.id} row={row} visibleColumns={visibleColumns} />
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