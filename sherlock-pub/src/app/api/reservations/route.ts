import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, specialRequests } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create reservation date time
    const reservationDateTime = new Date(`${date}T${time}:00`);

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        date: reservationDateTime,
        time,
        guests: parseInt(guests),
        specialRequests,
        status: 'PENDING',
      },
    });

    // TODO: Send confirmation email

    return NextResponse.json({
      reservationId: reservation.id,
      reservation,
    });
  } catch (error) {
    console.error('Reservation creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    const where: any = {};
    if (status) where.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Reservation fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}
