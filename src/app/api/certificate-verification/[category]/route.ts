import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    const certificates = await prisma.certificate.findMany({
      where: {
        issuedFor: category,
      },
      select: {
        id: true,
        issuedFor: true,
        issuedTo: true,
        issuedDate: true,
        ranking: true,
        fileUrl: true,
        cop: true,
        SerialNumber: true,
        roll_number: true,
        branch: true,
      },
    });

    if (!certificates) {
      return NextResponse.json(
        { error: 'No certificates found' },
        { status: 404 }
      );
    }

    return NextResponse.json(certificates, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
