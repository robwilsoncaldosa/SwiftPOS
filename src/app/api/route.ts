import {google} from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
type SheetForm={
    name: string;
    email: string;
    phone: string;
    message: string;
}

// export async function GET() {
//     return NextResponse.json({  message: 'Only POST requests are allowed' });
// }


export async function POST(
req: NextRequest
) {


const body = await req.json() as SheetForm;
try {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets'
        ]
    })

    const sheets = google.sheets({
        auth,
        version: 'v4',
    });

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A1:D1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                [body.name, body.email, body.phone, body.message]
            ]
        }
    });

    return new Response(JSON.stringify({message: 'Success', data: response.data}), {
        headers: {
            'Content-Type': 'application/json'
        },
        status:201,
    })
}
catch (e) {
    return new NextResponse(JSON.stringify({message: 'Error', error: e}), {
        headers: {
            'Content-Type': 'application/json'
        },
        status:500,
    })

}

}