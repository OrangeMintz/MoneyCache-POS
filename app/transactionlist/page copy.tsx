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

// Modal Component
function EditModal({ open, handleClose, row, handleSave }) {
  const [formData, setFormData] = useState(row);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 bg-white p-6 shadow-lg rounded-md">
    <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>

    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {/* Cashier Name and Shift Time */}
        <div className="w-30">
          <label className="block text-sm font-medium">Cashier's Name:</label>
          <input type="text" name="cashier" value={formData.cashier || ''} disabled className="w-full p-2 border border-gray-300 rounded-md" />
          <div className="w-full">
          <label className="block text-sm font-medium">Shift Time:</label>
          <select name="time" value={formData.time || 'AM'} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="AM">AM</option>
            <option value="MID">MID</option>
            <option value="PM">PM</option>
          </select>
        </div>
        </div>
      

        {/* Summary Section */}
        <div className="w-full">
          <label className="block text-sm font-medium">Subtotal Trade POS:</label>
          <input type="number" name="sub_total_trade" value={formData.sub_total_trade || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Subtotal Non-Trade POS:</label>
          <input type="number" name="sub_total_non_trade" value={formData.sub_total_non_trade || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Grand Total POS:</label>
          <input type="number" name="grand_total" value={formData.grand_total || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>

        {/* MM Details - Each Field Separated */}
        <div className="w-full">
          <label className="block text-sm font-medium">MM Head:</label>
          <input type="number" name="mm_head" value={formData.mm_head || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
          <label className="block text-sm font-medium">MM Commissary:</label>
          <input type="number" name="mm_commissary" value={formData.mm_commissary || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">MM Commissary:</label>
          <input type="number" name="mm_commissary" value={formData.mm_commissary || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">MM RM:</label>
          <input type="number" name="mm_rm" value={formData.mm_rm || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">MM DM:</label>
          <input type="number" name="mm_dm" value={formData.mm_dm || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">MM KM:</label>
          <input type="number" name="mm_km" value={formData.mm_km || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Food Charge:</label>
          <input type="number" name="food_charge" value={formData.food_charge || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>

       
        <div className="w-full">
          <label className="block text-sm font-medium">Cash:</label>
          <input type="number" name="cash" value={formData.cash || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Check:</label>
          <input type="number" name="check" value={formData.check || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">BPI Credit Card:</label>
          <input type="number" name="bpi_ccard" value={formData.bpi_ccard || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">BPI Debit Card:</label>
          <input type="number" name="bpi_dcard" value={formData.bpi_dcard || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Metro Credit Card:</label>
          <input type="number" name="metro_ccard" value={formData.metro_ccard || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Metro Debit Card:</label>
          <input type="number" name="metro_dcard" value={formData.metro_dcard || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        <button type="button" onClick={handleClose} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
      </div>
    </form>
  </div>
</Modal>

  
  );
}

// Row Component
function Row({ row, handleSave }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
  };

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
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleEditClick}
          >
            EDIT
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-2">
            DELETE
          </button>
        </TableCell>
      </TableRow>
      <EditModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        row={row}
        handleSave={handleSave}
      />
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