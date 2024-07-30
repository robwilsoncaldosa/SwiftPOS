import { FormData } from "@/app/HomePage";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import FinalOrderForm from "./FinalOrderForm";

export const LayoutOrderTable = async () => {
  const response = await fetch("http://localhost:3000/api", {
    next: { revalidate: 1 },
  });
  const datas: FormData[] = await response.json();
  const totalAmount = datas
    .reduce((acc, data) => acc + +data.amount.replace(",", ""), 0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });

  return (
    <Table className="border max-h-[70dvh]">
      <TableCaption>A list of your Layout Form.</TableCaption>
      <TableHeader className="border">
        <TableRow>
          <TableHead className="font-semibold">Job Order</TableHead>
          <TableHead className="font-semibold">Name of Client</TableHead>
          <TableHead className="font-semibold">Amount</TableHead>
          <TableHead className="font-semibold">Page</TableHead>
          <TableHead className="font-semibold">Assigned Admin</TableHead>
          <TableHead className="font-semibold">Assigned Artist</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data: FormData) => (
          <TableRow key={data.jobOrder}>
            <TableCell>{data.jobOrder}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.amount}</TableCell>
            <TableCell>{data.page}</TableCell>
            <TableCell>{data.admin}</TableCell>
            <TableCell>{data.artist}</TableCell>
            <TableCell className="flex gap-2">
              <Button variant={"secondary"} asChild>
                <Link
                  href={{
                    pathname: "/layoutForm/receipt",
                    query: {
                      jobOrder: data.jobOrder,
                      name: data.name,
                      amount: data.amount,
                      page: data.page,
                      admin: data.admin,
                      artist: data.artist,
                    },
                  }}
                >
                  Generate Receipt
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"default"} asChild>
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: {
                          jobOrder: data.jobOrder,
                          name: data.name,
                          amount: data.amount,
                          page: data.page,
                          admin: data.admin,
                          artist: data.artist,
                        },
                      }}
                    >
                      Proceed to Final Order
                    </Link>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                      Fill in the extra details for the final order.
                    </DialogDescription>
                  </DialogHeader>
                  <FinalOrderForm />
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={3}>Total:{totalAmount}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default LayoutOrderTable;
