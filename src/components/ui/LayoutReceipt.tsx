/* eslint-disable jsx-a11y/alt-text */
import { FormData } from "@/app/page";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
  },
  section: {
    flexGrow: 1,
    width: "50%",
    maxWidth: "50%",
  },
  header: {
    fontSize: 12,
    margin: 5,
  },
  mainHeader: {
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  table: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 5,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 2,
    marginTop: 10,
    height: 20,
    marginBottom: 3,
    fontSize: 9,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
});

const defaultData: FormData = {
  admin: "admin",
  amount: "amount",
  artist: "artist",
  jobOrder: "jobOrder",
  name: "name",
  page: "page",
};

export const Rows = ({ data }: { data: FormData }) => {
  const iterations = 6;
  const rows = [];

  for (let i = 0; i < iterations; i++) {
    rows.push(
      <View key={i} style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}></Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{i === 0 ? "Layout Fee" : ""}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>
            {i === 0 ? data.amount : i === 5 ? "TOTAL" : ""}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>
            {i === 0 ? "500" : i === 5 ? "500" : ""}
          </Text>
        </View>
      </View>
    );
  }

  return <>{rows}</>;
};

function LayoutReceiptPDF({ data = defaultData }: { data: FormData }) {
  return (
    <Document style={{ width: "100%", height: "100%" }}>
      <Page size={"LEGAL"} style={styles.page}>
        {Array.from({ length: 2 }).map((_, ic) => (
          <View key={ic} style={styles.section} wrap>
            <View style={styles.mainHeader}>
              <Text style={styles.header}>
                JOB ORDER:
                <Text
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  {data.jobOrder}
                </Text>
              </Text>
              <Text style={styles.header}>
                DATE:
                <Text
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  {getTodayDate()}
                </Text>
              </Text>
            </View>

            <View style={styles.mainHeader}>
              <Text style={styles.header}>
                SOLD TO:
                <Text
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  {data.name}
                </Text>
              </Text>
              <Text style={styles.header}>
                ADDRESS:
                <Text
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Sample Address
                </Text>
              </Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>QTY.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>UNIT</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>ARTICLES</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>PRICE</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>AMOUNT</Text>
                </View>
              </View>
              <Rows data={data} />
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <Image src={"/signature.png"} style={{ width: 50 }} />
              <Text
                style={{
                  borderTop: 1,
                  fontSize: 10,
                  width: 60,
                  marginLeft: "auto",
                  textAlign: "center",
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

export default LayoutReceiptPDF;
