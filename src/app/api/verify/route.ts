import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/helpers/mailer';
import { isValid } from '@/helpers/rollnumber_validity';
import bcryptjs from 'bcryptjs';
import redis from "@/helpers/redis";
import { PrismaClient } from '@prisma/client';
import {mailOptions} from '@/helpers/mailer';


type redis_value = {
    hashedOTP: string,
    time: number
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const {roll_number} = body;
        if (!roll_number){
            return NextResponse.json({status: 400, message: 'Roll number missing!'});
        }
        if (typeof roll_number != 'string'){
            return NextResponse.json({status: 400, message: 'Invalid data type!'});
        }
        if (!isValid(roll_number)){
            return NextResponse.json({status: 400, message: 'Roll number invalid!'})
        }

        // if roll_number already registered
        const user = await prisma.user.findUnique({where: {roll_number: Number(roll_number)}});
        if (user){
            return NextResponse.json({status: 400, message: 'User already registered!'});
        }

        // college mail_id
        const to = roll_number + "@nitkkr.ac.in";

        // OTP generation
        const max = 1000000;
        const OTP : string = String(Math.floor(Math.random() * max)).padStart(6,'0');

        // hashing OTP
        const salt = await bcryptjs.genSalt(10);
        const hashedOTP = await bcryptjs.hash(OTP,salt);
        
        // storing OTP in DB
        const value: redis_value = {
            hashedOTP: hashedOTP,
            time: Date.now()
        }
        await redis.set(roll_number,JSON.stringify(value));

        if (!process.env.MAIL_ID){
            return NextResponse.json({status: 500, message: ".env missing"});
        }

        const maildata: mailOptions = {
            from: process.env.MAIL_ID,
            to: to,
            subject: "OTP Verification For Registration in Anant",
            text: `Please don't share the OTP with anyone.\n Your OTP for registering into Anant's website is ${OTP}. \n Validity ends in 10 minutes \n Thank You`
        }

        await sendEmail(maildata);
        return NextResponse.json({status: 200, message: 'Email sent successfully'});
    }
    catch(err: any){
        console.log(err);
        return NextResponse.json({status: 500, message: err.message});
    }
}