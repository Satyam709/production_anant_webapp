import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    return NextResponse.json({ album }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const album = await prisma.album.findUnique({ where: { id } });

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Delete all images related to this album first (to avoid foreign key constraints)
    await prisma.albumImages.deleteMany({
      where: { albumId: id },
    });

    // Delete the album
    await prisma.album.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Album deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

const updateAlbumSchema = z.object({
  newName: z.string().min(1, 'New album name is required'),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const albumId = (await params).id;
    const body = await req.json();
    const validation = updateAlbumSchema.safeParse(body);
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { newName } = validation.data;

    // Check if album exists
    const existingAlbum = await prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!existingAlbum) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Check if new name is already taken
    const nameExists = await prisma.album.findUnique({
      where: { name: newName },
    });
    if (nameExists) {
      return NextResponse.json(
        { error: 'Album name already in use' },
        { status: 400 }
      );
    }

    // Update album name
    const updatedAlbum = await prisma.album.update({
      where: { id: albumId },
      data: { name: newName },
    });

    return NextResponse.json(
      { message: 'Album name updated successfully', updatedAlbum },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
