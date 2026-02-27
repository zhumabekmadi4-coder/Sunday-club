import { NextRequest, NextResponse } from 'next/server';
import { getSheetByName } from '@/lib/googleSheets';

export async function GET() {
    try {
        const sheet = await getSheetByName('meetings');
        if (!sheet) return NextResponse.json([], { status: 404 });

        const rows = await sheet.getRows();
        return NextResponse.json(rows.map(r => ({
            id: r.get('id'),
            title: r.get('booktitle'), // Use lowercase 't' from sheet
            author: r.get('bookAuthor'),
            status: r.get('status'),
            date: r.get('date')
        })));
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const sheet = await getSheetByName('meetings');
        if (!sheet) return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });

        await sheet.addRow({
            id: Date.now().toString(),
            date: data.date,
            time: data.time,
            location: data.location,
            bookTitle: data.title,
            bookAuthor: data.author,
            bookCover: data.cover || '',
            status: data.status || 'Upcoming'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
