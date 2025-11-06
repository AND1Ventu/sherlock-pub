import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  try {
    const tables = await prisma.table.findMany({
      orderBy: {
        number: 'asc',
      },
    });

    return NextResponse.json({ tables });
  } catch (error) {
    console.error('Table fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { number, capacity } = body;

    if (!number) {
      return NextResponse.json(
        { error: 'Table number is required' },
        { status: 400 }
      );
    }

    // Check if table number already exists
    const existing = await prisma.table.findUnique({
      where: { number },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Table number already exists' },
        { status: 400 }
      );
    }

    // Create table first to get ID
    const table = await prisma.table.create({
      data: {
        number,
        capacity: capacity || 4,
        qrCode: '', // Will update after generating
      },
    });

    // Generate QR code
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/qr-menu/${table.id}`;
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#1B4332',
        light: '#FFFFFF',
      },
    });

    // Update table with QR code
    const updatedTable = await prisma.table.update({
      where: { id: table.id },
      data: { qrCode: qrCodeDataURL },
    });

    return NextResponse.json({ table: updatedTable });
  } catch (error) {
    console.error('Table creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create table' },
      { status: 500 }
    );
  }
}
