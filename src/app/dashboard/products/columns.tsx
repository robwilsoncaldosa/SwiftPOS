"use client";
import { Button } from "@/components/ui/button";
import FinalOrderDialog from "@/components/ui/FinalOrderDialog";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ReceiptText } from "lucide-react";
import Link from "next/link";


interface ProductData {
    jobOrder:string
    product:string
    size:string
    quantity:string
    price:string 
    total:string
}
export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "jobOrder",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 m-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            
          >
            Job Order
            <ArrowUpDown className= "ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
