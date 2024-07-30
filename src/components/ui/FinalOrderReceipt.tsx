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
  family: "Geist",
  fonts: [
    { src: "/fonts/sans/Geist-Regular.ttf" },
    { src: "/fonts/sans/Geist-Bold.ttf", fontWeight: "bold" },
    {
      src: "/fonts/sans/Geist-Light.ttf",
      fontWeight: "light",
    },
    { src: "/fonts/sans/Geist-Medium.ttf", fontWeight: "medium" },
    { src: "/fonts/sans/Geist-SemiBold.ttf", fontWeight: "semibold" },
  ],
});

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
  // url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/img/apple/64/',
  // withVariationSelectors: true,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
    fontFamily: "Geist",
    color: "#09090b",
    fontSize: 10,
    fontWeight: "light",
  },
  section: {
    flexGrow: 1,
    width: "50%",
    maxWidth: "50%",
    border: 1,
    borderColor: "#e4e4e7",
    // borderRadius: "12px",
    color: "#09090b",
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
    backgroundColor:'white',
    gap: 12,
  },
  articlesHeader: {
    fontSize: 10,
    fontWeight: "semibold",
  },
  items: {
    color: "#71717a",
    fontWeight: "medium",
    flexDirection: "row",
  },
  total: {
    fontFamily: "Geist",
    fontSize:11,
    fontWeight: "bold",
    color:'#71717a',
    flexDirection: "row",
  },
  price: {
    marginLeft: "auto",
    fontWeight: "light",
    color: "#09090b",
  },
  separator: {
    height: 1,
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

const defaultData: FormData = {
  admin: "admin",
  amount: "amount",
  artist: "artist",
  jobOrder: "jobOrder",
  name: "name",
  page: "page",
};

export const Rows = ({ amount }: { amount: string }) => {
  const iterations = 6;
  const rows = [];

  for (let i = 0; i < iterations; i++) {
    rows.push(
      <View key={i} style={{}}>
        <View style={{}}>
          <Text style={{}}></Text>
        </View>
        <View style={{}}>
          <Text style={{}}></Text>
        </View>
        <View style={{}}>
          <Text style={{}}>{i === 0 ? "Layout Fee" : ""}</Text>
        </View>
        <View style={{}}>
          <Text style={{}}>{i === 0 ? amount : i === 5 ? "TOTAL" : ""}</Text>
        </View>
        <View style={{}}>
          <Text style={{}}>{i === 0 ? "500" : i === 5 ? "500" : ""}</Text>
        </View>
      </View>
    );
  }

  return <>{rows}</>;
};

function FinalOrderReceipt({ data }: { data: FormData }) {
  return (
    <Document style={{ width: "100%", height: "100%" }}>
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
                Layout&nbsp;
                <Text
                  style={{
                    fontFamily: "Geist",
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
                  {getTodayDate()}
                </Text>
              </Text>
            </View>

            <View style={styles.Container}>
              <View style={styles.articlesHeader}>
                <Text>ARTICLES</Text>
              </View>
              <View style={styles.items}>
                <Text>Polo Shirt x 2 </Text>
                <Text style={styles.price}> $500.00 </Text>
              </View>
              <View style={styles.separator}></View>
              <View style={styles.items}>
                <Text>SubTotal</Text>
                <Text style={styles.price}> $500.00 </Text>
              </View>
              <View style={styles.items}>
                <Text>Shipping</Text>
                <Text style={styles.price}> $5.00 </Text>
              </View>
              <View style={styles.items}>
                <Text>Package Box</Text>
                <Text style={styles.price}> $30.00 </Text>
              </View>
              <View style={styles.total}>
                <Text>Total</Text>
                <Text style={[styles.price,{fontWeight:'semibold',fontSize:10}]}> $500.00 </Text>
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
                  marginTop: 20,
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
                Signature
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default FinalOrderReceipt;

{
  /* <View style={}>
                  <Text style={}>QTY.</Text>
                </View>
                <View style={}>
                  <Text style={}>UNIT</Text>
                </View>
              
                <View style={}>
                  <Text style={}>PRICE</Text>
                </View>
                <View style={}>
                  <Text style={}>AMOUNT</Text>
                </View>
              </View> */
}
{
  /* <Rows amount={data.amount[0]} /> */
}
