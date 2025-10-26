import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import isSuperAdmin from '@/lib/actions/Admin';
import prisma from '@/lib/PrismaClient/db';

const certificateSchema = z.object({
  issuedFor: z.string().min(1),
  issuedTo: z.string().min(1),
  issuedDate: z.string().optional(),
  roll_number: z.string().optional(),
  branch: z.string().optional(),
  ranking: z.number().optional(),
  fileUrl: z.string(),
  SerialNumber: z.string().optional(),
  cop: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const authorized = await isSuperAdmin();
    if (!authorized)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = certificateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }
    const {
      issuedFor,
      issuedTo,
      issuedDate,
      roll_number,
      branch,
      ranking,
      fileUrl,
      SerialNumber,
      cop,
    } = result.data;
    let dateObj: Date | null = null; // yyyy-mm-dd format
    if (issuedDate) {
      const [year, month, day] = issuedDate.split('-');
      dateObj = new Date(Number(year), Number(month) - 1, Number(day)); // month is 0-based
    }
    const certificate = await prisma.certificate.create({
      data: {
        issuedFor,
        issuedTo,
        issuedDate: issuedDate ? dateObj : null,
        roll_number,
        branch,
        ranking,
        fileUrl,
        SerialNumber,
        cop: cop ? cop : false,
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate creation failed' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Certificate created successfully', certificate },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
