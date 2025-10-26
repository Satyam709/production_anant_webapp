import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/PrismaClient/db';

export async function POST(req: NextRequest) {
  try {
    let { roll_number, password } = await req.json();

    if (!roll_number || !password) {
      return NextResponse.json(
        { message: 'Roll number or password missing!' },
        { status: 400 }
      );
    }
    if (typeof roll_number != 'string' || typeof password != 'string') {
      return NextResponse.json(
        { message: 'Invalid data type!' },
        { status: 400 }
      );
    }

    roll_number = roll_number.trim();
    password = password.trim();

    const user = await prisma.user.findUnique({
      where: { roll_number: Number(roll_number) },
    });
    if (!user) {
      return NextResponse.json(
        { message: 'User not registered!' },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Invalid password!' },
        { status: 400 }
      );
    }

    if (process.env.JWT_SECRET === undefined) {
      return NextResponse.json(
        { message: 'Internal server error! JWT_SECRET not found!' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user.id, roll_number: roll_number },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return NextResponse.json({ token: token });
  } catch (e) {
    console.log('error : ', e);
    return NextResponse.json(
      { message: 'Internal server error!' },
      { status: 500 }
    );
  }
}
