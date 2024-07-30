"use client";
import FileImage from "@/components/ui/FileImage";
import FinalOrderReceiptPDF from "@/components/ui/FinalOrderReceipt";
import LayoutReceiptPDF from "@/components/ui/LayoutReceipt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* eslint-disable react/no-deprecated */
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightToLineIcon,
  ChevronRight,
  MoveRight,
} from "lucide-react";
const PDFPage = () => {
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {imageUrl ? (
        <PDFViewer style={styles.page}>
          <FileImage imageUrl={imageUrl} />
        </PDFViewer>
      ) : (
        <Image
          src={"/placeholder.svg"}
          width={500}
          height={500}
          alt="placeholder"
          style={{ margin: "auto", marginTop: 200, marginBottom: 50 }}
        />
      )}

      <View
        style={{
          display: "flex",
          marginTop: `${imageUrl ? ".3%" : 30}`,
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          position: `${imageUrl ? "absolute" : "relative"}`,
          top: `${imageUrl && 0}`,
          right: `${imageUrl ? "10%" : "0"}`,
        }}
      >
        <div className="flex items-center justify-center rounded-lg  shadow-sm  min-h-max">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {!imageUrl && "You have no image"}
            </h3>
            <Button asChild variant={"secondary"}>
              <Input id="picture" type="file" onChange={handleImageChange} />
            </Button>
          </div>
        </div>
        <Button variant={"outline"} className="self-end" asChild>
          <Link href={"/dashboard"}>
            Done Printing <ArrowRightToLineIcon className="ms-2" />
          </Link>
        </Button>
      </View>
    </>
  );
};

export default PDFPage;

// Create styles
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    height: "100vh",
    width: "100%",
  },
  section: {
    padding: 10,
  },
});
