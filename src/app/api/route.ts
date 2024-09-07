import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FormData } from "../HomePage";
import { cookies } from "next/headers";

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
    try {
        const sheets = await createSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "LayoutForm!A2:I",
        });

        const data = response.data.values?.map((row) => ({
            jobOrder: row[0],
            name: row[1],
            phone: row[2],
            address: row[3],
            page: row[4],
            admin: row[5],
            products: row[6],
            total: row[7],
            date: row[8],
        }));

        if (!data) {
            return new Response(JSON.stringify([]), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }
}





//for finalOrder inserting Data GoogleSheet
interface FinalOrderData extends FormData {
  subtotal: string;
  "shipping-fee": string;
  "package-box": string;
  "total-cost": string;
  "down-payment": string;
  "layout-fee": string;
  "remaining-balance": string;
  [key: `product${number}` | `size${number}` | `quantity${number}` | `price${number}` | `total${number}`]: string | number;
}
export async function POST(req: NextRequest) {
  const body = (await req.json()) as FinalOrderData;

  const sheets = await createSheetsClient();
  const nextJobOrder = await getNextJobOrder(
    process.env.GOOGLE_SHEET_ID,
    "Final-Order!A:A"
  );

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Final-Order!A1:M1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          nextJobOrder,
          body.name,
          body.phone,
          body.address,
          body.subtotal,
          body["shipping-fee"],
          body["package-box"],
          body["total-cost"],
          body["down-payment"],
          body["layout-fee"],
          body["remaining-balance"],
          body.admin,
          body.date
        ],
      ],
    },
  });

  const productEntries = [];
  for (let i = 1; i <= Object.keys(body).length; i++) {
      if (body[`product${i}`]) {
          productEntries.push([
              nextJobOrder,
              body[`product${i}`],
              body[`size${i}`],
              body[`quantity${i}`],
              body[`price${i}`],
              body[`total${i}`]
          ]);
      }
  }
  
  if (productEntries.length > 0) {
      const insertProducts = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Products!A1:F1",
          valueInputOption: "USER_ENTERED",
          requestBody: {
              values: productEntries,
          },
      });
  }
  
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
