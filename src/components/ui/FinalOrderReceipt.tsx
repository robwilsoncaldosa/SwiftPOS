"use client";
/* eslint-disable jsx-a11y/alt-text */
import { FormData } from "@/app/HomePage";
import { Item } from "@radix-ui/react-dropdown-menu";
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
import { Fragment } from "react";

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
    fontWeight: "bold",
  },
  mainHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F4F580",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  Container: {
    display: "flex",
    paddingHorizontal: 4,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 4,
  },
  Header: {
    display: "flex",
    fontSize: 10,
    fontWeight: "medium",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  items: {
    color: "#71717a",
    fontWeight: 100,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1,
  },
  total: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "extrabold",
    color: "#71717a",
    flexDirection: "row",
  },
  value: {
    color: "#09090b",
  },
  separator: {
    height: 0.7,
    marginVertical: 1,
    backgroundColor: "#e4e4e7",
  },
});

interface FinalOrderData extends FormData {
  subtotal: string;
  "shipping-fee": string;
  "package-box": string;
  tax: string;
  "total-cost": string;
  "down-payment": string;
  "layout-fee": string;
  discount: string;
  "remaining-balance": string;
  jobOrder: string;
  date: string;
  signature: string;
}

function FinalOrderReceipt({ data }: { data: FinalOrderData }) {
  // Extract the keys from the data object that match the pattern for products
  const products = Object.keys(data)
    .filter((key) => key.startsWith("product") && !key.startsWith("products"))
    .map((key) => {
      const index = key.replace("product", ""); // Get the product index (e.g., '1', '2')

      return {
        //@ts-ignore
        product: data[`product${index}`],
        // Parse sizes and quantities into arrays by splitting on commas
        //@ts-ignore

        size: data[`size${index}`] ? data[`size${index}`].split(",") : [],
        //@ts-ignore

        quantity: data[`quantity${index}`]
          ? data[`quantity${index}`].split(",")
          : [],
        //@ts-ignore

        price: data[`price${index}`],
        //@ts-ignore

        total: data[`total${index}`],
      };
    });

  console.log(products);

  return (
    <Document style={{ width: "100%", height: "100%" }} title="Final Receipt">
      <Page size={"LETTER"} style={styles.page}>
        {Array.from({ length: 4 }).map((_, ic) => (
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
                Job Order:&nbsp;{" "}
                <Text style={{ fontWeight: "semibold" }}>{data.jobOrder}</Text>
              </Text>

              <Text
                style={[
                  styles.header,
                  { fontSize: 10, color: "#71717a", fontWeight: "light" },
                ]}
              >
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
              {products.map((item, index) => (
                <Fragment key={index}>
                  <View style={{}}>
                    <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
                      Product Name: {item.product}
                    </Text>
                  </View>
                  <View style={styles.Header}>
                    <View
                      style={{
                        flexDirection: "column",
                        fontWeight: "medium",
                        color: "#71717a",
                      }}
                    >
                      <Text style={{ color: "black" }}>Sizes</Text>
                      {/* @ts-ignore */}
                      {item.size.map((s, i) => (
                        <Text key={i}>{s}</Text>
                      ))}
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text>Quantity</Text>
                      {/* @ts-ignore */}
                      {item.quantity.map((q, i) => (
                        <Text
                          style={{ color: "#71717a", textAlign: "center" }}
                          key={i}
                        >
                          {q}
                        </Text>
                      ))}
                    </View>
                    <View>
                      <Text>Price</Text>
                      {/* @ts-ignore */}
                      {item.size.map((size, index) => (
                        <Text key={index}>{item.price}</Text>
                      ))}
                    </View>

                    <View>
                      <Text style={{ textAlign: "right" }}>Total</Text>
                      {/* @ts-ignore */}
                      {item.size.map((size, index) => {
                        // Determine the additional cost based on the size
                        let additionalCost = 0;
                        if (["XL", "2XL", "3XL", "4XL", "5XL"].includes(size)) {
                          additionalCost =
                            (parseInt(size.replace("XL", "")) || 1) * 30; // Calculate the cost increment
                        }

                        // Calculate the total price including the additional cost
                        const totalPrice =
                          parseInt(item.price.replace("₱", "")) *
                            parseInt(item.quantity) +
                          additionalCost;

                        return <Text key={index}>₱{totalPrice}</Text>;
                      })}

                      <Text>{item.total}</Text>
                    </View>
                  </View>
                </Fragment>
              ))}

              <View style={styles.separator}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.items}>
                  <Text style={{}}>SubTotal</Text>
                  <Text style={styles.value}>{data.subtotal || null}</Text>
                </View>
                <View style={styles.items}>
                  <Text style={{}}>Shipping</Text>
                  <Text style={styles.value}>
                    {data["shipping-fee"] || null}
                  </Text>
                </View>
                <View style={styles.items}>
                  <Text style={{}}>Package Box</Text>
                  <Text style={styles.value}>
                    {data["package-box"] || null}
                  </Text>
                </View>
                {data.tax && (
                  <View style={styles.items}>
                    <Text style={{}}>Tax</Text>
                    <Text style={styles.value}>{data.tax || null}</Text>
                  </View>
                )}

                <View style={styles.items}>
                  <Text style={{}}>Total</Text>
                  <Text style={[styles.value, {}]}>
                    {data["total-cost"] || null}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {data["down-payment"] && (
                  <View style={[styles.items, { flexDirection: "row" }]}>
                    <Text>Downpayment: &nbsp;</Text>
                    <Text
                      style={[
                        styles.value,
                        { color: "red", fontWeight: "medium" },
                      ]}
                    >
                      - {data["down-payment"] || null}
                    </Text>
                  </View>
                )}

                {data["layout-fee"] === "0" ? null : (
                  <View style={[styles.items, { flexDirection: "row" }]}>
                    <Text>Layout: &nbsp;</Text>
                    <Text
                      style={[
                        styles.value,
                        { color: "red", fontWeight: "medium" },
                      ]}
                    >
                      - {data["layout-fee"] || null}
                    </Text>
                  </View>
                )}
                {data.discount && (
                  <View style={[styles.items, { flexDirection: "row" }]}>
                    <Text>Discount: &nbsp;</Text>
                    <Text
                      style={[
                        styles.value,
                        { color: "red", fontWeight: "medium" },
                      ]}
                    >
                      - {data.discount}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.total}>
                <Text>Remaining Balance</Text>
                <Text
                  style={[
                    styles.value,
                    {
                      fontSize: 14,
                      textDecoration: "underline",
                      color: "black",
                      marginLeft: "auto",
                    },
                  ]}
                >
                  {data["remaining-balance"] || null}
                </Text>
              </View>
              <View style={styles.separator}></View>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "flex-end",
                marginTop: 17,
                paddingHorizontal: 15,
                position: "relative",
              }}
            >
              <Image
                src={data.signature}
                style={{
                  width: 120,
                  position: "absolute",
                  backgroundColor: "transparent",
                  top: -18,
                  left: "auto",
                }}
              />
              <Text
                style={{
                  fontSize: 10,
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
                }}
              >
                Prepared By
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default FinalOrderReceipt;
