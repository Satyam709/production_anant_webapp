import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import sendEmail, { mailOptions } from '@/helpers/mailer';
import keystore from '@/lib/keystore/store';
import prisma from '@/lib/PrismaClient/db';

const ForgetPasswordSchema = z.object({
  roll_number: z
    .string()
    .min(1, 'Roll number is required')
    .regex(/^\d+$/, 'Roll number must be a number'),
});

type redis_value = {
  hashedOTP: string;
  time: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = ForgetPasswordSchema.safeParse(body);

    // email-missing or invalid
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      console.log(errorMessages.join(', '));
      return NextResponse.json(
        {
          message: errorMessages.join(', '),
        },
        { status: 400 }
      );
    }

    let roll_number = result.data.roll_number;
    const to = roll_number + '@nitkkr.ac.in';

    // check for registered user
    const user = await prisma.user.findUnique({
      where: { roll_number: Number(roll_number) },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const max = 1000000;
    const OTP: string = String(Math.floor(Math.random() * max)).padStart(
      6,
      '0'
    );
    console.log('OTP: ', OTP);

    // hashing OTP
    const salt = await bcryptjs.genSalt(10);
    const hashedOTP = await bcryptjs.hash(OTP, salt);

    // store hashed OTP in redis
    const value: redis_value = {
      hashedOTP: hashedOTP,
      time: Date.now(),
    };
    console.log('storing OTP in redis');
    await keystore.set(roll_number, JSON.stringify(value));

    if (!process.env.MAIL_ID) {
      return NextResponse.json({ message: '.env missing' }, { status: 500 });
    }

    const maildata: mailOptions = {
      from: process.env.MAIL_ID,
      to: to,
      subject: 'Password Reset OTP of Anant',
      text: `Please don't share this OTP with anyone. \nYour OTP is ${OTP}`,
    };

    try {
      await sendEmail(maildata);
    } catch (err) {
      console.log('mail cannot be sent\n', err);
      return NextResponse.json(
        { message: 'Internal Server Error: Sending email-failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: 'OTP sent successfully to college mail id',
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
