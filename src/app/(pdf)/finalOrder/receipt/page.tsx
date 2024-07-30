"use client";
import FinalOrderReceiptPDF from "@/components/ui/FinalOrderReceipt";
import ImageUploader from "@/components/ui/ImageUploader";
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
        <FinalOrderReceiptPDF data={data} />
      </PDFViewer>
      <View style={{ width: "100vw", display: "flex", marginTop: 30 }}>
        <Button variant={"default"} className="mx-auto" asChild>
          <Link href={"/dashboard"}>Done Printing </Link>
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
    height: "90vh",
    width: "100%",
  },
  section: {
    padding: 10,
  },
});
