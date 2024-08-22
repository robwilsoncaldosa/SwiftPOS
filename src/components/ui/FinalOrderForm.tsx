"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonHTMLAttributes, FormEvent, useRef, useState } from "react";
import { Button } from "./button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { useSearchParams,useRouter } from "next/navigation";
import { Textarea } from "./textarea";
import { LucideMinus, Minus, Plus } from "lucide-react";

export default function FinalOrderForm() {
  const params = useSearchParams();
  const router = useRouter();
const data = {
    jobOrder: params.get("jobOrder"),
    name: params.get("name"),
    phone: params.get("phone"),
    address: params.get("address"),
    page: params.get("page"),
    admin: params.get("admin"),
    products: params.get("products"),
    total: params.get("total"),
    date: new Date().toLocaleString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }),
};
  const nextButton = useRef<HTMLButtonElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);

  const handleNext = (e:FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextButton.current) {
      nextButton.current.click();
    } else {
      console.log("Button is not available yet.");
    }
  };
  const handlePrevious = (e:FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previousButton.current) {
      previousButton.current.click();
    } else {
      console.log("Button is not available yet.");
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = new URLSearchParams(formData as any);
    router.push(`/finalOrder/receipt?${data.toString()}`);
  };
  
 
  const [addProduct, setAddProduct] = useState(1);
  const handleAddProduct = (e:FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddProduct((prev) => prev + 1);
  };
  const handleRemoveProduct = (e:FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAddProduct((prev) => prev - 1);
  };

  const ProductForm = ({ product = addProduct }) => {
    const FormData = ["Product", "Size", "Quantity", "Price", "Total"];
    return (
      <>
        {Array.from({ length: product }).map((_, index) => (
          <>
            <h1 className="col-span-2 my-2">Product {index + 1}</h1>
            {FormData.map((data) => (
              <>
                <div
                  key={data + (index + 1)}
                  className={`grid h-min gap-3 ${
                    data === "Product" && "col-span-2"
                  }`}
                >
                  <Label htmlFor={data.toLowerCase() + (index + 1)}>
                    {data === "Product" ? "Product Name" : data}
                  </Label>
                  <Input
                    id={data.toLowerCase() + (index + 1)}
                    name={data.toLowerCase() + (index + 1)}
                    type="text"
                    required
                    className="w-full"
                  />
                </div>
              </>
            ))}
            <div className="h-1 border-b col-span-2 mb-6    "> </div>
          </>
        ))}
      </>
    );
  };

  const PaymentForm = () => {
    const FormData = [
      "Subtotal",
      "Shipping-Fee",
      "Package-Box",
      "Total-Cost",
      "Down-Payment",
      "Layout-Fee",
      "Remaining-Balance",
    ];
    return (
      <>
        {FormData.map((data) => (
          <div key={data} className="grid h-min gap-3">
            <Label htmlFor={data.toLowerCase()}>{data}</Label>
            <Input
              id={data.toLowerCase()}
              name={data.toLowerCase()}
              type="text"
              className="w-full"
              required
            />
          </div>
        ))}
        <div className="grid grid-flow-col gap-3 col-span-2 mb-2 mt-auto">
          <Button variant={"secondary"} onClick={handlePrevious}>
            Back
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </>
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="grid grid-cols-2 gap-6 *:px-1">
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className={`grid gap-3 ${key === "address" && "col-span-2"}  ${
                  key === "products" && "col-span-2"
                } ${key === "phone" && "col-span-2"} ${key === 'date' && 'hidden'} ${key === 'total' && 'col-span-2' }`}
              >
                <Label htmlFor={key}>
                  {key === "jobOrder"
                    ? "Job Order"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                {key === "address" ? (
                  <Textarea
                    id={key}
                    className="w-full bg-muted cursor-not-allowed focus-visible:ring-0"
                    defaultValue={value || ''}
                    name="address"
                    readOnly
                  />
                ) : (
                  <Input
                    id={key}
                    type="text"
                    className="w-full bg-muted cursor-not-allowed focus-visible:ring-0 "
                    name={key}
                    defaultValue={value || ''}
                    readOnly
                  />
                )}
              </div>
            ))}
            <div className="grid gap-3 mb-2 col-span-2 mt-auto">
              <Button type="button"  onClick={handleNext} >
                   Next
                </Button>
            </div>
          </CarouselItem>
          <CarouselItem className="grid gap-6 grid-cols-2 overflow-auto h-[70dvh]  *:px-1">
            <ProductForm />
            <div className="grid col-span-2 grid-cols-2 gap-3  mb-2 mt-auto">
            <Button type="button" onClick={handleRemoveProduct} variant={"destructive"}>
                 Remove Product
              </Button>
            <Button type="button" onClick={handleAddProduct} variant={"outline"}>
                 Add Product
              </Button>
          
              <Button type="button" variant={"secondary"} onClick={handlePrevious}>
                Back
              </Button>
              <Button  type="button" onClick={handleNext}>Next</Button>
            </div>
          </CarouselItem>   
          <CarouselItem className="grid gap-6 grid-cols-2 *:px-1">
            <PaymentForm />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious ref={previousButton} type='button' className="hidden" />
        <CarouselNext ref={nextButton} type="button" className="hidden" />
      </Carousel>
    </form>
  );
}
    