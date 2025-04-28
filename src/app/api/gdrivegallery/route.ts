import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";
import z from "zod";

const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  link: z.string().min(1, "Link is required"),
  coverImage: z.string().nullable().optional()
});

// GET /api/gdrivegallery - Get all galleries
export async function GET() {
  try {
    const galleries = await prisma.gDriveGallery.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!galleries) {
      return NextResponse.json({ error: "No galleries found" }, { status: 404 });
    }

    return NextResponse.json({ galleries });
  } catch (error) {
    console.log("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

// POST /api/gdrivegallery - Create a new gallery
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || !await isAdmin()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const input = await request.json();
    const schema = gallerySchema.safeParse(input);
    
    if (!schema.success) {
      return NextResponse.json(
        { error: "Invalid schema", "resolve": {"issues": schema.error.issues }},
        { status: 400 }
      );
    }

    const gallery = await prisma.gDriveGallery.create({
      data: schema.data
    });

    return NextResponse.json({ gallery });
  } catch (error) {
    console.log("Error creating gallery:", error);
    return NextResponse.json(
      { error: "Failed to create gallery" },
      { status: 500 }
    );
  }
}
