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
  const sheets = await createSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "LayoutForm!A2:F",
  });

  const data = response.data.values?.map((row) => ({
    jobOrder: row[0],
    name: row[1],
    amount: row[2],
    page: row[3],
    admin: row[4],
    artist: row[5],
  }));

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as FormData;

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
          body.amount,
          body.page,
          body.admin,
          body.artist,
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
