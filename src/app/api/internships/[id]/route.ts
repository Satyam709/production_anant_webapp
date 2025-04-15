import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id || isNaN(parseInt(params.id))) {
    return NextResponse.json(
      { error: "Invalid internship ID" },
      { status: 400 }
    );
  }

  try {
    const internship = await prisma.internship.findUnique({
      where: {
        id: parseInt(params.id),
        is_active: true
      },
      include: {
        user: {
          select: {
            name: true,
            imageURL: true,
            branch: true,
            batch: true
          }
        }
      }
    });

    if (!internship) {
      return NextResponse.json(
        { error: "Internship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(internship);
  } catch (error) {
    console.error("Error fetching internship:", error);
    return NextResponse.json(
      { error: "Failed to fetch internship" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
