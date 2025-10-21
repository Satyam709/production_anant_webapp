import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  link: z.string().min(1, 'Link is required'),
  coverImage: z.string().nullable().optional(),
});

// GET /api/gdrivegallery/[id] - Get single gallery
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const gallery = await prisma.gDriveGallery.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

// PATCH /api/gdrivegallery/[id] - Update gallery
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const input = await request.json();
    const schema = gallerySchema.safeParse(input);

    if (!schema.success) {
      return NextResponse.json(
        { error: 'Invalid schema', resolve: { issues: schema.error.issues } },
        { status: 400 }
      );
    }

    const gallery = await prisma.gDriveGallery.update({
      where: {
        id: params.id,
      },
      data: schema.data,
    });

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error('Error updating gallery:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery' },
      { status: 500 }
    );
  }
}

// DELETE /api/gdrivegallery/[id] - Delete gallery
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user || !(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.gDriveGallery.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery' },
      { status: 500 }
    );
  }
}
