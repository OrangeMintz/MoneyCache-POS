'use client';

import { fetchUsers } from '@/utils/fetch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from 'react';
import Toast from 'typescript-toastify';
import api from "../../utils/api";
import Preloader from '../comps/preloader';
s

// Row Component
function Row({ row, handleSave, visibleColumns }) {
  const [open, setOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [successIcon, setSuccessIcon] = useState('none')

  const ediModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 6
  }

  const deleteModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 6
  }

  const [editFormData, setEditFormData] = useState({
    name: row.name || "",
    email: row.email || "",
    role: row.role || "",
    password: null
  });

  const [summary, setSummary] = useState({
    trade: 0,
    non_trade: 0,
    grand_total: 0,
  })

  const handleEditClick = () => {
    seteditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setdeleteModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleDeletSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const token = localStorage.getItem('access_token')

    try {
      const response = await api.delete(`/api/users/${row.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data)

      if (response.data.status === 'success') {
        setSuccessIcon('')
        new Toast({
          position: "bottom-right",
          onClose: () => { window.location.href = "/user"; },
          toastMsg: "Successfully deleted user!",
          autoCloseTime: 1000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "success",
          theme: 'dark',
        });
      } else {
        new Toast({
          position: "bottom-right",
          toastMsg: response.data.message,
          autoCloseTime: 1000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "error",
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error("Error deleting transaction: ", error)
    }
  }

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const token = localStorage.getItem('access_token');

    try {

      const response = await api.put(`/api/users/${row.id}`, { ...editFormData }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log(response.data)

      if (response.data.status === 'success') {
        setSuccessIcon('')
        new Toast({
          position: "bottom-right",
          onClose: () => { window.location.href = "/user"; },
          toastMsg: "Successfully stored transaction!",
          autoCloseTime: 1000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "success",
          theme: 'dark',
        });
      } else {
        new Toast({
          position: "bottom-right",
          toastMsg: response.data.message,
          autoCloseTime: 1000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "error",
          theme: 'dark',
        });
      }

    } catch (error) {
      console.error("Error updating transaction: ", error)
      new Toast({
        position: "top-right",
        toastMsg: "Error updating transaction",
        autoCloseTime: 1000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: 'dark',
      });
    }
  }


  return (
    <>
<TableRow
  className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
>
   <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
  
          </TableCell>
  {visibleColumns.id && <TableCell align='center'><span className='text-xs'>{row.name}</span></TableCell>}
  {visibleColumns.email && <TableCell align="center">
    {row.status === 'success' ? (
      <span className='text-blue-500 flex justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </span>
    ) : (
      <span className='text-red-500 flex justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </span>
    )}
  </TableCell>}
  {visibleColumns.name && <TableCell align='center'>
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
      row.status === 'deleted' ? 'text-red-700 bg-red-100' : 
      row.status === 'updated' ? 'text-amber-700 bg-amber-100' : 
      row.status === 'added' ? 'text-green-700 bg-green-100' : 
      'text-gray-700 bg-gray-100'
    }`}>
      {row.status === 'deleted' ? 'Deleted' : 
       row.status === 'updated' ? 'Updated' : 
       row.status === 'added' ? 'Added' : 
       'Deleted'}
    </span>
  </TableCell>}
  {visibleColumns.email && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.role == 'admin') ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>admin</span></TableCell>}
  {visibleColumns.role && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.role == 'admin') ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>this Message is a default message just for displaying dis nuts</span></TableCell>}
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
  const [addModalView, setAddModalView] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    role: true,
    actions: true,
  });
  const [addForm, setAddForm] = useState({
    name: null,
    email: null,
    role: null
  })

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUsers().then(setData);
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
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.id.toString().toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleAddUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('access_token')

      console.log(addForm)

      const response = await api.post("/api/users", { ...addForm }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.status === 'success') {
        new Toast({
          position: "bottom-right",
          onClose: () => { window.location.href = "/user"; },
          toastMsg: "Successfully stored transaction!",
          autoCloseTime: 2000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "success",
          theme: 'dark',
        });
      } else {
        new Toast({
          position: "bottom-right",
          toastMsg: response.data.message,
          autoCloseTime: 1000,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "error",
          theme: 'dark',
        });
      }

    } catch (error) {
      console.error("Error adding user: ", error)
      new Toast({
        position: "bottom-right",
        toastMsg: "Error adding user",
        autoCloseTime: 1000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: 'dark',
      });
    }
  }

  if (loading) {
    return <Preloader />
  }

  return (
    <>
      <Box className='bg-gray-100 m-6 p-6 rounded-md shadow-md'>
        <h2 className="text-2xl font-semibold dark:text-white mb-3">Activity Logs</h2>

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
                {visibleColumns.id && <TableCell align='center'>User Name</TableCell>}
                {visibleColumns.name && <TableCell align='center'>Status</TableCell>}
                {visibleColumns.email && <TableCell align='center'>Type</TableCell>}
                {visibleColumns.email && <TableCell align='center'>Role</TableCell>}
                {visibleColumns.role && <TableCell align='center'>Message</TableCell>}
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