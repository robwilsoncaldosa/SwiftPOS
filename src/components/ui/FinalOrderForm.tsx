"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./button";
import Link from "next/link";
import { FormEvent } from "react";

export default function FinalOrderForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData.entries()) {
      console.log({ key, value });
    }
  };
  return (
    <form className="grid gap-6 w-96" onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="contact">Contact Number</Label>
        <Input id="contact" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="articles">Articles</Label>
        <Input id="articles" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="text" className="w-full" />
      </div>
      <div className="grid gap-3">
        <Button type="submit" asChild>
          {/* <Link href={{ pathname: "/finalOrder/receipt", query: {} }}>
          </Link> */}
          Save changes
        </Button>
      </div>
    </form>
  );
}
