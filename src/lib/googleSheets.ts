import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Конфигурация аутентификации (будет создана только если переменные окружения существуют)
const getServiceAccountAuth = () => {
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        return null;
    }
    
    return new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
};

export const getGoogleSheet = async () => {
    const serviceAccountAuth = getServiceAccountAuth();
    if (!serviceAccountAuth || !SPREADSHEET_ID) {
        return null;
    }
    
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc;
};

export const getSheetByName = async (name: string) => {
    const doc = await getGoogleSheet();
    if (!doc) {
        return null;
    }
    return doc.sheetsByTitle[name];
};
