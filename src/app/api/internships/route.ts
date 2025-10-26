import { NextRequest,NextResponse } from 'next/server';

import isSuperAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;

    // Validate limit parameter
    if (limit !== undefined && (isNaN(limit) || limit < 1)) {
      return NextResponse.json(
        { error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }

    // Fetch internships with limit
    const internships = await prisma.internship.findMany({
      take: limit,
      include: {
        user: {
          select: {
            name: true,
            imageURL: true,
            branch: true,
            batch: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Return empty array if no internships found
    if (!internships || internships.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internships' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    // Create the internship
    const internship = await prisma.internship.create({
      data: {
        ...data,
        user_id: session.user.id,
      },
    });

    return NextResponse.json(internship);
  } catch (error) {
    console.error('Error creating internship:', error);
    return NextResponse.json(
      { error: 'Failed to create internship' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Verify admin access
    const isAdminUser = await isSuperAdmin();
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid internship ID' },
        { status: 400 }
      );
    }

    const internship = await prisma.internship.findUnique({
      where: { id: Number(id) },
    });

    if (!internship) {
      return NextResponse.json(
        { error: 'Internship not found' },
        { status: 404 }
      );
    }

    if (userId != internship.user_id && !isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the internship
    const deletedInternship = await prisma.internship.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedInternship);
  } catch (error) {
    console.error('Error deleting internship:', error);
    return NextResponse.json(
      { error: 'Failed to delete internship' },
      { status: 500 }
    );
  }
}
