
"use client"
import Navbar from "@/app/comps/header";
import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuIcon } from "lucide-react";
import { useState } from "react";



export default function DenseTable() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState( () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  })

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


  const hanldeDateChange = async (event: React.FormEvent) => {
    event.preventDefault()
    setDate(event.target.value)

    console.log(event.target.value)
  }

  const fetchTotals = async () => {
    try {
        
    } catch (error) {
        console.error("Error fetching totals: ",error)
    }
  }


  return (
    <main className="min-h-screen ">
      <Navbar />
      <div className="border  mr-6 ml-6">
      <div className="flex justify-start mb-4 mt-6 px-4 md:px-6">
        <Button
          variant="contained"
          color="primary"
          startIcon={<MenuIcon />}
          onClick={handleMenuToggle}
          className="flex items-center"
        >
          Download
        </Button>


        <div className="w-full">
                <label className="block text-sm font-medium ml-6">Input date:</label>
                <input value={date} type="date" name="bpi_dcard" className="w-15 ml-6 p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeDateChange}/>
         </div>
      </div>
    <TableContainer component={Paper} className="mt-6 md:mr-6">
      <Table sx={{ minWidth: 650,  }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
            <TableCell><strong>PARTICULARS</strong></TableCell>
            <TableCell align="center"><strong>AM</strong></TableCell>
            <TableCell align="center"><strong>MID</strong></TableCell>
            <TableCell align="center"><strong>PM</strong></TableCell>
            <TableCell align="center"><strong>GROSS TOTAL</strong></TableCell>
            <TableCell align="center"><strong>NET TOTAL</strong></TableCell>
          </TableRow>
        </TableHead>


        <TableBody sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>     
        <TableRow>
            <TableCell>Cashier&apos; s Name</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cash</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Check</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>BPI Credit Card</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>BPI Debit Card</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Metro Credit Card</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Metro Debit Card</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pay Maya</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>AUB Credit Card</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gcash</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Food Panda</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Street By</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Grab Food</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GC Claimed(Others)</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GC Claimed(Owned)</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>A/R_________</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>A/R_________</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow >
            <TableCell><strong>SUB-TOTAL TRADE POS</strong></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MM-HEAD OFFICE</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>MM-COMISSARY</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>MM-________</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>MM-RM</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>MM-DM</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>MM-KM</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>FOOD CHARGE</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
          <TableRow>
          <TableCell><strong>SUB-TOTAL NONTRADE POS</strong></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell><strong>GRAND TOTAL POS</strong></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Z READING POS</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
            <TableRow>
            <TableCell><strong> <i>SHORT/OVER POS</i></strong></TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            <TableCell align="center">Amiel</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </main>
  );
}