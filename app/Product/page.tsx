
"use client"
import Navbar from "@/app/comps/header";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import {particulars} from "../../utils/particulars";

export default function DenseTable() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState([]);
  const [date, setDate] = useState( () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  })

  const hanldeDateChange = async (event: React.FormEvent) => {
    event.preventDefault()
    setDate(event.target.value)

    console.log(event.target.value)
  }

  const fetchTotals = async () => {
    try {

        const token = localStorage.getItem('access_token')

        if (!token) {
            console.error("No access token found. Please log in.");
            return; 
        }

        const response = await api.post('/api/transactions/get-by-date',{date: date},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            }
        )

        const transactions = response.data.transactions;
        setTransactions(transactions)

        if(transactions)
        {
            const totals = await api.post('/api/transactions/get-by-date/totals',{date: date},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                }
            )

            setTotals(totals.data.totals)
        }
        
    } catch (error) {
        console.error("Error fetching totals: ",error)
    }
  }

  useEffect(() => {
    fetchTotals();
  },[])

  return (
    <main className="min-h-screen ">
      <Navbar />
      <div className="-6 ml-6">
      <div className="flex justify-start mb-4 mt-6 px-4 md:px-6">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Button
        </button>


        <div className="w-full">
                <label className="block text-sm font-medium ml-6">Input date:</label>
                <input value={date} type="date" name="bpi_dcard" className="w-15 ml-6 p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeDateChange}/>
         </div>
      </div>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Particulars
                </th>
                <th scope="col" className="px-6 py-3">
                    AM
                </th>
                <th scope="col" className="px-6 py-3">
                    MID
                </th>
                <th scope="col" className="px-6 py-3">
                    PM
                </th>
                <th scope="col" className="px-6 py-3">
                    Gross Total
                </th>
                <th scope="col" className="px-6 py-3">
                    Net Total
                </th>
            </tr>
        </thead>
        <tbody>
        {particulars.map(({ key, label }) => {
            // SORT BY TIME
            const amTransact = transactions.find((d) => d.time === "AM");
            const midTransact = transactions.find((d) => d.time === "MID");
            const pmTransact = transactions.find((d) => d.time === "PM");

            console.log(totals)
        
            return (
                <tr key={key}>
                <td className="border border-gray-300 p-2 font-bold">{label}</td>
                <td className="border border-gray-300 p-2">{amTransact ? amTransact[key] : ""}</td>
                <td className="border border-gray-300 p-2">{midTransact ? midTransact[key] : ""}</td>
                <td className="border border-gray-300 p-2">{pmTransact ? pmTransact[key] : ""}</td>
                <td className="border border-gray-300 p-2">{totals[key] ? totals[key].gross : ""}</td>
                <td className="border border-gray-300 p-2"></td>
                </tr>
            );
        })}

            
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>           
            
        </tbody>
    </table>
</div>

    </div>
    </main>
  );
}