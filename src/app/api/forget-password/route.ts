import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/helpers/mailer";
import prisma from "@/lib/PrismaClient/db";
import bcryptjs from "bcryptjs";
import redis from "@/helpers/redis";
import z from "zod";
import { mailOptions } from "@/helpers/mailer";

const ForgetPasswordSchema = z.object({
    roll_number: z.string().min(1, "Roll number is required").regex(/^\d+$/, "Roll number must be a number"),
});

type redis_value = {
    hashedOTP: string;
    time: number;
};

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const result = ForgetPasswordSchema.safeParse(body);

        // email-missing or invalid
        if(!result.success){
            const errorMessages = result.error.errors.map((err) => err.message);
            return NextResponse.json({status: 400, message: errorMessages.join(", ")});
        }

        let { roll_number } = body;
        roll_number = roll_number.trim();
        const to = roll_number + "@nitkkr.ac.in";
        roll_number = Number(roll_number);

        // check for registered user
        const user = await prisma.user.findUnique({
            where: { roll_number: roll_number },
        });

        if(!user){
            return NextResponse.json({status: 400, message: "User not found"});
        }

        const max = 1000000;
        const OTP: string = String(Math.floor(Math.random() * max)).padStart(6,"0");
        
        // hashing OTP
        const salt = await bcryptjs.genSalt(10);
        const hashedOTP = await bcryptjs.hash(OTP, salt);

        // store hashed OTP in redis
        const value: redis_value = {
            hashedOTP: hashedOTP,
            time: Date.now(),
        };
        await redis.set(roll_number, JSON.stringify(value));
        console.log(OTP);
        
        if (!process.env.MAIL_ID) {
            return NextResponse.json({ message: ".env missing" }, { status: 500 });
        }

        const maildata: mailOptions = {
            from: process.env.MAIL_ID,
            to: to,
            subject: "Password Reset OTP of Anant",
            text: `Please don't share this OTP with anyone. \nYour OTP is ${OTP}`,
        }

        try {
            await sendEmail(maildata);
        } 
        catch (err) {
            console.log("error occured\n", err);
            return NextResponse.json({ message: "Internal Server Error: Sending email-failed"}, { status: 500 });
        }

        return NextResponse.json({status: 200, message: "OTP sent successfully to college mail id"});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal server error"});
    }
}
