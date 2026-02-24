import { NextResponse } from 'next/server';
import { getSheetByName } from '@/lib/googleSheets';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();
    const { id } = await params;
    
    const sheet = await getSheetByName('registrations');
    if (!sheet) {
      return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });
    }

    // Получаем все строки и находим нужную по timestamp (используем как ID)
    const rows = await sheet.getRows();
    const targetRow = rows.find(row => row.get('timestamp') === id);

    if (!targetRow) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Обновляем статус
    targetRow.set('status', status);
    await targetRow.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update registration error:', error);
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const sheet = await getSheetByName('registrations');
    if (!sheet) {
      return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });
    }

    // Получаем все строки и находим нужную по timestamp (используем как ID)
    const rows = await sheet.getRows();
    const targetRow = rows.find(row => row.get('timestamp') === id);

    if (!targetRow) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Удаляем строку
    await targetRow.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}