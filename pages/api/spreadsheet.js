import { GoogleSpreadsheet } from 'google-spreadsheet';

const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_CLIENT_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_PRIVATE_KEY;
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;

export async function appendSpreadsheetEx(row) {
    try {
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        console.log(doc);

        await doc.useServiceAccountAuth({
          client_email: GOOGLE_CLIENT_EMAIL,
          private_key: GOOGLE_CLIENT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        });

        await doc.loadInfo();

        console.log(SHEET_ID);
        console.log(row);

        const sheet = doc.sheetsById[SHEET_ID];
        console.log(sheet);
        await sheet.addRow(row);
    } catch (e) {
        console.error('Error: ', e);
    }
}