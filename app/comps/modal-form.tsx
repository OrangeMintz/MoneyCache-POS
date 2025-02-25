// components/EditModal.js
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ open, handleClose, row, handleSave }) {
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Transaction
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Cashier Name"
          name="cashier.name"
          value={formData.cashier?.name || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Sub Total Trade"
          name="sub_total_trade"
          value={formData.sub_total_trade || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Sub Total Non Trade"
          name="sub_total_non_trade"
          value={formData.sub_total_non_trade || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Grand Total"
          name="grand_total"
          value={formData.grand_total || ''}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}