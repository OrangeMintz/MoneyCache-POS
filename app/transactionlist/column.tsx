"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
  {
    accessorKey: "cashier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cashier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "cash",
    header: "Cash",
  },
  {
    accessorKey: "check",
    header: "Check",
  },
  {
    accessorKey: "bpi_credit_ccard",
    header: "BPI Credit Card",
  },
  {
    accessorKey: "bpi_debit_ccard",
    header: "BPI Debit Card",
  },
  {
    accessorKey: "metro_credit_ccard",
    header: "Metro Credit Card",
  },
  {
    accessorKey: "metro_debit_ccard",
    header: "Metro Debit Card",
  },
  {
    accessorKey: "paymaya",
    header: "Pay Maya",
  },
  {
    accessorKey: "aub_credit_ccard",
    header: "AUB Credit Card",
  },
  {
    accessorKey: "gcash",
    header: "GCash",
  },
  {
    accessorKey: "foodpanda",
    header: "Food Panda",
  },
  {
    accessorKey: "streetby",
    header: "StreetBy",
  },
  {
    accessorKey: "grabfood",
    header: "Grab Food",
  },
  {
    accessorKey: "gc_claimed",
    header: "GC Claimed (others)",
  },
  {
    accessorKey: "gc_claimedd",
    header: "GC Claimed (owned)",
  },

  
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white h-8 w-20 rounded">
            Edit
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white h-8 w-20 rounded">
            Delete
          </Button>
        </div>
      );
    },
  }
  
]