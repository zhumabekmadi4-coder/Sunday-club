import { NextResponse } from 'next/server';
import { getSheetByName } from '@/lib/googleSheets';

export async function GET() {
    try {
        const sheet = await getSheetByName('books');
        if (!sheet) {
            // Если листа нет, вернем пустой список вместо ошибки, так как это не критично
            return NextResponse.json([]);
        }

        const rows = await sheet.getRows();
        const books = rows.map((row) => ({
            title: row.get('title') || '',
            author: row.get('author') || '',
            status: row.get('status') || 'Planned',
            date: row.get('date') || 'не указана',
        }));

        return NextResponse.json(books);
    } catch (error) {
        console.error('Fetch books error:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
