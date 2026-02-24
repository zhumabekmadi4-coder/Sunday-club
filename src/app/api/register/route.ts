import { NextRequest, NextResponse } from 'next/server';
import { getSheetByName } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { name, email, meeting, payment_proof } = data;

        const sheet = await getSheetByName('registrations');
        if (!sheet) {
            return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });
        }

        // Добавляем строку в таблицу
        await sheet.addRow({
            timestamp: new Date().toISOString(),
            name,
            email,
            meeting: meeting || 'Тайная история (9 Марта)',
            payment_proof: payment_proof || 'Загружено',
            status: 'ожидает'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
    }
}
