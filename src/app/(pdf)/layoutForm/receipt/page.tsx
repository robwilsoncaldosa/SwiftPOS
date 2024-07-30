"use client";
import LayoutReceiptPDF from "@/components/ui/LayoutReceipt";
import { Button } from "@/components/ui/button";

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

const PDFPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const admin = searchParams.get("admin");
  const amount = searchParams.get("amount") ?? "";
  const artist = searchParams.get("artist");
  const jobOrder = searchParams.get("jobOrder");
  const page = searchParams.get("page");
  const data = {
    name: name,
    admin: admin,
    amount: amount,
    artist: artist,
    jobOrder: jobOrder,
    page: page,
  };
  return (
    <>
      <PDFViewer style={styles.page}>
        <LayoutReceiptPDF data={data} />
      </PDFViewer>
      <View
        style={{
          display: "flex",
          position: "absolute",
          top: ".8%",
          left: "80%",
        }}
      >
        <Button variant={"outline"} asChild>
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
