import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      where: { is_active: true },
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
