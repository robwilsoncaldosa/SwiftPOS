/* eslint-disable react-hooks/exhaustive-deps */
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
  useCallback,
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
    setAddProduct((prev) => prev + 0);
  };
  const handlePrevious = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previousButton.current) {
      previousButton.current.click();
    } else {
      console.log("Button is not available yet.");
    }
    setAddProduct((prev) => prev + 0);
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

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (value !== "") {
          const match = key.match(/^quantity([SML]|(?:[2-5]?XL))(\d+)$/);
          if (match) {
            const [, size, number] = match; // Extract size and number
            // Concatenate sizes if the key already exists
            if (data[`size${number}`]) {
              data[`size${number}`] = `${data[`size${number}`]},${size}`;
            } else {
              data[`size${number}`] = size; // Create size key if not exists
            }
            // Concatenate quantities if the key already exists
            if (data[`quantity${number}`]) {
              data[`quantity${number}`] = `${data[`quantity${number}`]},${value}`;
            } else {
              data[`quantity${number}`] = value; // Create quantity key if not exists
            }
          } else {
            data[key] = value; // For other keys, just add them as is
          }
        }
      });
      
      console.log(data);
      
    
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

const [addProduct, setAddProduct] = useState<number>(
    localStorage.getItem("numProduct")
        ? parseInt(localStorage.getItem("numProduct")!)
        : 1
);
const handleAddProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddProduct((prev) => {
        const newAddProduct = prev + 1;
        localStorage.setItem("numProduct", newAddProduct.toString());
        return newAddProduct;
    });
};
const handleRemoveProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddProduct((prev) => {
        const newAddProduct = prev - 1;
        localStorage.setItem("numProduct", newAddProduct.toString());
        return newAddProduct;
    });
};

  const ProductForm = ({ product = addProduct }) => {
    const sizes = useMemo(
      () => ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      []
    );
    const formData = useMemo(() => ["Product", "Price"] as const, []);

    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [basePrices, setBasePrices] = useState<{ [key: string]: number }>({});
    const [totals, setTotals] = useState<{ [key: string]: number }>({});

    const calculateSizePrice = useCallback(
      (size: string, basePrice: number) => {
        const sizeIndex = sizes.indexOf(size);
        const xlIndex = sizes.indexOf("XL");
        if (sizeIndex >= xlIndex) {
          return basePrice + (sizeIndex - xlIndex + 1) * 30;
        }
        return basePrice;
      },
      [sizes]
    );

    const calculateTotal = useCallback(
      (productIndex: number) => {
        let newTotal = 0;
        const basePrice = basePrices[`price${productIndex}`] || 0;

        sizes.forEach((size) => {
          const quantityKey = `quantity${size}${productIndex}`;
          const quantity = quantities[quantityKey] || 0;
          const sizePrice = calculateSizePrice(size, basePrice);
          newTotal += sizePrice * quantity;
        });

        setTotals((prev) => ({ ...prev, [`total${productIndex}`]: newTotal }));
        localStorage.setItem(`total${productIndex}`, newTotal.toString());
      },
      [quantities, basePrices, calculateSizePrice, sizes]
    );

    useEffect(() => {
      localStorage.setItem("jobOrder", data.jobOrder || "");
      const currentJobOrder = localStorage.getItem("jobOrder");
      const persistedJobOrder = localStorage.getItem("currentjobOrder");
      localStorage.setItem(
        "jobOrder",
        currentJobOrder || persistedJobOrder || ""
      );

      // Load saved data
      const newBasePrices = {};
      const newQuantities = {};

      for (let i = 1; i <= product; i++) {
        formData.forEach((data) => {
          const key = data.toLowerCase() + i;
          const storedValue = localStorage.getItem(key);
          if (storedValue) {
            const inputElement = document.getElementById(
              key
            ) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = storedValue;
              if (data === "Price") {
                //@ts-ignore
                newBasePrices[key] = Number(storedValue);
              }
            }
          }
        });

        // Load saved quantities
        sizes.forEach((size) => {
          const quantityKey = `quantity${size}${i}`;
          const storedQuantity = localStorage.getItem(quantityKey);
          if (storedQuantity) {
            //@ts-ignore
            newQuantities[quantityKey] = Number(storedQuantity);
            const inputElement = document.getElementById(
              quantityKey
            ) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = storedQuantity;
            }
          }
        });
      }

      setBasePrices(newBasePrices);
      setQuantities(newQuantities);
    }, [product, formData, sizes]);

    useEffect(() => {
      for (let i = 1; i <= product; i++) {
        calculateTotal(i);
      }
    }, [quantities, basePrices, calculateTotal, product]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      localStorage.setItem(target.name, value);
      if (target.name.startsWith("quantity")) {
        setQuantities((prev) => ({ ...prev, [target.name]: Number(value) }));
      } else if (target.name.startsWith("price")) {
        setBasePrices((prev) => ({ ...prev, [target.name]: Number(value) }));
      }
    };

    return (
      <>
        {Array.from({ length: product }).map((_, index) => (
          <Fragment key={index}>
            <h1 className="col-span-2 my-2">Product {index + 1}</h1>
            {formData.map((data) => (
              <Fragment key={data + index}>
                <div
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
                    type={data === "Price" ? "number" : "text"}
                    required
                    className={`w-full ${data === "Price" ? "col-span-2" : ""}`}
                    onChange={(e) => {
                      handleChange(e);
                      setAddProduct((prev) => prev + 0);
                    }}
                  />
                </div>
              </Fragment>
            ))}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {sizes.map((size) => (
                <Fragment key={size + index}>
                  <div className="grid grid-cols-3 gap-1 items-center">
                    <Input
                      id={`size${size}${index + 1}`}
                      type="text"
                      value={`${size}`}
                      readOnly
                      tabIndex={-1}
                      className="w-full bg-muted/40"
                    />
                    <Input
                      id={`quantity${size}${index + 1}`}
                      name={`quantity${size}${index + 1}`}
                      type="number"
                      placeholder="Quantity"
                      className="w-full col-span-2"
                      onChange={(e) => {
                        handleChange(e);
                        setAddProduct((prev) => prev + 0);
                      }}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="col-span-2 mt-4">
              <Label htmlFor={`total${index + 1}`}>
                Total for Product {index + 1}
              </Label>
              <Input
                id={`total${index + 1}`}
                name={`total${index + 1}`}
                type="number"
                value={totals[`total${index + 1}`] || "0"}
                readOnly
                className="w-full bg-muted/40"
              />
            </div>
            <div className="h-1 border-b col-span-2 mb-6"></div>
          </Fragment>
        ))}
      </>
    );
  };
  const [reRender, setReRender] = useState(0);

  const PaymentForm = ({ reRender }: { reRender: number }) => {
    // Assuming you are retrieving the value from localStorage
    let total = data.total;

    if (total !== null) {
      // Replace the peso sign (₱), commas, and other characters like %2, then convert to a plain number
      total = total.replace(/[₱,%]/g, ""); // Removes ₱, commas, and %
    }
    const calculateInitialSubtotal = () => {
      const inputElements = document.querySelectorAll(
        'input[name^="total"]:not([name="total"]):not([name="total-cost"])'
      );
      return Array.from(inputElements)
        .map((input) => parseFloat((input as HTMLInputElement).value) || 0)
        .reduce((acc, value) => acc + value, 0);
    };
    const [formValues, setFormValues] = useState(
      useCallback(() => {
        const initialSubtotal = calculateInitialSubtotal();
        const shippingFee = parseFloat(localStorage.getItem("shipping-fee")|| '');
        const packageBox = parseFloat(localStorage.getItem("package-box")|| '');
        const downPayment = parseFloat(localStorage.getItem("down-payment")|| '');
        const discount = parseFloat(localStorage.getItem("discount")|| '');
        const tax = parseFloat(localStorage.getItem("tax")|| '');
        const layoutFee = parseFloat(total|| '');
        const totalCost = initialSubtotal + shippingFee + packageBox + tax;
        const remainingBalance = totalCost - downPayment - layoutFee - discount;

        return {
          subtotal: initialSubtotal,
          tax: tax,
          discount: discount,
          "shipping-fee": shippingFee,
          "package-box": packageBox,
          "total-cost": totalCost,
          "down-payment": downPayment,
          "layout-fee": layoutFee,
          "remaining-balance": remainingBalance,
        };
      }, [calculateInitialSubtotal])
    );

    const FormData = useMemo(
      () => [
        "Subtotal",
        "Shipping-Fee",
        "Tax",
        "Package-Box",
        "Total-Cost",
        "Down-Payment",
        "Layout-Fee",
        "Discount",
        "Remaining-Balance",
      ],
      []
    );

    useEffect(() => {
      // Calculate total cost and remaining balance
      const totalCost =
        formValues.subtotal +
        formValues["shipping-fee"] +
        formValues["package-box"] +
        formValues.tax;
      const remainingBalance =
        totalCost -
        formValues["down-payment"] -
        formValues["layout-fee"] -
        formValues.discount;

      setFormValues((prev) => ({
        ...prev,
        "total-cost": totalCost,
        "remaining-balance": remainingBalance,
      }));
    }, [
      formValues.subtotal,
      formValues.tax,
      formValues.discount,
      formValues["shipping-fee"],
      formValues["package-box"],
      formValues["down-payment"],
      formValues["layout-fee"],
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const numericValue = value.replace(/[^0-9.]/g, "");
      const floatValue = parseFloat(numericValue) || 0;
      setFormValues((prev) => ({
        ...prev,
        [name]: floatValue,
      }));
      localStorage.setItem(name, numericValue);
    };

    return (
      <>
        {FormData.map((data) => (
          <div
            key={data}
            className={`grid h-min gap-3 ${
              ["subtotal", "total-cost", "remaining-balance"].includes(
                data.toLowerCase()
              ) && "col-span-2"
            }`}
          >
            {reRender ? <p className="hidden">{reRender}</p> : null}
            <Label htmlFor={data.toLowerCase()}>{data}</Label>
            <Input
              id={data.toLowerCase()}
              name={data.toLowerCase()}
              type="number"
              value={formValues[data.toLowerCase() as keyof typeof formValues] || undefined  }
              className={`w-full ${
                ["subtotal", "total-cost", "remaining-balance"].includes(
                  data.toLowerCase()
                ) && "bg-muted/40 cursor-not-allowed"
              }`}
              required
              onChange={handleChange}
              readOnly={[
                "subtotal",
                "total-cost",
                "remaining-balance",
              ].includes(data.toLowerCase())}
            />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 col-span-2 mb-2 mt-auto">
          <Button variant="default" onClick={handlePrevious}>
            <ArrowLeft className="w-4 mr-2" /> Back
          </Button>
          <Button type="submit" variant="default">
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
              <Button
                type="button"
                variant={"default"}
                onClick={(e) => {
                  handleNext(e);
                  setReRender((prev) => prev + 1);
                }}
              >
                <ArrowRight className="mr-2 w-4" /> Next
              </Button>
            </div>
          </CarouselItem>
          <CarouselItem className="grid gap-6 grid-cols-2 *:px-1">
            <PaymentForm reRender={reRender} />
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
