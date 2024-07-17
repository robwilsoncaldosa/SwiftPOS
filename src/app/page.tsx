"use client";
import SpreadsheetIcon from "@/components/ui/SpreadsheetIcon";
import { Button } from "@/components/ui/Button";
import { NextPage } from "next";
import { useEffect, useState } from "react";
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Home: NextPage = () => {
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const response = await fetch("/api", {
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
  };

  const [textareaValue, setTextareaValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleReset = () => {
    setTextareaValue("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);

    const parsedData: Partial<FormData> = {};
    const regex = /(name|email|phone|message)\s*:\s*([^,\n]+)/gi;
    let match;
    while ((match = regex.exec(value)) !== null) {
      const key = match[1].toLowerCase();
      const val = match[2].trim();
      switch (key) {
        case "name":
          parsedData.name = val;
          break;
        case "email":
          parsedData.email = val;
          break;
        case "phone":
          parsedData.phone = val;
          break;
        case "message":
          parsedData.message = val;
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
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  return isSubmitting ? (
    <div className="flex max-w-md flex-col gap-4 items-center justify-center m-auto h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <>
      {isSuccess && (
        <div className="toast toast-top toast-end transition-all ease-in-out">
          <div className="alert alert-success text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Data sent to google sheet successfully.</span>
          </div>
        </div>
      )}
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Paste and send to <SpreadsheetIcon />
          </h2>
          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700"
            >
              Data
            </label>
            <div>
              <textarea
                name="data"
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-52"
                value={textareaValue}
                onChange={handleTextareaChange}
                required
              ></textarea>
              {/* <div>
                <p>Name: {formData.name}</p>
                <p>Email: {formData.email}</p>
                <p>Phone: {formData.phone}</p>
                <p>Message: {formData.message}</p>
              </div> */}
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
        </div>
      </main>
    </>
  );
};

export default Home;
