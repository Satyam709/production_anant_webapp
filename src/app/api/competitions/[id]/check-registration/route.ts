import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params; // compititon id
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not logged in!' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const already_registered = await prisma.team.findMany({
      where: {
        competition_id: id,
        is_registered: true,
        OR: [
          { team_leader_id: userId }, // Teams where you are the leader
          { team_members: { some: { id: userId } } }, // Teams where you are a member
        ],
      },
      select: {
        team_id: true,
        team_name: true,
      },
    });

    if (already_registered.length > 0) {
      return NextResponse.json(
        { registered: true, team_registered: already_registered[0] },
        { status: 200 }
      );
    }
    return NextResponse.json({ registered: false }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}
