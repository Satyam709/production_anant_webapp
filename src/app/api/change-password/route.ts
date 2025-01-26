import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import bcryptjs from "bcryptjs";
import redis from "@/helpers/redis";
import z from "zod";

const changePasswordSchema = z.object({
    roll_number: z
        .string()
        .min(1, "Roll number is required")
        .regex(/^\d+$/, "Roll number must be a number"),
    newpassword: z.string().min(8, "Password must be at least 8 characters"),
    newconfirmpassword: z.string().min(8, "Confirm password is required"),
    }).
    and(
        z.object({otp: z.string().min(6, "OTP is required"),}).or(
        z.object({password: z.string().min(8, "Password is required")}))
    );

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const result = changePasswordSchema.safeParse(body);

        // Handle schema validation errors
        if(!result.success){
            const errorMessages = result.error.errors.map((err) => err.message);
            return NextResponse.json({status: 400, message: errorMessages.join(", ")});
        }

        let { roll_number, newpassword, newconfirmpassword, otp, password } = body;

        const user = await prisma.user.findUnique({
            where: { roll_number: Number(roll_number) },
        });

        if (!user) {
            return NextResponse.json({status: 400, message: "User not found"});
        }

        
        newpassword = newpassword.trim();
        newconfirmpassword = newconfirmpassword.trim();
        if (newpassword !== newconfirmpassword) {
            return NextResponse.json({status: 400, message: "Passwords do not match"});
        }

        // password change using existing password
        if (password){
            if (!await bcryptjs.compare(password, user.password)) {
                return NextResponse.json({status: 400, message: "Invalid password"});
            }
        }
        // check OTP
        else{
            otp = otp.trim()
            const val = await redis.get(roll_number);
            if (!val) {
                return NextResponse.json({status: 400, message: "OTP expired"});
            }
            const {hashedOTP, time} = JSON.parse(val);
            const time_diff = Date.now() - time;
            if (time_diff > 600000) {
                return NextResponse.json({status: 400, message: "OTP expired"});
            }
            const isOTPCorrect = await bcryptjs.compare(otp, hashedOTP);
            if (!isOTPCorrect) {
                return NextResponse.json({status: 400, message: "Invalid OTP"});
            }
            // delete OTP from redis
            await redis.del(roll_number);
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const newpassword_hashed = await bcryptjs.hash(newpassword, salt);

        const updateUser = await prisma.user.update({
            where: { roll_number: Number(roll_number) },
            data: { password: newpassword_hashed },
        });

        if (!updateUser) {
            return NextResponse.json({status: 500, message: "Internal Server Error"});
        }
        else{
            return NextResponse.json({status: 200, message: "Password changed successfully"});
        }
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}