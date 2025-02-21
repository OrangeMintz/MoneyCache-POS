"use client";

import Navbar from "@/app/comps/header";
import Preloader from "@/app/comps/preloader";
import { useEffect, useState } from "react";
import { Payment, columns } from "./column";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Ensure preloader appears immediately

    async function fetchData() {
      try {
        const payments: Payment[] = await getData();
        setData(payments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Add delay for visibility
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

async function getData(): Promise<Payment[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
        { id: "728ed52z", amount: 100, status: "success", email: "d@example.com" },
        { id: "728ed52m", amount: 100, status: "failed", email: "n@example.com" },
      ]);
    }, 2000) // Simulate API delay
  );
}
