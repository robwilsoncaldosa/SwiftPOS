"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SpreadsheetIcon from "@/components/ui/SpreadsheetIcon";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Eraser, Send } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface FormData {
  name: string;
  phone: string;
  address: string;
  products: string;
  total: string;
  date?: string;
  page: string;
  admin?: string;
  jobOrder?: string;
  signature?: string;
}
const SuccessToast = () => (
  <div className="flex items-center justify-between">
    <p className="text-sm flex gap-2">
      <Check className="text-white" /> Your message has been sent successfully!
    </p>
  </div>
);

export const HomePage = ({ Admin }: { Admin: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const checkFormData = (formData: FormData) => {
    const values = Object.values(formData);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
    return true;
  };

  const handleReset = () => {
    setTextareaValue("Name of client: \nTotal:\nPage:\nPhone: \nDate: \nProducts:\nAddress:");
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
  const [textareaValue, setTextareaValue] = useState<string>("Name of client: \nTotal:\nPage:\nPhone: \nDate: \nProducts:\nAddress:");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    date: "",
    page: "",
    phone: "",
    products: "",
    total: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a list to store error messages
    const errors: string[] = [];

    // Check each field and add to errors if needed
    if (!formData.name) errors.push("Name is required");
    if (!formData.phone) errors.push("Phone number is required");
    if (!formData.address) errors.push("Address is required");
    if (!formData.page) errors.push("Page is required");
    if (!formData.products) errors.push("Products are required");
    if (!formData.total) errors.push("Total is required");
    if (!formData.date) errors.push("Date is required");

    // If there are errors, display them and return
    if (errors.length > 0) {
      const errorMessage = errors.join(", ");
      console.log("Form errors:", errorMessage);
      toast({
        description: `Please fix the following errors: ${errorMessage}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const data: FormData = {
      name: formData.name,
      phone: formData.phone,
      admin: Admin,
      address: formData.address,
      page: formData.page,
      products: formData.products,
      total: formData.total,
      date: formData.date,
    };

    try {
      console.log("Submitting form data:", data);
      const response = await fetch("/dashboard/api", {
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

      const responseData = await response.json();
      console.log("Server response:", responseData);

      setIsSubmitting(false);
      setIsSuccess(true);
      handleReset();
      toast({
        description: <SuccessToast />,
        className: "bg-green-500 text-white transition",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setIsSuccess(false);
      toast({
        description: "An error occurred while submitting the form",
        variant: "destructive",
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);

    const parsedData: Partial<FormData> = {};
    const regex =
      /(Name of client|Total|Page|Phone|Date|Products|Address)\s*:\s*([^\n]+)/gi;
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
        case "products":
          parsedData.products = val;
          break;
        case "total":
          parsedData.total = val;
          break;
        case "date":
          parsedData.date = val;
          break;
        case "contact":
          parsedData.phone = val;
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
      router.refresh();

      toast({
        description: <SuccessToast />,
        className: "bg-green-500 text-white transition",
      }),
        setTimeout(() => {
          setIsSuccess(false);
        }, 500);
    }
  }, [isSuccess, router, toast]);

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
      <main className=" flex items-center w-full ">
        <Card className="w-full max-w-md mx-auto shadow-none p-8 border-0  bg-background">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center dark:text-foreground">
            Paste and send to <SpreadsheetIcon />
          </h2>
          <div>
            <div>
              <Textarea
                name="data"
                className="text-foreground h-60"
                placeholder={`Example Format Below:\n\nName of client: Juan Dela Cruz\nTotal: ₱1,000\nPage: VSY\nPhone: 0912345678\nDate: August 22, 2024\nProducts: T-Shirt, Polo-Shirt, Jacket\nAddress: Lapu-lapu City, Cebu, Philippines`}
                value={textareaValue}
                defaultValue={textareaValue}
                onChange={handleTextareaChange}
                required
              />

              <div className="flex gap-2 justify-center mt-8">
                <Button onClick={handleSubmit} variant={"secondary"}>
                  <Send className="w-4 mr-2" /> Submit
                </Button>
                <Button onClick={handleReset} variant={"destructive"}>
                  <Eraser className="w-4 mr-2" /> Reset
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
