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
    padding: 16,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 7,
  },
  Header: {
    fontSize: 10,
    fontWeight: "medium",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  items: {
    color: "#71717a",
    fontWeight: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "extrabold",
    color: "#71717a",
    flexDirection: "row",
  },
  value: {
    marginLeft: "auto",
    color: "#09090b",
  },
  separator: {
    height: 0.7,
    backgroundColor: "#e4e4e7",
    marginVertical: 10,
  },
});

interface FinalOrderData extends FormData {
    "subtotal":string
    "shipping-fee":string
    "package-box":string
    "total-cost":string
    "down-payment":string
    "layout-fee":string
    "remaining-balance":string
    "jobOrder":string
    "date":string
}

function FinalOrderReceipt({ data }: { data: FinalOrderData }) {
  // Extract the keys from the data object that match the pattern for products
  const products = Object.keys(data)
    .filter((key) => key.startsWith("product") && !key.startsWith("products"))
    .map((key) => {
      const index = key.replace("product", "");
      return {
        //@ts-ignore
        product: data[`product${index}`],
        //@ts-ignore
        size: data[`size${index}`],
        //@ts-ignore
        price: data[`price${index}`],
        //@ts-ignore
        quantity: data[`quantity${index}`],
        //@ts-ignore
        total: data[`total${index}`],
      };
    });
  console.log(products);
  return (
    <Document style={{ width: "100%", height: "100%" }} title="Final Receipt">
      <Page size={"LEGAL"} style={styles.page}>
        {Array.from({ length: 1 }).map((_, ic) => (
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
                Order&nbsp;
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
                <Text>Products</Text>
                <Text>Sizes</Text>
                <Text>Price</Text>
                <Text>Quantity</Text>
                <Text>Total</Text>
              </View>
              {products.map((item, index) => (

              <View key={index} style={styles.items}>
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text style={{ flexBasis: 60, marginRight: 50 }}>
                      {item.product}
                    </Text>
                    <Text
                      style={{
                        color: "#09090b",
                        flexBasis: 30,
                      }}
                    >
                      {item.size}
                    </Text>
                    <Text style={{ color: "#09090b", marginRight:70,marginLeft:25 }}>
                      ₱{item.price}
                    </Text>
                    <Text
                      style={{
                        color: "#09090b",
                        flexBasis: 20,
                        marginRight: 20,
                      }}
                    >
                      {item.quantity}
                    </Text>
                    <Text
                      style={{
                        color: "#09090b",
                        flexBasis: 30,
                        marginRight: 20,
                      }}
                    >
                      ₱{item.total}
                    </Text>
                  </View>
              </View>
                ))}

              <View style={styles.separator}></View>
              <View style={styles.items}>
                <Text style={{ marginRight: "auto" }}>SubTotal</Text>
                <Text style={styles.value}>₱{data.subtotal}</Text>
              </View>
              <View style={styles.items}>
                <Text style={{ marginRight: "auto" }}>Shipping</Text>
                <Text style={styles.value}>₱{data['shipping-fee']}</Text>
              </View>
              <View style={styles.items}>
                <Text style={{ marginRight: "auto" }}>
                  Package Box - Medium
                </Text>
                <Text style={styles.value}>₱{data['package-box']}</Text>
              </View>
              <View style={styles.items}>
                <Text style={{ marginRight: "auto" }}>Total</Text>
                <Text style={styles.value}>₱{data['total-cost']}</Text>
              </View>
              <View style={styles.items}>
                <Text>Downpayment</Text>
                <Text
                  style={[styles.value, { color: "red", fontWeight: "medium" }]}
                >
                  - ₱{data['down-payment']}
                </Text>
              </View>
              {data['layout-fee'] === '0' ? null : (
              <View style={styles.items}>
                
              <Text>Layout Fee - Paid</Text>
              <Text
                style={[styles.value, { color: "red", fontWeight: "medium" }]}
              >
                - ₱{data['layout-fee']}
              </Text>
            </View>
              )}
              
              <View style={styles.total}>
                <Text>Remaining Balance</Text>
                <Text style={[styles.value, { fontSize: 10, color: "black" }]}>
                ₱{data['remaining-balance']}
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
                marginBottom: 20,
              }}
            >
              <Image
                src={"/signature.png"}
                style={{
                  width: 50,
                  position: "absolute",
                  backgroundColor: "transparent",
                  bottom: 8,
                  right: 8,
                  marginRight: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginRight: 20,
                  fontWeight: "bold",
                }}
              >
                Jannah Aleriosa
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
        ))}
      </Page>
    </Document>
  );
}

export default FinalOrderReceipt;
