import { error } from 'console';
import { select } from 'framer-motion/client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

const inviteSchema = z.object({
  team_id: z.string(),
  invitee_roll_number: z
    .string()
    .min(1, 'Roll number is required')
    .regex(/^\d+$/, 'Roll number must be a number'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = inviteSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return NextResponse.json({
        status: 400,
        message: errorMessages.join(', '),
      });
    }

    const { team_id, invitee_roll_number } = body;

    if (isNaN(Number(invitee_roll_number))) {
      return NextResponse.json(
        { error: 'Invalid Roll Number' },
        { status: 401 }
      );
    }

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not logged in!' },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    if (userId == invitee_roll_number) {
      return NextResponse.json(
        { error: 'You cannot invite yourself!' },
        { status: 400 }
      );
    }

    const team = await prisma.team.findUnique({
      where: { team_id: team_id },
      select: {
        team_leader_id: true,
        team_id: true,
        team_name: true,
        team_members: {
          select: {
            roll_number: true,
          },
        },
      },
    });

    if (team?.team_leader_id !== userId) {
      return NextResponse.json(
        { error: 'You are not the team leader!' },
        { status: 403 }
      );
    }

    let isMember = false;
    for (let i = 0; i < team.team_members.length; i++) {
      if (team.team_members[i].roll_number == Number(invitee_roll_number)) {
        isMember = true;
        break;
      }
    }

    if (isMember) {
      return NextResponse.json({ error: 'Already in team!' }, { status: 400 });
    }

    const invitee = await prisma.user.findUnique({
      where: { roll_number: Number(invitee_roll_number) },
    });

    if (!invitee) {
      return NextResponse.json(
        { error: 'Invitee not found!' },
        { status: 404 }
      );
    }

    const check_inv = await prisma.pending_requests.findFirst({
      where: {
        team_id: team_id,
        user_id: invitee.id,
      },
      select: {
        request_id: true,
      },
    });

    if (check_inv) {
      return NextResponse.json(
        { error: 'Invitation already send' },
        { status: 409 }
      );
    }

    const invitation = await prisma.pending_requests.create({
      data: {
        team_id: team_id,
        user_id: invitee.id,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Failed to send invitation!' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: `Invitation sent to ${invitee.name}!`,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 200 }
    );
  }
}
