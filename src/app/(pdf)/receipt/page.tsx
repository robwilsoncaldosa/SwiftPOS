"use client";
import LayoutReceiptPDF from "@/components/ui/LayoutReceipt";

/* eslint-disable react/no-deprecated */
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const PDFPage = () => {
  return (
    <PDFViewer style={styles.page}>
      <LayoutReceiptPDF />
    </PDFViewer>
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
