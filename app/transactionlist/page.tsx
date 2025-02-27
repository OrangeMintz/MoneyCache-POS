'use client';

import Footer from '@/app/comps/footer';
import Navbar from '@/app/comps/header';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
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
import Toast from 'typescript-toastify';
import api from "../../utils/api";
import { formatNumber } from "../../utils/formatter";


async function fetchData() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await api.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data.transactions.reverse() || [];
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
    cashier: row.cashier?.id || 0,
    time: row.time || "",
    cash: row.cash || 0,
    check: row.check || 0,
    bpi_ccard: row.bpi_ccard || 0,
    bpi_dcard: row.bpi_dcard || 0,
    metro_ccard: row.metro_ccard || 0,
    metro_dcard: row.metro_dcard || 0,
    paymaya: row.paymaya || 0,
    aub_ccard: row.aub_ccard || 0,
    gcash: row.gcash || 0,
    food_panda: row.food_panda || 0,
    streetby: row.streetby || 0,
    grabfood: row.grabfood || 0,
    gc_claimed_others: row.gc_claimed_others || 0,
    gc_claimed_own: row.gc_claimed_own || 0,
    mm_head: row.mm_head || "",
    mm_commissary: row.commissary || "",
    mm_rm: row.mm_rm || 0,
    mm_km: row.mm_km || 0,
    mm_dm: row.mm_dm || 0,
    food_charge: row.food_charge || 0,
    z_reading_pos: row.z_reading_pos || 0,
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

      const filteredData = Object.fromEntries(
        Object.entries(editFormData).map(([key, value]) =>
          (value === 0 || value === "0.00") ? [key, null] : [key, value]
        )
      );

      const response = await api.put(`/api/transaction/${row.id}`, { ...filteredData }, {
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

  useEffect(() => {

    const nonTradeTotal = Number(editFormData.mm_rm || 0) + Number(editFormData.mm_km || 0) + Number(editFormData.mm_dm || 0) + Number(editFormData.food_charge || 0);
    const tradeTotal =
      Number(editFormData.cash || 0) +
      Number(editFormData.check || 0) +
      Number(editFormData.bpi_ccard || 0) +
      Number(editFormData.bpi_dcard || 0) +
      Number(editFormData.metro_ccard || 0) +
      Number(editFormData.metro_dcard || 0) +
      Number(editFormData.paymaya || 0) +
      Number(editFormData.aub_ccard || 0) +
      Number(editFormData.gcash || 0) +
      Number(editFormData.food_panda || 0) +
      Number(editFormData.streetby || 0) +
      Number(editFormData.grabfood || 0) +
      Number(editFormData.gc_claimed_others || 0) +
      Number(editFormData.gc_claimed_own || 0)

    setSummary((prevSummary) => ({
      ...prevSummary,
      trade: tradeTotal,
      non_trade: nonTradeTotal,
    }));

  }, [editFormData])


  return (
    <>
      <TableRow>
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
                  <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
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
                    <h2 className="text-sm font-semibold mb-4">Edit Transaction {row.id}</h2>
                  </div>


                  <div className="w-7 h-7 rounded-full bg-green-600 dark:bg-green-500 p-2 flex items-center justify-center mx-auto mb-3.5" style={{ display: `${successIcon}` }}>
                    <svg aria-hidden="true" className="w-11 h-11 text-green-100 dark:text-green-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Success</span>
                  </div>
                </div>

                <form className="space-y-6 p-4" onSubmit={handleEditFormSubmit}>

                  <div className='flex gap-4'>
                    {/* Shift Details */}
                    <div className="border p-4 rounded-md shadow-sm bg-gray-50 w-full">
                      <h2 className="text-sm font-semibold mb-2">Shift Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium">Cashier's Name:</label>
                          <input type="text" name="cashier" value={row.cashier?.name} disabled className="text-xs w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium">Shift Time:</label>
                          <select name="time" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={editFormData.time} disabled>
                            <option value="AM">AM</option>
                            <option value="MID">MID</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border p-4 rounded-md shadow-sm bg-gray-50 w-full">
                      <h2 className="font-semibold text-sm mb-2">Summary:</h2>
                      <div className="w-full">
                        <div className="mb-1 flex w-full ">
                          <label className="block text-xs font-bold w-full">Subtotal Trade POS:</label>
                          <p className="text-xs w-full py-1 overflow-hidden border-gray-300 rounded-md w-full">
                            P {summary.trade.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="mb-1 flex w-full ">
                          <label className="block text-xs font-bold w-full">Subtotal Non-Trade POS:</label>
                          <p className="text-xs w-full py-1 overflow-hidden border-gray-300 rounded-md">
                            P {summary.non_trade.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="mb-1 flex w-full ">
                          <label className="block w-full text-xs font-bold">GRAND TOTAL POS:</label>
                          <p className="text-xs w-full py-1 overflow-hidden border-gray-300 rounded-md">
                            P {(summary.trade + summary.non_trade).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    {/* MM Details */}
                    <div className="border p-4 rounded-md shadow-sm bg-gray-50 w-2/5">
                      <h2 className="text-sm font-semibold mb-2">MM Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                          <label className="block text-xs font-medium">MM head:</label>
                          <input type="text" name="mm_head" placeholder="MM Head" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.mm_head) ? editFormData.mm_head : ""} onChange={handleEditChange} />
                        </div>

                        <div>
                          <label className="block text-xs font-medium">MM Commissary:</label>
                          <input type="text" name="mm_commissary" placeholder="MM Commissary" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.mm_commissary) ? editFormData.mm_commissary : ""} onChange={handleEditChange} />
                        </div>

                        <div>
                          <label className="block text-xs font-medium">MM RM:</label>
                          <input type="number" name="mm_rm" placeholder="MM RM" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.mm_rm) ? editFormData.mm_rm : ""} onChange={handleEditChange} />
                        </div>

                        <div>
                          <label className="block text-xs font-medium">MM DM:</label>
                          <input type="number" name="mm_dm" placeholder="MM DM" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.mm_dm) ? editFormData.mm_dm : ""} onChange={handleEditChange} />
                        </div>

                        <div>
                          <label className="block text-xs font-medium">MM KM:</label>
                          <input type="number" name="mm_km" placeholder="MM KM" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.mm_km) ? editFormData.mm_km : ""} onChange={handleEditChange} />
                        </div>

                        <div>
                          <label className="block text-xs font-medium">Food Charge:</label>
                          <input type="number" name="food_charge" placeholder="Food Charge" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.food_charge) ? editFormData.food_charge : ""} onChange={handleEditChange} />
                        </div>

                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border p-4 rounded-md shadow-sm bg-gray-50 w-3/5">
                      <h2 className="text-sm font-semibold mb-2">Payment Details</h2>
                      <div className='flex gap-4'>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">

                          <div>
                            <label className="block text-xs font-medium">Cash:</label>
                            <input type="number" name="cash" placeholder="Cash" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.cash) ? editFormData.cash : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Check:</label>
                            <input type="number" name="check" placeholder="Check" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.check) ? editFormData.check : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">BPI Credit:</label>
                            <input type="number" name="bpi_ccard" placeholder="BPI Credit Card" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.bpi_ccard) ? editFormData.bpi_ccard : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">BPI Debit:</label>
                            <input type="number" name="bpi_dcard" placeholder="BPI Debit Card" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.bpi_dcard) ? editFormData.bpi_dcard : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Metro Credit:</label>
                            <input type="number" name="metro_ccard" placeholder="Metro Credit Card" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.metro_ccard) ? editFormData.metro_ccard : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Metro Debit:</label>
                            <input type="number" name="metro_dcard" placeholder="Metro Debit Card" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.metro_dcard) ? editFormData.metro_dcard : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">AUB Credit:</label>
                            <input type="number" name="aub_ccard" placeholder="Aub Credit Card" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.aub_ccard) ? editFormData.aub_ccard : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Paymaya:</label>
                            <input type="number" name="paymaya" placeholder="Paymaya" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.paymaya) ? editFormData.paymaya : ""} onChange={handleEditChange} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
                          <div>
                            <label className="block text-xs font-medium">Gcash:</label>
                            <input type="number" name="gcash" placeholder="GCash" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.gcash) ? editFormData.gcash : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Foodpanda:</label>
                            <input type="number" name="food_panda" placeholder="Foodpanda" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.food_panda) ? editFormData.food_panda : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Street By:</label>
                            <input type="number" name="streetby" placeholder="Street By" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.streetby) ? editFormData.streetby : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Grab Food:</label>
                            <input type="number" name="grabfood" placeholder="Grab Food" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.grabfood) ? editFormData.grabfood : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">GC Others:</label>
                            <input type="number" name="gc_claimed_others" placeholder="GC Others" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.gc_claimed_others) ? editFormData.gc_claimed_others : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">GC Own:</label>
                            <input type="number" name="gc_claimed_own" placeholder="GC Own" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.gc_claimed_own) ? editFormData.gc_claimed_own : ""} onChange={handleEditChange} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium">Z Reading POS:</label>
                            <input type="number" name="z_reading_pos" placeholder="Z Reading POS" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={(editFormData.z_reading_pos) ? editFormData.z_reading_pos : ""} onChange={handleEditChange} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="mt-6 flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                    <button type="button" onClick={() => { seteditModalOpen(false) }} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
                  </div>
                </form>
              </Box>
            </Modal>
          </TableCell>
        }

      </TableRow >
      <TableRow>
        <TableCell colSpan={15} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-b-md shadow-b-md p-8 mb-5 gap-9">
              <Box style={{ paddingBottom: 10, paddingTop: 0 }} className='col-span-1'>
                <Typography variant="h6"><span className='text-sm font-semibold'>Sub Total Trade</span></Typography>
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
                    ].map(({ key, label }) =>
                      row[key] !== null && row[key] !== undefined ? (
                        <TableRow key={key}>
                          <TableCell><span className='text-xs'>{label}:</span></TableCell>
                          <TableCell><span className='text-xs'>{row[key]}</span></TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </Box>
              <Box style={{ paddingBottom: 10, paddingTop: 0 }} className='col-span-1'>
                <Typography variant="h6"><span className='text-sm font-semibold'>Sub Total Non Trade</span></Typography>
                <Table size="small">
                  <TableBody>
                    {[
                      { key: "mm_head", label: "MM-Head Office" },
                      { key: "mm_commissary", label: "MM-Commissary" },
                      { key: "mm_rm", label: "MM-RM" },
                      { key: "mm_dm", label: "MM-DM" },
                      { key: "mm_km", label: "MM-KM" },
                      { key: "food_charge", label: "Food Charge" },
                      { key: "z_reading_pos", label: "Z Reading POS" },
                      { key: "over_pos", label: "Over POS" },
                    ].map(({ key, label }) =>
                      row[key] !== null && row[key] !== undefined ? (
                        <TableRow key={key}>
                          <TableCell><span className='text-xs'>{label}:</span></TableCell>
                          <TableCell><span className='text-xs'>{row[key]}</span></TableCell>
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

// Main Table Component
export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
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
    className="inline-flex  justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" 
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
    <svg className="w-2.5 h-5.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>
  
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
                {visibleColumns.cashier && <TableCell>Cashier</TableCell>}
                {visibleColumns.date && <TableCell align='center'>Date</TableCell>}
                {visibleColumns.time && <TableCell align='center'>Time</TableCell>}
                {visibleColumns.trade && <TableCell align='center'>Sub-Total Trade</TableCell>}
                {visibleColumns.nonTrade && <TableCell align='center'>Sub-Total Non Trade</TableCell>}
                {visibleColumns.grandTotal && <TableCell align='center'>Grand Total</TableCell>}
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
      <Footer/>
      </div>
    </>
 
  );
}