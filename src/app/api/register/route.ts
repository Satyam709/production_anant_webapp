import {
  branch_options,
  club_dept_options,
  position_options,
} from '@prisma/client';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import z from 'zod';

import keystore from '@/lib/keystore/store';
import prisma from '@/lib/PrismaClient/db';

const RegistrationSchema = z.object({
  roll_number: z
    .string()
    .min(1, 'Roll number is required')
    .regex(/^\d+$/, 'Roll number must be a number'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmpassword: z.string().min(8, 'Confirm password is required'),
  otp: z.string().min(6, 'OTP is required'),
  branch: z.string().min(1, 'Branch is required'),
});

async function parseCSV(rno: number) {
  const filePath = path.join(process.cwd(), 'src/data/admins.csv');
  const csvData = fs.readFileSync(filePath, 'utf8');

  // windows line endings
  const rows = csvData
    .replace(/\r/g, '')
    .split('\n')
    .map((row) => row.split(','));
  // const rows = csvData.split("\n").map((row) => row.split(","));
  const headers = rows[0];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row[0] === rno.toString()) {
      const user = Object.fromEntries(headers.map((h, idx) => [h, row[idx]]));
      return user;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = RegistrationSchema.safeParse(body);

    // Handle schema validation errors
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return NextResponse.json(
        {
          status: 400,
          message: errorMessages.join(', '),
        },
        { status: 400 }
      );
    }

    let { roll_number, username, password, confirmpassword, otp, branch } =
      body;

    // trimming whitespaces
    password = password.trim();
    confirmpassword = confirmpassword.trim();
    otp = otp.trim();
    username = username.trim();
    roll_number = roll_number.trim();

    // check for registered user
    const isExisting = await prisma.user.findUnique({
      where: { roll_number: Number(roll_number) },
    });
    if (isExisting) {
      return NextResponse.json(
        {
          status: 400,
          message: 'User already exists',
        },
        { status: 400 }
      );
    }

    if (password !== confirmpassword) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Passwords do not match',
        },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Password must be at least 8 characters',
        },
        { status: 400 }
      );
    }
    const value = await keystore.get(roll_number);
    if (!value) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Verification not done!',
        },
        { status: 400 }
      );
    }

    const { hashedOTP, time } = await JSON.parse(value);
    const time_diff = Date.now() - time;

    // 10 min time limit
    if (time_diff > 600000) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Verification expired!',
        },
        { status: 400 }
      );
    }

    const isOTPCorrect = await bcryptjs.compare(otp, hashedOTP);
    if (!isOTPCorrect) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Invalid OTP!',
        },
        { status: 400 }
      );
    }

    // delete OTP from redis
    await keystore.delete(roll_number);

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // get user_details
    const user_details = await parseCSV(Number(roll_number));

    let user;
    // not an admin
    if (!user_details) {
      // Validate branch enum
      if (!Object.values(branch_options).includes(branch as branch_options)) {
        return NextResponse.json(
          {
            status: 400,
            message: 'Invalid branch selected',
          },
          { status: 400 }
        );
      }

      user = {
        roll_number: Number(roll_number),
        name: username,
        password: hashedPassword,
        club_dept: [],
        branch: branch as branch_options,
      };
    } else {
      console.log('User details: ', user_details);
      // Validate branch from CSV if needed, but assuming valid for now or fallback
      const csvBranch = user_details['branch'] as keyof typeof branch_options;

      user = {
        roll_number: Number(roll_number),
        name: username,
        password: hashedPassword,
        batch: user_details['batch'],
        branch:
          branch_options[csvBranch] ||
          branch_options[branch as keyof typeof branch_options], // Fallback to selected branch if CSV fails? Or just trust CSV.
        // Actually, user said admins strictly use CSV info potentially.
        // "I think if they are in the admins they already have their branch so there is no issues with that"
        // Let's stick to existing logic for admins but maybe fallback if undefined in CSV?
        // existing logic: branch: branch_options[user_details['branch'] as keyof typeof branch_options],

        position:
          position_options[
            user_details['position'] as keyof typeof position_options
          ],
        club_dept: [
          club_dept_options[
            user_details['club_dept'] as keyof typeof club_dept_options
          ],
        ],
      };

      // If CSV branch is invalid/missing, we might want to use the one from registration form?
      // But keeping it simple as per request: "no issues with that"
    }

    const newUser = await prisma.user.create({ data: user });
    if (!newUser) {
      console.log('Error in creating user');
      return NextResponse.json(
        {
          status: 500,
          message: 'Internal Server Error: Failed saving user details',
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        message: 'Registration Successful!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error in registration: ', error);
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
