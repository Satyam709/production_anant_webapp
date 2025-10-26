import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

import isAdmin from '@/lib/actions/Admin';
import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const newsletter = await prisma.newsLetter.findUnique({
      where: {
        id: id,
      },
    });

    if (!newsletter) {
      return NextResponse.json(
        { message: 'Newsletter not found' },
        { status: 404 }
      );
    }

    const fileUrl = newsletter.fileUrl;
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      throw new Error('Failed to fetch file from source');
    }

    const blob = await fileResponse.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${newsletter.title}.pdf"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const authorized = await isAdmin();
    const utapi = new UTApi();

    const newsLetter = await prisma.newsLetter.findUnique({
      where: {
        id: id,
      },
    });

    if (!newsLetter) {
      return NextResponse.json(
        { message: 'Newsletter not found' },
        { status: 404 }
      );
    }

    if (!authorized) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const key = newsLetter.fileUrl.split('/').pop() as string;

    const file_delete = await utapi.deleteFiles(key);

    if (!file_delete) {
      return NextResponse.json(
        { message: 'File deletion failed' },
        { status: 500 }
      );
    }

    const psql_delete = await prisma.newsLetter.delete({
      where: {
        id: id,
      },
    });

    if (!psql_delete) {
      return NextResponse.json(
        { message: 'File deleted but entry remains!' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Newsletter deleted' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
