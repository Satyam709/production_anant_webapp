import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

const competitionSchema = z.object({
  competitionName: z.string(),
  conductedOn: z.string(),
  conductedBy: z.string(),
  registration_deadline: z.string(),
  venue: z.string(),
  description: z.string(),
  prize: z.string(),
  min_team_size: z.number().min(1),
  max_team_size: z.number().min(1),
  imageURL: z.string(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;
    const schema = competitionSchema.safeParse(body);
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json(
        { error: 'Failed to update competition! Unauthenticated' },
        { status: 400 }
      );
    }

    if (!schema.success) {
      console.log(schema.error);

      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const {
      competitionName,
      conductedOn,
      conductedBy,
      registration_deadline,
      venue,
      description,
      prize,
      min_team_size,
      max_team_size,
      imageURL,
    } = schema.data;

    if (max_team_size < min_team_size) {
      return NextResponse.json(
        {
          error:
            'Max team size should be greater than or equal to min team size',
        },
        { status: 400 }
      );
    }

    if (
      isNaN(Date.parse(conductedOn)) ||
      isNaN(Date.parse(registration_deadline))
    ) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    const conductedOn_dt = new Date(conductedOn);
    const registration_deadline_dt = new Date(registration_deadline);

    // Check if the competition exists
    const existingCompetition = await prisma.competitions.findUnique({
      where: { competition_id: id },
    });

    if (!existingCompetition) {
      return NextResponse.json(
        { error: 'Competition not found' },
        { status: 404 }
      );
    }

    // Update the competition
    const updatedCompetition = await prisma.competitions.update({
      where: { competition_id: id },
      data: {
        competitionName,
        conductedOn: conductedOn_dt,
        conductedBy,
        registration_deadline: registration_deadline_dt,
        venue,
        description,
        prize,
        min_team_size,
        max_team_size,
        imageURL,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Competition updated successfully',
      data: updatedCompetition,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
