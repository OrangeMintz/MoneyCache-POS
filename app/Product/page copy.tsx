'use client';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,  }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
            <TableCell>Particulars</TableCell>
            <TableCell align="center">AM</TableCell>
            <TableCell align="center">MID</TableCell>
            <TableCell align="center">PM</TableCell>
            <TableCell align="center">GROSS TOTAL</TableCell>
            <TableCell align="center">NET TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
              <TableRow 
                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
              >
                <TableCell>Amiel</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">4</TableCell>
                <TableCell align="center">4</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}