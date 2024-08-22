"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SpreadsheetIcon from "@/components/ui/SpreadsheetIcon";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export interface FormData {
  name: string;
  phone: string;
  address: string;
  products: string;
  total: string;
  date: string;
  page: string;
  admin: string;
  jobOrder?: string;
}
const SuccessToast = () => (
  <div className="flex items-center justify-between">
    <p className="text-sm flex gap-2">
      <Check className="text-white" /> Your message has been sent
      successfully!
    </p>
  </div>
);

export const HomePage = () => {
  const { toast } = useToast();

  const checkFormData = (formData: FormData) => {
    const values = Object.values(formData);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkFormData(formData)) {
      return;
    }
    setIsSubmitting(true);
    const data: FormData = {
      name: formData.name,
      phone: formData.phone,
      admin: formData.admin,
      address: formData.address,
      page: formData.page,
      products: formData.products,
      total: formData.total,
      date: formData.date,
    };

    try {
      const response = await fetch("/dashboard/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setIsSubmitting(false);
      setIsSuccess(!!response.ok);
      response.ok && handleReset();
    } catch (error) {
      console.error(error);
    }
    redirect("/dashboard");


  };

  const [textareaValue, setTextareaValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    admin: "",
    date: "",
    page: "",
    phone: "",
    products: "",
    total: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleReset = () => {
    setTextareaValue("");
    setFormData({
      name: "",
      address: "",
      admin: "",
      date: "",
      page: "",
      phone: "",
      products: "",
      total: "",
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);

    const parsedData: Partial<FormData> = {};
    const regex =
      /(Name of client|Amount|Assigned admin|Assigned artist|Page)\s*:\s*([^\n]+)/gi;
    let match;
    while ((match = regex.exec(value)) !== null) {
      const key = match[1].toLowerCase();
      const val = match[2].trim();
      switch (key) {
        case "name of client":
          parsedData.name = val;

          break;
        case "address":
          parsedData.address = val;

          break;
        case "page":
          parsedData.page = val;

          break;
        case "assigned admin":
          parsedData.admin = val;

          break;
        case "products":
          parsedData.products = val;

          break;
        case "total":
          parsedData.total = val;

          break;
        case "date":
          parsedData.date = val;

          break;
        case "phone":
          parsedData.phone = val;

          break;
        default:
          break;
      }
    }

    setFormData({
      ...formData,
      ...parsedData,
    });
  };

  useEffect(() => {

    if (isSuccess) {
      toast({
        description: <SuccessToast />,
        className: "bg-green-500 text-white",
      }),
        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
      redirect("/dashboard");
    }
  }, [isSuccess, toast]);

  return isSubmitting ? (
    <div className="flex max-w-md flex-col gap-4 items-center justify-center m-auto">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-[#332d2d] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  ) : (
    <>
      <main className=" flex items-center w-full    bg-muted/40">
        <Card className="w-full max-w-md mx-auto shadow-none p-8 border-0  ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center dark:text-foreground">
            Paste and send to <SpreadsheetIcon />
          </h2>
          <div>
            <Label
              htmlFor="data"
              className="block text-md font-medium text-foreground"
            >
              Data
            </Label>
            <div>
              <textarea
                name="data"
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-52 dark:text-foreground"
                value={textareaValue}
                onChange={handleTextareaChange}
                required
              ></textarea>
     
              <div className="flex gap-2 justify-center mt-2">
                <Button onClick={handleSubmit} variant={"default"}>
                  Submit
                </Button>
                <Button onClick={handleReset} variant={"destructive"}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default HomePage;
