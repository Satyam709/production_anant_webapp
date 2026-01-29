import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/PrismaClient/db';
import { getSession } from '@/lib/actions/Sessions';
import isSuperAdmin from '@/lib/actions/Admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getSession();

    if (!session?.user || !(await isSuperAdmin())) {
      return NextResponse.json(
        { error: 'Failed to get registrations! Unauthenticated' },
        { status: 400 }
      );
    }

    const competition = await prisma.competitions.findUnique({
      where: { competition_id: id },
      include: {
        teams: {
          where: {
            is_registered: true, 
          },
          include: {
            team_leader: {
              select: {
                id: true,
                name: true,
                roll_number: true,
                branch: true,
              },
            },
            team_members: {
              select: {
                id: true,
                name: true,
                roll_number: true,
              },
            },
          },
        },
      },
    });

    if (!competition) {
      return NextResponse.json(
        { message: 'Competition not found' },
        { status: 404 }
      );
    }

    const escape = (v: string | null | undefined) =>
      `"${(v ?? '').replace(/"/g, '""')}"`;

    let csv = '';

    csv += `"Competition Name",${escape(competition.competitionName)}\n`;
    csv += `"Competition ID",${escape(competition.competition_id)}\n\n`;
    csv +=
      'team_name,team_leader_name,team_leader_roll_number,team_leader_branch,team_members\n';

    for (const team of competition.teams) {
      const membersConcat = team.team_members
        .map((m) => `${m.name}|${m.roll_number}`)
        .join('; ');

      csv +=
        [
          escape(team.team_name),
          escape(team.team_leader?.name),
          escape(String(team.team_leader?.roll_number ?? '')),
          escape(team.team_leader?.branch),
          escape(membersConcat),
        ].join(',') + '\n';
    }

    const csvBuffer = Buffer.from(csv, 'utf8');

    const safeFileName = competition.competitionName
      .normalize('NFKD')
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\s+/g, '_');

    return new NextResponse(csvBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${safeFileName}_team_registrations.csv"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
