import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isSuperAdmin from "@/lib/actions/Admin";

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    // Validate limit parameter
    if (limit !== undefined && (isNaN(limit) || limit < 1)) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
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
            batch: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    // Return empty array if no internships found
    if (!internships || internships.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(internships);
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json(
      { error: "Failed to fetch internships" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    console.error("Error creating internship:", error);
    return NextResponse.json(
      { error: "Failed to create internship" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Verify admin access
    const isAdminUser = await isSuperAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid internship ID" }, { status: 400 });
    }

    // Delete the internship
    const deletedInternship = await prisma.internship.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json(deletedInternship);
  } catch (error) {
    console.error("Error deleting internship:", error);
    return NextResponse.json(
      { error: "Failed to delete internship" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
