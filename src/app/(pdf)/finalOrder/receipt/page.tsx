"use client";
import FinalOrderReceiptPDF from "@/components/ui/FinalOrderReceipt";
import { Button } from "@/components/ui/button";

/* eslint-disable react/no-deprecated */
import {
    PDFViewer,
    StyleSheet,
    View
} from "@react-pdf/renderer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PDFPage = () => {
    const searchParams = useSearchParams();
    const keys = Array.from(searchParams.keys());
    const data: Record<string, string | null> = {};
        
    keys.forEach((key) => {
      data[key] = searchParams.get(key);
    });
     console.log(data)
  return (
    
    <>
      <PDFViewer style={styles.page}>
        {/* @ts-ignore */}
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
