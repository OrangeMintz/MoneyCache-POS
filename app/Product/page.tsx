"use client"
import Preloader from "@/app/comps/preloader"; // Import the Preloader component
import { formatNumber } from "@/utils/formatter";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { particulars } from "../../utils/particulars";

export default function DenseTable() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selected_date') || today;
    }
    return today;
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const handleDateChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setDate(event.target.value);

    // Save date status
    localStorage.setItem('selected_date', event.target.value);
    const newDate = localStorage.getItem('selected_date');

    setTotals([]);
    setTransactions([]);
    await fetchTotals(newDate); // Ensure fetchTotals is awaited
  };

  const fetchTotals = async (passedDate) => {
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.error("No access token found. Please log in.");
        return;
      }

      const response = await api.post('/api/transactions/get-by-date', { date: passedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        }
      );

      const transactions = response.data.transactions;

      if (transactions) {
        const totals = await api.post('/api/transactions/get-by-date/totals', { date: passedDate },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            }
          }
        );

        console.log("redbone", transactions)
        setTotals(totals.data.totals);
        setTransactions(transactions);
      }
    } catch (error) {
      console.error("Error fetching totals: ", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.get(`/api/transactions/pdf?date=${date}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      // Create a Blob URL
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `transactions_${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error generating PDF file: ", error);
    }
  }

  const downloadCsv = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('access_token');
      const response = await api.post('/api/transactions/csv', { date: date },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob'
        }
      );

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `transactions_${date}.csv`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating CSV file: ", error);
    }
  };

  useEffect(() => {
    fetchTotals(localStorage.getItem('selected_date') || new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    console.log(transactions)
  }, [transactions])

  if (loading) {
    return <Preloader />; // Show preloader while loading
  }

  return (
    <div>
      <main className="min-h-screen ">
        <div className="p-8">
          <div className="flex justify-start mb-4 px-4 md:px-6">
            <form onSubmit={downloadCsv}>
              <button type="submit" className="text-xs h-10 bg-green-500 hover:bg-green-300 text-white font-semibold py-2 px-6 border  rounded shadow">
                CSV
              </button>
            </form>
            <div className="w-full">
              <input value={date} type="date" name="bpi_dcard" className="w-15 text-xs h-10 ml-2 p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleDateChange} />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <th scope="col" className="px-6 py-3 bg-blue-200">
                    Gross Total
                  </th>
                  <th scope="col" className="px-6 py-3 bg-green-200">
                    Net Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {particulars.map(({ key, label }) => {
                  const amTransact = transactions.find((d) => d.time === "AM");
                  const midTransact = transactions.find((d) => d.time === "MID");
                  const pmTransact = transactions.find((d) => d.time === "PM");
                  const bgGross = (key == 'sub_total_trade' || key == 'sub_total_non_trade') ? "bg-yellow-300" : (key == 'grand_total') ? "bg-yellow-400" : "bg-blue-200";
                  const bgNet = (key == 'sub_total_trade' || key == 'sub_total_non_trade') ? "bg-yellow-300" : (key == 'grand_total') ? "bg-yellow-400" : "bg-green-200";
                  const bgTD = (key == 'sub_total_trade' || key == 'sub_total_non_trade') ? "bg-yellow-300" : (key == 'grand_total') ? "bg-yellow-400" : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800";

                  return (
                    <tr key={key} className={` ${bgTD} text-gray-800 border-b dark:border-gray-700 border-gray-200`}>
                      <td className="border border-gray-300 p-2 font-bold">{label}</td>
                      <td className="border border-gray-300 p-2">{key == "cashier" ? (amTransact ? amTransact['cashier'].name : "") : (amTransact && amTransact[key] !== null ? '₱ ' + formatNumber(amTransact[key]) : "")}</td>
                      <td className="border border-gray-300 p-2">{key == "cashier" ? (midTransact ? midTransact['cashier'].name : "") : (midTransact && midTransact[key] !== null ? '₱ ' + formatNumber(midTransact[key]) : "")}</td>
                      <td className="border border-gray-300 p-2">{key == "cashier" ? (pmTransact ? pmTransact['cashier'].name : "") : (pmTransact && pmTransact[key] !== null ? '₱ ' + formatNumber(pmTransact[key]) : "")}</td>
                      <td className={`border border-white p-2 ${bgGross}`}>{totals[key] && totals[key].gross !== 0 ? '₱ ' + formatNumber(totals[key].gross) : ""}</td>
                      <td className={`border ${bgNet} border-white p-2`}>{totals[key] && totals[key].net !== 0 ? '₱ ' + formatNumber(totals[key].net) : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='border-t'>
        </div>
      </main>

    </div>
  );
}