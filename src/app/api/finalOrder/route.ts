import { google } from "googleapis";
import { NextRequest } from "next/server";

const createSheetsClient = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    return sheets;
  } catch (error) {
    console.error("Error creating Sheets client:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

async function getNextJobOrder(
  spreadsheetId: string = "",
  range: string
): Promise<string> {
  const sheets = await createSheetsClient();
  try {
    // Get the last row to determine the next job order
    const getLastRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = getLastRowResponse.data.values;
    let nextJobOrder = 1;

    if (rows && rows.length > 0) {
      const lastRow = rows[rows.length - 1];
      const lastJobOrderString = lastRow[0].replace("F-", "");
      const lastJobOrder = parseInt(lastJobOrderString, 10);
      nextJobOrder = isNaN(lastJobOrder) ? 1 : lastJobOrder + 1;
    }

    const formatJobOrder = "F-" + nextJobOrder;
    return formatJobOrder;
  } catch (error) {
    console.error("Error fetching job order:", error);
    throw new Error("Could not retrieve the next job order.");
  }
}

export async function GET() {
  const sheets = await createSheetsClient();

  // Get the data from the "Final-Order" sheet
  const finalOrderResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Final-Order!A2:O",
  });

  const finalOrderData =
    finalOrderResponse.data.values?.map((row) => ({
      jobOrder: row[0],
      name: row[1],
      phone: row[2],
      address: row[3],
      subtotal: row[4],
      "shipping-fee": row[5],
      "package-box": row[6],
      "tax":row[7],
      "total-cost": row[8],
      "down-payment": row[9],
      "discount":row[10],
      "layout-fee": row[11],
      "remaining-balance": row[12],
      admin: row[13],
      date: row[14],
    })) || [];

  // Get the data from the "Products" sheet
  const productsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Products!A2:F",
  });

  const productsData =
    productsResponse.data.values?.map((row) => ({
      jobOrder: row[0],
      product: row[1],
      size: row[2],
      quantity: row[3],
      price: row[4],
      total: row[5],
    })) || [];

  // Combine the final order data with the products data
  const combinedData = finalOrderData.map((order) => {
    const products = productsData.filter(
      (product) => product.jobOrder === order.jobOrder
    );
    return {
      ...order,
      products,
    };
  });

  return new Response(JSON.stringify(combinedData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as any;

  const sheets = await createSheetsClient();
  const nextJobOrder = await getNextJobOrder(
    process.env.GOOGLE_SHEET_ID,
    "LayoutForm!A:A"
  );

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "LayoutForm!A1:F1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          nextJobOrder,
          body.name,
          body.phone,
          body.address,
          body.page,
          body.admin,
          body.products,
          body.total,
          body.date,
        ],
      ],
    },
  });

  return new Response(
    JSON.stringify({ message: "Success", data: response.data }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
}
