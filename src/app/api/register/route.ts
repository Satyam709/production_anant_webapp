import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, branch_options } from "@prisma/client";
import bcryptjs from "bcryptjs";
import redis from "@/helpers/redis";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    let { roll_number, username, password, confirmpassword, otp} = await req.json();
    if (!roll_number || !username || !password || !confirmpassword || !otp) {
      return NextResponse.json({ status: 400, message: "All fields are required" });
    }
    if (typeof username !== "string" || typeof roll_number !== "string" || typeof password !== "string" || typeof confirmpassword !== "string" || typeof otp !== "string") {
      return NextResponse.json({ status: 400, message: "Invalid data format" });
    }

    // trimming whitespaces
    password = password.trim();
    confirmpassword = confirmpassword.trim();
    otp = otp.trim();
    username = username.trim();
    roll_number = roll_number.trim();

    if (password !== confirmpassword) {
      return NextResponse.json({ status: 400, message: "Passwords do not match" });
    }
    if (password.length < 8) {
      return NextResponse.json({ status: 400, message: "Password must be at least 8 characters" });
    }
    const value = await redis.get(roll_number);
    if (!value) {
        return NextResponse.json({ status: 400, message: "Verification not done!" });
    }

    const {hashedOTP, time} = await JSON.parse(value);
    const time_diff = Date.now() - time;
    
    // 10 min time limit
    if (time_diff > 600000) {
        return NextResponse.json({ status: 400, message: "Verification expired!" });
    }

    const isOTPCorrect = await bcryptjs.compare(otp,hashedOTP);
    if(!isOTPCorrect){
        return NextResponse.json({ status: 400, message: "Invalid OTP!" });
    }

    // check for registered user
    const isExisting = await prisma.user.findUnique({where: {roll_number: Number(roll_number)}});
    if (isExisting) {
      return NextResponse.json({ status: 400, message: "User already exists" });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = {
        roll_number: Number(roll_number),
        name: username,
        password: hashedPassword,
        club_dept: []
    }
    const newUser = await prisma.user.create({data: user});
    if (!newUser) {
       console.log("Error in creating user");
        return NextResponse.json({ status: 500, message: "Internal Server Error: Failed saving user details" });
    }
    return NextResponse.json({ status: 200, message: "Registration Successful!" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}