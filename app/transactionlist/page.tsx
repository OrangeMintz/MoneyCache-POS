"use client";
import { useEffect, useState } from "react";
import Navbar from "../comps/header";
import Preloader from "../comps/preloader";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    const initializeDataTable = async () => {
      try {
        await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
        await loadScript("https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js");

        // Wait until jQuery and DataTables are available
        const interval = setInterval(() => {
          if (typeof (window as any).$ !== "undefined" && (window as any).$.fn.DataTable) {
            clearInterval(interval);
            (window as any).$("#example").DataTable();
          }
        }, 100);
      } catch (error) {
        console.error("Script load error:", error);
      }
    };

    initializeDataTable();

    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Include DataTables CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css"
      />

      <div className="overflow-x-auto p-4">
        <table id="example" className="min-w-full border-collapse border border-gray-300 display">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2">Cashier</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Cash</th>
              <th className="border border-gray-300 px-4 py-2">Check</th>
              <th className="border border-gray-300 px-4 py-2">BPI Credit Card</th>
              <th className="border border-gray-300 px-4 py-2">BPI Debit Card</th>
              <th className="border border-gray-300 px-4 py-2">Metro Credit Card</th>
              <th className="border border-gray-300 px-4 py-2">Metro Debit Card</th>
              <th className="border border-gray-300 px-4 py-2">Pay Maya</th>
              <th className="border border-gray-300 px-4 py-2">AUB Credit Card</th>
              <th className="border border-gray-300 px-4 py-2">Gcash</th>
              <th className="border border-gray-300 px-4 py-2">Food Panda</th>
              <th className="border border-gray-300 px-4 py-2">StreetBy</th>
              <th className="border border-gray-300 px-4 py-2">Grab Food</th>
              <th className="border border-gray-300 px-4 py-2">GC Claimed (Others)</th>
              <th className="border border-gray-300 px-4 py-2">GC Claimed (owned)</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2"></td>
              <td className="border border-gray-300 px-4 py-2">Name</td>
              <td className="border border-gray-300 px-4 py-2">Position</td>
              <td className="border border-gray-300 px-4 py-2">Office</td>
              <td className="border border-gray-300 px-4 py-2">Salary</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Page;
