import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('params', params);

    const { id: roll_number } = await params;

    console.log('r=', roll_number);

    const profile = await prisma.user.findUnique({
      where: {
        roll_number: Number(roll_number),
      },
      select: {
        id: true,
        name: true,
        roll_number: true,
        branch: true,
        batch: true,
        position: true,
        club_dept: true,
        joined: true,
        notices: true,
        imageURL: true,
        meetings_attended: true,
        meetings_conducted: true,
        compititions_created: true,
      },
    });

    if (!profile)
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
