import {google} from 'googleapis';
import { NextResponse } from "next/server";
type SheetForm={
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function GET() {
    return NextResponse.json({  message: 'Only POST requests are allowed' });
}
export async function POST(request: Request,response:Response) {

    if (request.method !== 'POST') {
        // return response.status().send({ message: 'Only POST requests are allowed' });
        return response.status(405).send({ message: 'Only POST requests are allowed' });
    }
    const body = request.body as SheetForm;

        try {
            //prepare auth

            const auth = new google.auth.GoogleAuth({
                credentials:{
                    client_email:process.env.GOOGLE_CLIENT_EMAIL,
                    private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
                },
                scopes:[
                    'https://www.googleapis.com/auth/spreadsheets',
                    'https://www.googleapis.com/auth/drive.file',
                    'https://www.googleapis.com/auth/drive'
                ]
            })
            const sheets = google.sheets({version:'v4',auth});

            const response = await sheets.spreadsheets.values.append({
                spreadsheetId:process.env.SHEET_ID,
                range:'A1:D1',
                valueInputOption:'USER_ENTERED',
                requestBody:{
                    values:[
                        [body.name,body.email,body.phone,body.message]
                    ]
                }
               
            });
            return res.status(200).json({data:response.data})
            
        } catch (error) {
             
            console.log(error)
            return res.status(500).send({message:'Internal Server Error'})
        }
}