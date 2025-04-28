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

    const session = await getSession();
    const authorized = await isSuperAdmin();
    
    if (!session) {
        return NextResponse.json([],{status: 401});
    }
    const userId = session.user.id;

    let internships: any[] = [];

    if (authorized){
        // Fetch internships with limit
        internships = await prisma.internship.findMany({
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
    }

    else{
        // Fetch internships with limit
        internships = await prisma.internship.findMany({
            where:{
                user_id: userId
            },
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
    }
    

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