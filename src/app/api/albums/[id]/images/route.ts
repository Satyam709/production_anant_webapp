import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";
import z from "zod";

// Schema for validating multiple image URLs
const imageSchema = z.object({
  urls: z.array(z.string().url("Invalid image URL")).min(1, "At least one image URL is required"),
});

// Add multiple images to an album
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: albumId } = await params;
    const body = await req.json();
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const validation = imageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.message }, { status: 400 });
    }

    const { urls } = validation.data;

    // Check if album exists
    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // Add multiple images to the album
    const createdImages = await prisma.albumImages.createMany({
      data: urls.map((url) => ({
        url,
        albumId,
      })),
    });

    return NextResponse.json(
      { message: "Images added successfully", count: createdImages.count },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: albumId } = await params;

    // Check if album exists
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: { images: true },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ images: album.images }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



