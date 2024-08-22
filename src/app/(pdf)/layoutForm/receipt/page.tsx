"use client";
import LayoutReceiptPDF from "@/components/ui/LayoutReceipt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* eslint-disable react/no-deprecated */
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ArrowRightToLineIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const PDFPage = () => {
    const params = useSearchParams();
    const data = {
      jobOrder: params.get("jobOrder"),
      name: params.get("name"),
      phone: params.get("phone"),
      address: params.get("address"),
      page: params.get("page"),
      admin: params.get("admin"),
      products: params.get("products"),
      total: params.get("total"),
      date: params.get("date"),
      signature:params.get("signature")
    };

    

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
            {/* @ts-ignore */}
          <LayoutReceiptPDF data={data} imageUrl={imageUrl} />
        </PDFViewer>
      ) : (
        <PDFViewer style={styles.page}>
            {/* @ts-ignore */}
          <LayoutReceiptPDF data={data} />
        </PDFViewer>
      )}

<View
        style={{
          display: "flex",
          marginTop:   ".3%" ,
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          position: "absolute",
          top:  0,
          right: "10%",
        }}
      >
        <div className="flex items-center justify-center rounded-lg  shadow-sm  min-h-max">
          <div className="flex flex-col items-center gap-1 text-center">
    
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
    height: "100vh",
    width: "100vw",
  },
  section: {
    padding: 10,
  },
});
