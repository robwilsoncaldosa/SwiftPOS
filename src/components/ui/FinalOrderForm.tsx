"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  PackagePlus,
  Paperclip,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Textarea } from "./textarea";

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
    signature: params.get("signature"),
    date:
      params.get("date") ??
      new Date().toLocaleString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
  };
  const nextButton = useRef<HTMLButtonElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);

  const handleNext = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextButton.current) {
      nextButton.current.click();
    } else {
      console.log("Button is not available yet.");
    }
  };
  const handlePrevious = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previousButton.current) {
      previousButton.current.click();
    } else {
      console.log("Button is not available yet.");
    }
  };
  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const form = e
      ? (e.currentTarget as HTMLFormElement)
      : document.querySelector("form");
    if (!form) return;

    const formData = new FormData(form);

    // Convert FormData to a JSON object
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle response if needed
    } catch (error) {
      console.error(error);
    }

    alert("data is inserted to final order");
    localStorage.clear();
  };

  const handleGenerate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Call handleSubmit programmatically
    await handleSubmit();

    const form = (e.target as HTMLButtonElement).closest("form");
    if (form) {
      const formData = new FormData(form);
      const data = new URLSearchParams(formData as any);
      router.push(`/finalOrder/receipt?${data.toString()}`);
    }
  };

  const [addProduct, setAddProduct] = useState(1);
  const handleAddProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddProduct((prev) => prev + 1);
  };
  const handleRemoveProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddProduct((prev) => prev - 1);
  };

  const ProductForm = ({ product = addProduct }) => {
    const formData = useMemo(
      () => ["Product", "Size", "Quantity", "Price", "Total"] as const,
      []
    );

    useEffect(() => {
      const currentJobOrder = localStorage.getItem("jobOrder");
      const persistedJobOrder = localStorage.getItem("currentjobOrder");

      // On component mount, set the input values from localStorage if they exist

      localStorage.setItem("jobOrder", data.jobOrder as string);

      formData.forEach((data, index) => {
        for (let i = 1; i <= product; i++) {
          const key = data.toLowerCase() + i;
          const storedValue = localStorage.getItem(key);

          if (storedValue) {
            const inputElement = document.getElementById(
              key
            ) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = storedValue;
            }
          }
        }
      });
    }, [product, formData]);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
      // Store the input value in localStorage
      const target = event.target as HTMLInputElement;
      localStorage.setItem(target.name, target.value);
    };

    return (
      <>
        {Array.from({ length: product }).map((_, index) => (
          <Fragment key={index}>
            <h1 className="col-span-2 my-2">Product {index + 1}</h1>
            {formData.map((data) => (
              <Fragment key={data + index}>
                <div
                  key={data + (index + 1)}
                  className={`grid h-min gap-3 ${
                    data === "Product" && "col-span-2"
                  }`}
                >
                  <Label htmlFor={data.toLowerCase() + (index + 1)}>
                    {data === "Product" ? "Product Name" : data}
                  </Label>

                  {data === "Size" ? (
                    <Input
                      id={data.toLowerCase() + (index + 1)}
                      name={data.toLowerCase() + (index + 1)}
                      type="text"
                      required
                      className="w-full"
                      onChange={handleChange} // Add onChange event listener
                    />
                  ) : (
                    <Input
                      id={data.toLowerCase() + (index + 1)}
                      name={data.toLowerCase() + (index + 1)}
                      type="text"
                      required
                      className="w-full"
                      onChange={handleChange} // Add onChange event listener
                    />
                  )}
                </div>
              </Fragment>
            ))}
            <div className="h-1 border-b col-span-2 mb-6    "> </div>
          </Fragment>
        ))}
      </>
    );
  };
  const PaymentForm = () => {
    const FormData = useMemo(
      () => [
        "Subtotal",
        "Shipping-Fee",
        "Package-Box",
        "Total-Cost",
        "Down-Payment",
        "Layout-Fee",
        "Remaining-Balance",
      ],
      []
    );

    useEffect(() => {
      // On component mount, set the input values from localStorage if they exist
      FormData.forEach((data) => {
        const key = data.toLowerCase();
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
          const inputElement = document.getElementById(key) as HTMLInputElement;
          if (inputElement) {
            inputElement.value = storedValue;
          }
        }
      });
    }, [FormData]);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
      // Store the input value in localStorage
      const target = event.target as HTMLInputElement;
      localStorage.setItem(target.name, target.value);
    };
    return (
      <>
        {FormData.map((data) => (
          <div key={data} className="grid h-min gap-3">
            <Label htmlFor={data.toLowerCase()}>{data}</Label>
            <Input
              id={data.toLowerCase()}
              name={data.toLowerCase()}
              type="text"
              defaultValue={`${
                data === "Layout-Fee" ? params.get("total") : ""
              }`}
              className="w-full"
              required
              onChange={handleChange} // Add onChange event listener
            />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 col-span-2 mb-2 mt-auto">
          <Button variant={"default"} onClick={handlePrevious}>
            <ArrowLeft className="w-4 mr-2" /> Back
          </Button>

          <Button type="submit" variant={"default"}>
            <Paperclip className="w-4 mr-2" /> Add Final Order
          </Button>
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
                } ${key === "phone" && "col-span-2"} ${
                  key === "date" && "hidden"
                } ${key === "total" && "col-span-2"} ${
                  key === "signature" && "hidden"
                }`}
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
                    defaultValue={value || ""}
                    name="address"
                    readOnly
                  />
                ) : (
                  <Input
                    id={key}
                    type="text"
                    className="w-full bg-muted cursor-not-allowed focus-visible:ring-0 "
                    name={key}
                    defaultValue={value || ""}
                    readOnly
                  />
                )}
              </div>
            ))}
            <div className="grid gap-3 mb-2 col-span-2 mt-auto">
              <Button type="button" variant={"default"} onClick={handleNext}>
                <ArrowRight className="w-4 mr-2" /> Next
              </Button>
            </div>
          </CarouselItem>
          <CarouselItem className="grid gap-6 grid-cols-2 overflow-auto h-[70dvh]  *:px-1">
            <ProductForm />
            <div className="grid col-span-2 grid-cols-2 gap-3  mb-2 mt-auto">
              <Button
                type="button"
                onClick={handleRemoveProduct}
                variant={"destructive"}
              >
                <Trash2 className="w-4 mr-2" /> Remove Product
              </Button>
              <Button
                type="button"
                variant={"default"}
                onClick={handleAddProduct}
              >
                <PackagePlus className="mr-2 w-4" /> Add Product
              </Button>

              <Button
                type="button"
                variant={"default"}
                onClick={handlePrevious}
              >
                <ArrowLeft className="mr-2 w-4" /> Back
              </Button>
              <Button type="button" variant={"default"} onClick={handleNext}>
                <ArrowRight className="mr-2 w-4" /> Next
              </Button>
            </div>
          </CarouselItem>
          <CarouselItem className="grid gap-6 grid-cols-2 *:px-1">
            <PaymentForm />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          ref={previousButton}
          type="button"
          className="hidden"
        />
        <CarouselNext ref={nextButton} type="button" className="hidden" />
      </Carousel>
    </form>
  );
}
