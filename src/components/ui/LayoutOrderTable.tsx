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
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export const LayoutOrderTable = async () => {
  const response = await fetch("http://localhost:3000/api",{next:{revalidate:0}});
  const datas: FormData[] = await response.json();

  const tableHeaders = ["Job Order", "Name", "Phone", "Address", "Page", "Admin", "Products","Total,Date"];

  return (
    <Tabs defaultValue="layout" className="w-full">
      <TabsList className="grid max-w-max grid-cols-2">
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="order">Final Order</TabsTrigger>
      </TabsList>
      <TabsContent value="layout">
      <Card className="text-card-foreground p-6 space-y-2">
        <CardTitle>Layout</CardTitle>
        <CardDescription>
          Manage your layout orders and view their data
        </CardDescription>
        <Table className=" max-h-[70dvh]">
          <TableCaption>A list of your Layout Form.</TableCaption>
          <TableHeader className="">
            <TableRow>
                {tableHeaders.map((header) => (
                <TableHead key={header} className="font-semibold">{header}</TableHead>
                )
                )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((data: FormData) => (
              <TableRow key={data.jobOrder}>
                <TableCell>{data.jobOrder}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.page}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.admin}</TableCell>
                <TableCell>{data.products}</TableCell>
                <TableCell>{data.total}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant={"secondary"} asChild>
                    <Link
                      href={{
                        pathname: "/layoutForm/receipt",
                        query: {
                          jobOrder: data.jobOrder,
                          name: data.name,
                          phone: data.phone,
                          address: data.address,
                          page:data.page,
                          admin: data.admin,
                          products: data.products,
                          total: data.total,
                          date: data.date,
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
                                phone: data.phone,
                                address: data.address,
                                page:data.page,
                                admin: data.admin,
                                products: data.products,
                                total: data.total,
                                date: data.date,
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
        
        </Table>
      </Card>
      </TabsContent>
      {/* <TabsContent value="order">
      <Card className="text-card-foreground p-6 space-y-2">
        <CardTitle>Final Order</CardTitle>
        <CardDescription>
          Manage your layout orders and view their data
        </CardDescription>
        <Table className=" max-h-[70dvh]">
          <TableCaption>A list of your Layout Form.</TableCaption>
          <TableHeader className="">
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
        
        </Table>
      </Card>
      </TabsContent> */}
    </Tabs>
  );
};

export default LayoutOrderTable;
