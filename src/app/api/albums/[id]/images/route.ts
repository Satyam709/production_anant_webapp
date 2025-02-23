import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";
import z from "zod";

// Schema for Image Validation
const imageSchema = z.object({
  url: z.string().url("Invalid image URL"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: albumId } = params;
    const body = await req.json();
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const validation = imageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { url } = validation.data;

    // Check if album exists
    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // Add image to album
    const image = await prisma.albumImages.create({
      data: { url, albumId },
    });

    return NextResponse.json(
      { message: "Image added successfully", image },
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
  { params }: { params: { id: string } }
) {
  try {
    const { id: albumId } = params;

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


export async function DELETE(
  req: NextRequest,
  { params }: { params: { albumId: string; imageId: string } }
) {
  try {
    const { albumId, imageId } = params;
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if album exists
    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // Check if image exists
    const image = await prisma.albumImages.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete the image
    await prisma.albumImages.delete({ where: { id: imageId } });

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
