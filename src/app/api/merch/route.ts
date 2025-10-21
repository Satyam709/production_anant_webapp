import { NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET() {
  try {
    const merch = await prisma.merchandise.findMany();

    return NextResponse.json(merch, { status: 200 });
  } catch (error) {
    console.error('Error fetching merchandise: ', error);

    return NextResponse.json(
      { error: 'Failed to fetch merchandise' },
      { status: 500 }
    );
  }
}
