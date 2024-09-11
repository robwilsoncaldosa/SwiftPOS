"use client";
import { FormData } from "@/app/HomePage";
import { Button } from "@/components/ui/button";
import FinalOrderDialog from "@/components/ui/FinalOrderDialog";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ReceiptText } from "lucide-react";
import Link from "next/link";

interface OrderData extends FormData {
  subtotal: string;
  "shipping-fee": string;
  "package-box": string;
  "tax":string;
  "total-cost": string;
  "down-payment": string;
  "layout-fee": string;
  "discount":string;
  "remaining-balance": string;
}

export const columns: ColumnDef<OrderData>[] = [
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "subtotal",
    header: "SubTotal",
  },
  {
    accessorKey: "shipping-fee",
    header: "Shipping Fee",
  },
  {
      accessorKey: "package-box",
      header: "Package Box",
    },
    {
      accessorKey:'tax',
      header:"Tax"
    },
  {
    accessorKey: "total-cost",
    header: "Total Cost",
  },
  {
    accessorKey: "down-payment",
    header: "Down Payment",
  },
  {
    accessorKey:"discount",
    header:"Discount"
  },
  {
    accessorKey: "remaining-balance",
    header: "Remaining Balance",
  },
  {
    accessorKey: "admin",
    header: "Admin",
  },
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-PH", {
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
      const finalOrder = row.original;
      function generateProductQuery(finalOrder: OrderData) {
        const query = {
          jobOrder: finalOrder.jobOrder,
          name: finalOrder.name,
          phone: finalOrder.phone,
          address: finalOrder.address,
          subtotal: finalOrder.subtotal,
          "shipping-fee": finalOrder["shipping-fee"],
          "package-box": finalOrder["package-box"],
          "tax":finalOrder.tax,
          "total-cost": finalOrder["total-cost"],
          "down-payment": finalOrder["down-payment"],
          "layout-fee": finalOrder["layout-fee"],
          "discount":finalOrder.discount,
          "remaining-balance": finalOrder["remaining-balance"],
          admin: finalOrder.admin,
          date: finalOrder.date,
          signature: finalOrder.signature,
        };
    
        // Assuming products is an array of product objects
        //@ts-ignore
        finalOrder.products.forEach((product, index) => {
          //@ts-ignore
    
          const idx = index + 1; // Starting index from 1
          //@ts-ignore
          query[`product${idx}`] = product.product;
          //@ts-ignore
          query[`size${idx}`] = product.size;
          //@ts-ignore
          query[`quantity${idx}`] = product.quantity;
          //@ts-ignore
          query[`price${idx}`] = product.price;
          //@ts-ignore
          query[`total${idx}`] = product.total;
        });
    
        return query;
      }
    
      return (
        <div className="flex gap-2">
          <Button variant={"secondary"} asChild>
            <Link
              href={{
                pathname: "/finalOrder/receipt",
                query: generateProductQuery(finalOrder),
              }}
            >
              <ReceiptText className=" w-4 mr-2" /> Receipt
            </Link>
          </Button>

        </div>
      );
    },
  },
];
