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
import Image from 'next/image';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
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
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (e) => {
    e.preventDefault();
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    setCapturedImage(null); // This will clear the captured image
  };
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
              onClick={() => {
                setIsCameraOpen(true);
                setCapturedImage(null); // Reset any previously captured image
              }}
              className="inline-flex items-center justify-center gap-x-1 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              Time In
            </button>
            {/* this is a Time in button */}
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
                id="dropdownContent"
                className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50 ${isCameraOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"
                  }`}
              >
                <div className="relative p-4 md:p-6 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      {/* Remove the md:ml-1 class and add text-center w-full */}
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center w-full">Selfie Attendance</h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setIsCameraOpen(false)}
                      >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    {/* Add Form */}
                    <div className="p-4 md:p-5">
                      {/* User Card */}
                      <div className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="flex items-center justify-between p-4">
                          {/* Left side - User info with icon */}
                          <form className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-8">
                            <div className="flex flex-col items-center w-full gap-8">
                              {isCameraOpen && !capturedImage && (
                                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex justify-center items-center">
                                  <Webcam
                                    ref={webcamRef}
                                    screenshotFormat="image/png"
                                    className="absolute min-w-full min-h-full object-cover"
                                    width={320}
                                    height={320}
                                  />
                                </div>
                              )}

                              {isCameraOpen && !capturedImage && (
                                <div className="flex items-center space-x-4 w-full justify-center">
                                  <button
                                    type="button"
                                    onClick={handleCapture}
                                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg font-medium shadow-md transition-all duration-200 flex items-center"
                                  >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Capture Image
                                  </button>
                                </div>
                              )}

                              {capturedImage && (
                                <div className="mt-2 flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md w-full">
                                  <p className="text-xl font-semibold text-gray-800 mb-4">Captured Image</p>
                                  <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-green-500 shadow-lg flex justify-center items-center">
                                    <Image src={capturedImage} alt="Captured" width={320} height={320} className="w-full h-full object-cover" />
                                  </div>

                                  <div className="mt-6 flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCapturedImage(null);
                                      }}
                                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg mr-3 transition-colors duration-200"
                                    >
                                      Retake
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleTimeIn(e);
                                        // Close the modal and reset the captured image
                                        setIsCameraOpen(false);
                                        setCapturedImage(null);
                                      }}
                                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center"
                                    >
                                      <LogIn className="w-4 h-4 mr-2" />
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


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