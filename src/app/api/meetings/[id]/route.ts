import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const meet = await prisma.meeting.findUnique({
      where: {
        meeting_id: id,
      },
    });
    let status = 200;
    if (!meet) status = 404;
    return NextResponse.json({ meet }, { status: status });
  } catch (error) {
    console.log('error occured ', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}
