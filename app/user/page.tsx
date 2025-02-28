'use client';

import Footer from '@/app/comps/footer';
import Navbar from '@/app/comps/header';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Toast from 'typescript-toastify';
import api from "../../utils/api";


async function fetchData() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log(response.data)
    return response.data.users.reverse() || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

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
    role: row.role || ""
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

  // const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   setEditFormData({
  //     ...editFormData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleDeletSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const token = localStorage.getItem('access_token')

    try {
      const response = await api.delete(`/api/transaction/${row.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data)

      if (response.data.status === 'success') {
        setSuccessIcon('')
        new Toast({
          position: "top-right",
          onClose: () => { window.location.href = "/transactionlist"; },
          toastMsg: "Successfully deleted transaction!",
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
          position: "top-right",
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


      const response = await api.put(`/api/transaction/${row.id}`, { ...editFormData }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log(response.data)

      if (response.data.status === 'success') {
        setSuccessIcon('')
        new Toast({
          position: "top-right",
          onClose: () => { window.location.href = "/transactionlist"; },
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
          position: "top-right",
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
      <TableRow>
        <TableCell>
        </TableCell>
        {visibleColumns.id && <TableCell><span className='text-xs'>{row.id}</span></TableCell>}
        {visibleColumns.name && <TableCell><span className='text-xs'>{row.name || 'Unknown'}</span></TableCell>}
        {visibleColumns.email && <TableCell align="center"><span className='text-xs'>{row.email}</span></TableCell>}
        {visibleColumns.role && <TableCell align="center"><span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(row.role == 'admin') ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-gray-100'}`}>{row.role}</span></TableCell>}
        {visibleColumns.actions &&
          <TableCell align="center">
            <button
              className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
              onClick={handleEditClick}
            >
              <span className='text-xs'>Edit</span>
            </button>
            <button onClick={handleDeleteClick} className="px-4 text-xs py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-2">
              <span className='text-xs'>Delete</span>
            </button>

            {/* Delete Modal */}
            <Modal
              open={deleteModalOpen}
              onClose={() => { setdeleteModalOpen(false) }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={deleteModalStyle}>

                <div className="relative p-4 text-center bg-white dark:bg-gray-800 sm:p-5">
                  <button onClick={() => setdeleteModalOpen(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className='flex items-center justify-center h-full w-full'>
                    <Image
                      src="/images/loading.gif"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </div>
                  <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete transaction {row.id}?</p>
                  <div className="flex justify-center items-center space-x-4">
                    <button onClick={() => { setdeleteModalOpen(false) }} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                      No, cancel
                    </button>
                    <form onSubmit={handleDeletSubmit}>
                      <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Yes, I'm sure
                      </button>
                    </form>

                  </div>
                </div>
              </Box>
            </Modal>

            {/* Modal for EDIT */}
            <Modal
              open={editModalOpen}
              onClose={() => { seteditModalOpen(false) }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={ediModalStyle}>
                <div className='flex w-full'>
                  <div className='w-5/6'>
                    <h2 className="text-sm font-semibold mb-4">Edit User {row.id}</h2>
                  </div>


                  <div className="w-7 h-7 rounded-full bg-green-600 dark:bg-green-500 p-2 flex items-center justify-center mx-auto mb-3.5" style={{ display: `${successIcon}` }}>
                    <svg aria-hidden="true" className="w-11 h-11 text-green-100 dark:text-green-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Success</span>
                  </div>
                </div>


              </Box>
            </Modal>
          </TableCell>
        }
      </TableRow >
    </>
  );
}

// Main Table Component
export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    role: true,
    actions: true,
  });

  useEffect(() => {
    fetchData().then(setData);
  }, []);

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

  return (
    <>
      <Navbar />
      <Box className='bg-gray-100 m-6 p-6 rounded-md shadow-md'>
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
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex  justify-center gap-x-1 rounded-md bg-white sm:px-3 sm:py-3 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              type="button"
              onClick={() => {
                const dropdown = document.getElementById('dropdownContent');
                dropdown.classList.toggle('hidden');
                dropdown.classList.toggle('opacity-0');
                dropdown.classList.toggle('opacity-100');
                dropdown.classList.toggle('translate-y-0');
                dropdown.classList.toggle('-translate-y-2');
              }}
            >
              Visibility
              <svg className="md:w-2.5 md:h-5.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>


            <div>
                <button  
                      id="AddModal" 
                      className='inline-flex justify-center gap-x-1 md:ml-1 rounded-md bg-green-600 sm:px-3 sm:py-3 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-opacity-10'
                      onClick={() => {
                        const modal = document.getElementById('default-modal');
                        modal.classList.toggle('hidden');
                      }}
                    >
                      Add User
                    </button>
                  </div>
                    
                  <div id="default-modal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 md:p6 w-full max-w-2xl max-h-full">
                      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                          <h3 className="text-xl md:ml-7 font-semibold text-gray-900 dark:text-white">
                           Add User 
                          </h3>
                          <button 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                            onClick={() => {
                              document.getElementById('default-modal').classList.add('hidden');
                            }}
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                      
                        <div className="md:p-7 space-y-4">
                          <form className="p-4 md:p-5" action="">
                            <div className='md:mb-4'>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Name: </label>
                              <input type="text" name="name" placeholder='Enter your name...' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'  />
                            </div>
                            <div className='md:mb-4'>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Email: </label>
                              <input type="email" name="email" placeholder='Enter your email...' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' />
                            </div>
                            <div className='md:mb-4'>
                            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role: </label>
                                <select id="countries" name='role' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                  <option className='opacity-50' selected>Choose a role...</option>
                                  <option value="admin">Admin</option>
                                  <option value="cashier">Cashier</option>
                                </select>
                            </div>
                            
                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                              <button 
                                type="button" 
                                className="text-white bg-green-500 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Add User
                              </button>
                              <button 
                                type="button" 
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                  document.getElementById('default-modal').classList.add('hidden');
                                }}
                              >
                                Decline
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
            
            <div
              id="dropdownContent"
              className="hidden opacity-0 -translate-y-2 absolute top-full right-0 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 sm:w-48 md:w-56 dark:bg-gray-700 transition-all duration-300 ease-in-out transform"
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
                {visibleColumns.name && <TableCell>Name</TableCell>}
                {visibleColumns.email && <TableCell align='center'>Email</TableCell>}
                {visibleColumns.role && <TableCell align='center'>Role</TableCell>}
                {visibleColumns.actions && <TableCell align='center'>Actions</TableCell>}
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
        <Footer />
      </div>
    </>

  );
}