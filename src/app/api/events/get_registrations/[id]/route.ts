import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/PrismaClient/db';
import { getSession } from '@/lib/actions/Sessions';
import isSuperAdmin from '@/lib/actions/Admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session?.user || !(await isSuperAdmin())) {
      return NextResponse.json(
        { error: 'Failed to get registrations! Unauthenticated' },
        { status: 400 }
      );
    }

    const event = await prisma.events.findUnique({
      where: { event_id: id },
      include: {
        users_participated: {
          select: {
            id: true,
            roll_number: true,
            name: true,
            branch: true,
            linkedIn: true,
            github: true,
          },
        },
      },
    });

    if (!event) {
      console.log('Event not found with ID:', id);
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const escape = (v: string | null | undefined) =>
      `"${(v ?? '').replace(/"/g, '""')}"`;

    let csv = '';

    csv += `"Event Name",${escape(event.eventName)}\n`;
    csv += `"Event ID",${escape(event.event_id)}\n\n`;
    csv += 'id,roll_number,name,branch,linkedin,github\n';

    for (const user of event.users_participated) {
      csv +=
        [
          escape(user.id),
          escape(String(user.roll_number)),
          escape(user.name),
          escape(user.branch),
          escape(user.linkedIn),
          escape(user.github),
        ].join(',') + '\n';
    }

    // 🔐 UTF-8 safe
    const csvBuffer = Buffer.from(csv, 'utf8');

    const safeFileName = event.eventName
      .normalize('NFKD')
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\s+/g, '_');

    return new NextResponse(csvBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${safeFileName}_registrations.csv"`,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
