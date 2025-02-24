import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const TransactionEditModal = ({ open, handleClose, transaction, handleSave }) => {
  const [formData, setFormData] = useState(transaction);

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
      <Box sx={{ width: 400, margin: 'auto', marginTop: '10%', padding: 4, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Edit Transaction</Typography>
        <TextField
          label="Cashier"
          name="cashier"
          value={formData.cashier?.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sub Total Trade"
          name="sub_total_trade"
          value={formData.sub_total_trade}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sub Total Non Trade"
          name="sub_total_non_trade"
          value={formData.sub_total_non_trade}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Grand Total"
          name="grand_total"
          value={formData.grand_total}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default TransactionEditModal;