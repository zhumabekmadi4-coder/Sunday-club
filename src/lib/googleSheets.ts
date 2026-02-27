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

export interface Meeting {
    id: string;
    date: string;
    time: string;
    location: string;
    bookTitle: string;
    bookAuthor: string;
    bookCover: string;
    status: 'Reading Now' | 'Upcoming' | 'Archive';
    description?: string;
}

export const getMeetings = async (): Promise<Meeting[]> => {
    const sheet = await getSheetByName('meetings');
    if (!sheet) return [];

    const rows = await sheet.getRows();
    return rows.map(row => ({
        id: row.get('id'),
        date: row.get('date'),
        time: row.get('time'),
        location: row.get('location'),
        bookTitle: row.get('booktitle'), // Match lowercase 't' from screenshot
        bookAuthor: row.get('bookAuthor'),
        bookCover: row.get('bookCover'),
        status: row.get('status') as Meeting['status'],
        description: row.get('description'),
    }));
};

export const addMeeting = async (meeting: Omit<Meeting, 'id'>) => {
    const sheet = await getSheetByName('meetings');
    if (!sheet) return null;

    return await sheet.addRow({
        id: Date.now().toString(),
        date: meeting.date,
        time: meeting.time,
        location: meeting.location,
        booktitle: meeting.bookTitle, // Match sheet header
        bookAuthor: meeting.bookAuthor,
        bookCover: meeting.bookCover,
        status: meeting.status,
        description: meeting.description || ''
    });
};
