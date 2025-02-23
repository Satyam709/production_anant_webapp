import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";
import z from "zod";

// Album Validation Schema
const albumSchema = z.object({
  name: z.string().min(1, "Album name is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = albumSchema.safeParse(body);
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name } = validation.data;

    // Check if album with the same name exists
    const existingAlbum = await prisma.album.findUnique({
        where:{
            name
        }
    });

    if (existingAlbum) {
      return NextResponse.json(
        { error: "Album already exists" },
        { status: 400 }
      );
    }

    // Create album
    const album = await prisma.album.create({
      data: { name },
    });

    return NextResponse.json(
      { message: "Album created successfully", album },
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

export async function GET(req: NextRequest) {
  try {
    const albums = await prisma.album.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!albums.length) {
      return NextResponse.json({ error: "No albums found" }, { status: 404 });
    }

    return NextResponse.json({ albums }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
