import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/googleSheets';

export async function GET() {
    try {
        const meetings = await getMeetings();
        return NextResponse.json(meetings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
    }
}
