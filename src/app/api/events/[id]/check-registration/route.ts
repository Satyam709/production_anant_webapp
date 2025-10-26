import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ isRegistered: false });
    }

    const userId = session.user.id;

    const connectionCount = await prisma.events.count({
      where: {
        event_id: id,
        users_participated: {
          some: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { isRegistered: connectionCount > 0 ? true : false },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
