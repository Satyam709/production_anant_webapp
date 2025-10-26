import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(req: NextRequest) {
  try {
    const pageSize = 9999; // Large number to fetch all meetings(no pagination for now)
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const time = searchParams.get('time');
    const pageNumber = parseInt(searchParams.get('page') || '1', 10);
    const currentDate = new Date();

    let meetings;
    console.log(time);
    console.log(searchParams);

    // Fetch upcoming and past meetings
    if (!time || time === 'upcoming') {
      const upcomingMeetings = await prisma.meeting.findMany({
        where: {
          starts: {
            gte: currentDate,
          },
        },
        take: pageSize,
        skip: (pageNumber - 1) * pageSize,
        orderBy: {
          starts: 'asc',
        },
      });
      meetings = { upcoming: upcomingMeetings };
    }

    if (!time || time === 'past') {
      const pastMeetings = await prisma.meeting.findMany({
        where: {
          starts: {
            lt: currentDate,
          },
        },
        take: pageSize,
        skip: (pageNumber - 1) * pageSize,
        orderBy: {
          starts: 'desc',
        },
      });
      meetings = { ...meetings, past: pastMeetings };
    }

    // Return the meetings in the response
    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Error fetching meetings: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}
