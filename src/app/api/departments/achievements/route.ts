import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";
import z from "zod";
import { Prisma } from "@prisma/client";

const achievementSchema = z.object({
  department: z.string().min(1, "Department is required"),
  achievement: z.string().min(1, "Achievement is required"),
  description: z.string().optional(),
  imageURL: z.string().optional(),
});

// POST: Add new achievement
export async function POST(req: NextRequest) {
  const input = await req.json();
  const schema = achievementSchema.safeParse(input);
  const session = await getSession();

  if (!session?.user || !(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized - Admin only" },
      { status: 401 }
    );
  }

  if (!schema.success) {
    return NextResponse.json(
      { error: "Invalid schema", resolve: { issues: schema.error.issues } },
      { status: 400 }
    );
  }

  try {
    const newAchievement = await prisma.departmentAchievements.create({
      data: schema.data,
    });

    return NextResponse.json(
      {
        response: "Achievement created!",
        achievement: newAchievement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in creating achievement:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}

// GET: Get all achievements
export async function GET() {
  try {
    const achievements = await prisma.departmentAchievements.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ achievements }, { status: 200 });
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

// DELETE: Delete an achievement (admin only)
export async function DELETE(req: NextRequest) {
  const session = await getSession();

  if (!session?.user || !(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized - Admin only" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Deleting achievement with ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Achievement ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.departmentAchievements.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      response: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
