'use client';

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
function Row({ row, handleSave }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
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
    setModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const token = localStorage.getItem('access_token');

    try {

      const response = await api.post(`/api/transaction/${row.id}`, { ...editFormData }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log(response.data)

      if (response.data.status === 'success') {
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
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.cashier?.name || 'Unknown'}</TableCell>
        <TableCell align="center">{row.created_at}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">{row.sub_total_trade}</TableCell>
        <TableCell align="right">{row.sub_total_non_trade}</TableCell>
        <TableCell align="right">{row.grand_total}</TableCell>
        <TableCell align="right">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleEditClick}
          >
            EDIT
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-2">
            DELETE
          </button>

          {/* Modal for EDIT */}
          <Modal
            open={modalOpen}
            onClose={() => { setModalOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <h2 className="text-sm font-semibold mb-4">Edit Transaction</h2>

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
                  <button type="button" onClick={() => { setModalOpen(false) }} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
                </div>
              </form>
            </Box>
          </Modal>


        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={15} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex">
              <Box style={{ paddingBottom: 10, paddingTop: 0 }}>
                <Typography variant="h6">Sub Total Trade</Typography>
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
                          <TableCell>{label}:</TableCell>
                          <TableCell>{row[key]}</TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </Box>
              <Box style={{ paddingBottom: 10, paddingTop: 0 }}>
                <Typography variant="h6">Sub Total Non Trade</Typography>
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

// Main Table Component
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

  const handleSave = (updatedData) => {
    const updatedRows = data.map((row) =>
      row.id === updatedData.id ? updatedData : row
    );
    setData(updatedRows);
  };

  const filteredRows = data.filter((row) =>
    row.cashier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
                <TableCell align="center">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Sub-Total Trade</TableCell>
                <TableCell align="right">Sub-Total Non Trade</TableCell>
                <TableCell align="right">Grand Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row key={row.id} row={row} handleSave={handleSave} />
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
    </>
  );
}