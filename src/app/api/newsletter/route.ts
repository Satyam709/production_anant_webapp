import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(request: NextRequest) {
  try {
    const allNewsletters = await prisma.newsLetter.findMany({
      orderBy: {
        publisedAt: 'desc',
      },
    });

    if (!allNewsletters) {
      return NextResponse.json(
        { error: 'No newsletters found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ newsletters: allNewsletters }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
