import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import bcryptjs from "bcryptjs";
import redis from "@/helpers/redis";
import z from "zod";

const RegistrationSchema = z.object({
  roll_number: z
    .string()
    .min(1, "Roll number is required")
    .regex(/^\d+$/, "Roll number must be a number"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmpassword: z.string().min(1, "Confirm password is required"),
  otp: z.string().min(1, "OTP is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = RegistrationSchema.safeParse(body);

    // Handle schema validation errors
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return NextResponse.json({
        status: 400,
        message: errorMessages.join(", "),
      });
    }

    let { roll_number, username, password, confirmpassword, otp } = body;

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
      return NextResponse.json({ status: 400, message: "User already exists" });
    }

    if (password !== confirmpassword) {
      return NextResponse.json({
        status: 400,
        message: "Passwords do not match",
      });
    }
    if (password.length < 8) {
      return NextResponse.json({
        status: 400,
        message: "Password must be at least 8 characters",
      });
    }
    const value = await redis.get(roll_number);
    if (!value) {
      return NextResponse.json({
        status: 400,
        message: "Verification not done!",
      });
    }

    const { hashedOTP, time } = await JSON.parse(value);
    const time_diff = Date.now() - time;

    // 10 min time limit
    if (time_diff > 600000) {
      return NextResponse.json({
        status: 400,
        message: "Verification expired!",
      });
    }

    const isOTPCorrect = await bcryptjs.compare(otp, hashedOTP);
    if (!isOTPCorrect) {
      return NextResponse.json({ status: 400, message: "Invalid OTP!" });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = {
      roll_number: Number(roll_number),
      name: username,
      password: hashedPassword,
      club_dept: [],
    };
    const newUser = await prisma.user.create({ data: user });
    if (!newUser) {
      console.log("Error in creating user");
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error: Failed saving user details",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Registration Successful!",
    });
  } catch (error) {
    console.log("Error in registration: ", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
