import { FormData, HomePage } from "@/app/HomePage";

import FinalOrderDialog from "@/components/ui/FinalOrderDialog";
import FinalOrderForm from "@/components/ui/FinalOrderForm";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { LucidePrinter, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

const Example = async () => {
    type User = {
        name: string;
        signature: string;
      };
    
    const currentUser: User | undefined = (() => {
        const sessionCookie = cookies().get("session")?.value;
        if (sessionCookie) {
          try {
            return JSON.parse(sessionCookie) as User;
          } catch (error) {
            console.error("Failed to parse session cookie", error);
          }
        }
        return undefined;
      })();

      


  const response = await fetch("http://localhost:3000/api",{next:{revalidate:0}});
  const datas: FormData[] = await response.json();
  const tableHeaders = ["Job Order", "Name", "Phone", "Address", "Page", "Admin", "Products","Total","Date",""];


  return (
    <>
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid max-w-max grid-cols-2">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="order">Final Order</TabsTrigger>
        </TabsList>

        <TabsContent value="layout">
        <Card className="text-card-foreground p-6 space-y-2">
        <section className="flex justify-end w-fit gap-2  ms-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button  variant={"outline"} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Layout
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Layout Form</DialogTitle>
                    <DialogDescription>
                      Just Copy and Paste the Layout Form
                    </DialogDescription>
                  </DialogHeader>
                  <HomePage />
                </DialogContent>
              </Dialog>
              <Button  variant={"outline"} className="w-full" asChild>
                <Link href={"/image"}>
                  <LucidePrinter className="mr-2 h-4 w-4" /> Generate Docs
                </Link>
              </Button>
            </section>
        <CardTitle>Layout</CardTitle>
        <CardDescription>
          Manage your layout orders and view their data
        </CardDescription>
        <Table className="table-auto max-h-[70dvh]">
          <TableCaption>A list of your Layout Form.</TableCaption>
          <TableHeader className="">
            <TableRow>
                {tableHeaders.map((header) => (
                <TableHead key={header} className="font-semibold">{header}</TableHead>
                )
                )}
                <TableHead className="font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((data: FormData) => (
              <TableRow key={data.jobOrder}>
                <TableCell>{data.jobOrder}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell className="span">{data.address}</TableCell>
                <TableCell>{data.page}</TableCell>
                <TableCell>{data.admin}</TableCell>
                <TableCell>{data.products}</TableCell>
                <TableCell>{data.total}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>
                  <Button  variant={"secondary"} asChild>
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
                          signature: currentUser?.signature
                        },
                      }}
                    >
                      Receipt
                    </Link>
                  </Button>
                  
                  
                </TableCell>
                <TableCell>
                    <FinalOrderDialog data={data} signature={currentUser?.signature}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        
        </Table>
      </Card>
        </TabsContent>
        <TabsContent value="order">
          <Card className="text-card-foreground p-6 space-y-2">
            <section className="flex justify-end w-fit gap-2  ms-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button  variant={"outline"} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Layout
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Layout Form</DialogTitle>
                    <DialogDescription>
                      Just Copy and Paste the Layout Form
                    </DialogDescription>
                  </DialogHeader>
                  <HomePage />
                </DialogContent>
              </Dialog>
              <Button  variant={"outline"} className="w-full" asChild>
                <Link href={"/image"}>
                  <LucidePrinter className="mr-2 h-4 w-4" /> Generate Docs
                </Link>
              </Button>
            </section>
            <CardTitle>Final Order</CardTitle>
            <CardDescription>
              Manage your layout orders and view their data
            </CardDescription>
            <Table className=" max-h-[70dvh]">
              <TableCaption>A list of your Layout Form.</TableCaption>
              <TableHeader className="">
                <TableRow>
                  <TableHead className="font-semibold">Job Order</TableHead>
                  <TableHead className="font-semibold">
                    Name of Client
                  </TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Page</TableHead>
                  <TableHead className="font-semibold">
                    Assigned Admin
                  </TableHead>
                  <TableHead className="font-semibold">
                    Assigned Artist
                  </TableHead>
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
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
};

export default Example;
