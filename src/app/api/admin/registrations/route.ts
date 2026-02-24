import { NextResponse } from 'next/server';
import { getSheetByName } from '@/lib/googleSheets';

export async function GET() {
    try {
        const sheet = await getSheetByName('registrations');
        if (!sheet) {
            return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });
        }

        const rows = await sheet.getRows();
        const registrations = rows.map((row) => ({
            id: row.get('timestamp') || Math.random().toString(),
            name: row.get('name') || '',
            email: row.get('email') || '',
            meeting: row.get('meeting') || '',
            date: row.get('timestamp') ? new Date(row.get('timestamp')).toLocaleDateString('ru-RU') : '',
            status: row.get('status') || 'ожидает',
            paymentProof: row.get('payment_proof') || '',
        }));

        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Fetch registrations error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
