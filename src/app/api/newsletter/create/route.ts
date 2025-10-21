import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import { uploadAdminServerSideFile } from '@/lib/actions/uploadthing';
import prisma from '@/lib/PrismaClient/db';

const newsletterSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.enum([
    'Indian Mathematicians',
    'Foreign Mathematicians',
    'Anant Report',
  ]),
  volume: z.string(),
  file: z.custom<File>().refine(
    (file) => {
      if (!file) return false;
      return file.type === 'application/pdf';
    },
    {
      message: 'Only PDF files are allowed.',
    }
  ),
});

export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    const session = await getSession();

    if (!session || !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = session.user.id;

    const formData = await request.formData();

    const title = formData.get('title');
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string | null;
    const volume = formData.get('volume') as string | null;

    const result = newsletterSchema.safeParse({
      title,
      file,
      category,
      volume,
    });

    if (!result.success) {
      console.error('Validation errors:', result.error.format());
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const uploadFile = await uploadAdminServerSideFile(data.file);

    if (!uploadFile) {
      return NextResponse.json(
        { error: 'File upload failed' },
        { status: 500 }
      );
    }

    const fileUrl = uploadFile?.ufsUrl;

    const newsletter = await prisma.newsLetter.create({
      data: {
        title: data.title,
        fileUrl: fileUrl,
        category: category,
        volume: volume,
        writtenBy: {
          connect: {
            id: id,
          },
        },
      },
    });

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Failed to create newsletter' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Newsletter created successfully', newsletter },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
