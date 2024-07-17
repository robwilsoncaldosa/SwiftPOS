/* eslint-disable react/no-deprecated */
"use client";
import PDFDocument from "@/components/ui/Document";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create Document Component
const MyDocument = () => <PDFDocument />;

const PDFPage = () => {
  return (
    <PDFViewer style={styles.page}>
      <MyDocument />
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
    height: "100vh",
    width: "100%",
  },
  section: {
    padding: 10,
  },
});
