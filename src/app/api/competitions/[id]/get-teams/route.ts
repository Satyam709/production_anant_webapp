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

    const teams = await prisma.team.findMany({
      where: { team_leader_id: userId },
      select: {
        team_id: true,
        team_name: true,
        team_members: {
          select: { id: true },
        },
      },
    });

    const comp = await prisma.competitions.findUnique({
      where: { competition_id: id },
      select: {
        min_team_size: true,
        max_team_size: true,
        users_participated: {
          select: { id: true },
        },
      },
    });

    if (!comp) {
      return NextResponse.json(
        { error: 'Compitition not found!' },
        { status: 404 }
      );
    }

    const userSet = new Set(comp.users_participated.map((user) => user.id));

    const valid_sized_teams = teams.filter(
      (team) =>
        team.team_members.length + 1 >= comp.min_team_size &&
        team.team_members.length + 1 <= comp.max_team_size
    );

    const valid_teams = [];
    for (let i = 0; i < valid_sized_teams.length; i++) {
      const team_members = valid_sized_teams[i].team_members.map(
        (member) => member.id
      );
      const hasMatch = team_members.some((el) => userSet.has(el));
      if (!hasMatch) {
        valid_teams.push(valid_sized_teams[i]);
      }
    }

    return NextResponse.json({ valid_teams }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
