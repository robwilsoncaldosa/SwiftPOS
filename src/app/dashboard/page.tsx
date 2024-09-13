import { FormData, HomePage } from "@/app/HomePage";

import FinalOrderDialog from "@/components/ui/FinalOrderDialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { LucidePrinter, Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { DataTable as LayoutTable } from "./layout/data-table";
import { DataTable as OrderTable } from "./finalOrder/data-table";
import { DataTable as ProductTable } from "./products/data-table";
import { columns } from "./layout/columns";
import { columns as OrderColumns } from "./finalOrder/columns";
import { columns as ProductColumns } from "./products/columns";



const Example = async () => {
  interface OrderData extends FormData {
    subTotal: string;
    "shipping-fee": string;
    "package-box": string;
    "total-cost": string;
    "down-payment": string;
    "layout-fee": string;
    "remaining-balance": string;
  }

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
  const DOMAIN = process.env.DOMAIN

  const response = await fetch(`${DOMAIN}/api`, {
    next: { revalidate: 0 },
  });

  const datas: FormData[] = await response.json();
  datas.forEach((data) => {
    data.signature = currentUser?.signature;
  });

  const getOrderData = await fetch(`${DOMAIN}/api/finalOrder`, {
    next: { revalidate: 0 },
    cache: "no-store",
  });

  const orderData: OrderData[] = await getOrderData.json();
  orderData.forEach((data) => {
    data.signature = currentUser?.signature;
  });

  const getProductData = await fetch(`${DOMAIN}/api/products`);
  const productData = await getProductData.json();

  return (
    <>
      <Tabs defaultValue="layout" className="w-full">
        <header className="flex justify-between">
          <TabsList className="grid max-w-max grid-cols-3 bg-background shadow ">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="order">Final Order</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <section className="flex justify-end w-fit gap-2  ms-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} className="w-full">
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
                <HomePage Admin={currentUser?.name || "Admin"} />
              </DialogContent>
            </Dialog>
            <Button variant={"outline"} className="w-full" asChild>
              <Link href={"/generate"}>
                <LucidePrinter className="mr-2 h-4 w-4" /> Generate Docs
              </Link>
            </Button>
          </section>
        </header>

        <TabsContent value="layout">
          <Card className="text-card-foreground p-6 space-y-2  drop-shadow-sm">
            <CardTitle>Layout</CardTitle>
            <CardDescription>
              Manage your layout orders and view their data
            </CardDescription>
            <LayoutTable columns={columns} data={datas} />
          </Card>
        </TabsContent>
        <TabsContent value="order">
          <Card className="text-card-foreground p-6 space-y-2">
            <CardTitle>Final Order</CardTitle>
            <CardDescription>
              Manage your final orders and view their data
            </CardDescription>
            {/* @ts-ignore */}
            <OrderTable columns={OrderColumns} data={orderData} />
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="text-card-foreground p-6 space-y-2">
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your purchased products and view their data
            </CardDescription>
            <ProductTable columns={ProductColumns} data={productData} />
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
};

export default Example;
