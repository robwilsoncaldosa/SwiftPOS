"use client";
import { FormData } from "@/app/HomePage";
import { Button } from "@/components/ui/button";
import FinalOrderDialog from "@/components/ui/FinalOrderDialog";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ReceiptText } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<FormData>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name of Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "page",
    header: "Page",
  },
  {
    accessorKey: "admin",
    header: "Admin",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "date",
    cell: ({ row }) => {
    const date = new Date(row.getValue("date"));
    const formattedDate = date.toLocaleDateString("en-PH",{
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "datetime",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      type User = {
        name: string;
        signature: string;
      };
      const layout = row.original;
      return (
        <div className="flex gap-2">
          <Button variant={"secondary"} asChild>
            <Link
              href={{
                pathname: "/layoutForm/receipt",
                query: {
                  jobOrder: layout.jobOrder,
                  name: layout.name,
                  phone: layout.phone,
                  address: layout.address,
                  page: layout.page,
                  admin: layout.admin,
                  products: layout.products,
                  total: layout.total,
                  date: layout.date,
                  signature: layout.signature,
                },
              }}
            >
              <ReceiptText className=" w-4 mr-2" /> Receipt
            </Link>
          </Button>

          {/* @ts-ignore */}
          <FinalOrderDialog data={layout} signature={layout.signature} />
        </div>
      );
    },
  },
];
