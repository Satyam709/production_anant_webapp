import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const achievements = await prisma.departmentAchievements.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(
      { achievements },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
