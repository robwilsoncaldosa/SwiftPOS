"use client";
/* eslint-disable jsx-a11y/alt-text */
import { FormData } from "@/app/HomePage";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter/static/Inter_24pt-Regular.ttf" },
    { src: "/fonts/Inter/static/Inter_24pt-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Inter/static/Inter_24pt-Medium.ttf", fontWeight: "medium" },
    {
      src: "/fonts/Inter/static/Inter_24pt-SemiBold.ttf",
      fontWeight: "semibold",
    },
    { src: "/fonts/Inter/static/Inter_24pt-Light.ttf", fontWeight: "light" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
    fontFamily: "Inter",
    color: "#09090b",
    fontSize: 10,
    fontWeight: "light",
  },
  section: {
    flexGrow: 1,
    width: "48%",
    maxWidth: "48%",
    border: 1,
    borderColor: "#e4e4e7",
    // borderRadius: "12px",
    color: "#09090b",
    margin: 1,
  },
  header: {
    fontSize: 14,
    fontWeight: "semibold",
    margin: 2,
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#F4F4F580",
    padding: 10,
  },
  Container: {
    display: "flex",
    padding: 14,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 7,
  },
  Header: {
    fontSize: 10,
    fontWeight: "medium",
    flexDirection: "row",
  },
  items: {
    color: "#71717a",
    fontWeight: "medium",
    flexDirection: "row",
  },
  total: {
    fontFamily: "Inter",
    fontSize: 11,
    color: "#71717a",
    fontWeight:'extrabold',
    flexDirection: "row",
  },
  value: {
    marginLeft: "auto",
    fontWeight: "light",
    color: "#09090b",
    display:'flex',
    flexWrap:'wrap',
    maxWidth:150

  },
  separator: {
    height: 0.7,
    backgroundColor: "#e4e4e7",
    marginVertical: 10,
  },
});

// Helper function to get today's date
const getTodayDate = () => {
  const today = new Date();
  return `${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;
};

// Sample data
const names = ["Joey Albonu Jr."];
const addresses = ["LPG Household and Industrial Gases"];
const randomJobOrder = `F-9052`;




function LayoutReceiptPDF({
  data,
  imageUrl,
}: {
  data: FormData &{signature:string};
  imageUrl: string | ArrayBuffer;
}) {
  return (
    <Document style={{ width: "100%", height: "100%" }}>
      <Page size={"LEGAL"} style={styles.page}>
        {Array.from({ length: 2 }).map((_, ic) => (
          <>
            <View key={ic} style={styles.section} wrap>
              <View style={styles.mainHeader}>
                <Text
                  style={[
                    styles.header,
                    {
                      fontSize: 15,
                    },
                  ]}
                >
                  Layout&nbsp;
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      letterSpacing: "-.8px",
                    }}
                  >
                    {data.jobOrder}
                    
                
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.header,
                    { fontSize: 10, color: "#71717a", fontWeight: "light" },
                  ]}
                >
                  Date:
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#71717a",
                      fontWeight: "light",
                    }}
                  >
                   {data.date}
                  </Text>
                </Text>
              </View>

              <View style={styles.Container}>
                <View style={styles.Header}>
                  <Text style={{ marginRight: 20 }}>Product Information</Text>
                </View>
                <View style={styles.items}>
                  <Text style={{ marginRight: 70 }}>Product Type:</Text>
                  <Text style={styles.value}>{data.products}</Text>

                </View>
                <View style={styles.total}>
                  <Text style={{ marginRight: 70 }}>Total:</Text>
                  <Text style={[styles.value,{fontWeight:'extrabold'}]}>{data.total} ({data.products.split(",").length} x Layout Fee) </Text>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.Header}>
                  <Text>Customer Information</Text>
                </View>
                <View style={styles.items}>
                  <Text>Name:</Text>
                  <Text style={styles.value}>{data.name}</Text>
                </View>
                <View style={styles.items}>
                  <Text style={styles.items}>Phone:</Text>
                  <Text style={styles.value}>{data.phone}</Text>
                </View>
                <View style={styles.items}>
                  <Text style={styles.items}>Address:</Text>
                  <Text style={styles.value}>
                  {data.address}
                  </Text>
                </View>

                <View style={styles.separator}></View>
                <View style={styles.Header}>
                  <Text>Page Information</Text>
                  <Text style={{ marginLeft: "auto", marginRight: 50 }}>
                    Artist Information
                  </Text>
                </View>
                <View style={styles.items}>
                  <Text>Name: </Text>{" "}
                  <Text style={{ color: "#09090b" }}>{data.page}</Text>
                  <Text style={{ marginLeft: "auto", marginRight: 100 }}>
                    Name:{" "}
                  </Text>
                </View>

                <View style={[styles.separator, { marginTop: 20 }]}></View>
              </View>

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "flex-end",
                  marginBottom: 20,
                }}
              >
                <Image
                  src={data.signature}
                  style={{
                    width:120,
                    position: "absolute",
                    backgroundColor: "transparent",
                    top:-13,
                    right: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    marginRight: 28,
                    fontWeight: "bold",
                  }}
                >
                  {data.admin}
                </Text>
                <Text
                  style={{
                    borderTop: 1,
                    fontSize: 10,
                    width: 80,
                    textAlign: "center",
                    paddingTop: 1,
                    marginRight: 20,
                  }}
                >
                  Prepared By
                </Text>
              </View>
            </View>
          </>
        ))}
        {imageUrl && (
          <Image
            //@ts-ignore
            src={imageUrl}
            style={{ width: "48%" }}
          />
        )}
      </Page>
    </Document>
  );
}

export default LayoutReceiptPDF;
