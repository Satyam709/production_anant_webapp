import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const notice = await prisma.notice.findUnique({
      where: {
        notice_id: id,
      },
      include: {
        postedBy: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log('Notice: ', notice);
    let status = 200;
    if (!notice) status = 404;
    return NextResponse.json({ notice }, { status: status });
  } catch (error) {
    console.error('Error fetching notices: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    );
  }
}
