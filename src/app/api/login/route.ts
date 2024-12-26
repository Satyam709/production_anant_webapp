import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try{
        let {roll_number, password} = await req.json();

        if (!roll_number || !password) {
            return NextResponse.json({status: 400, message: "Roll number or password missing!"});
        }
        if (typeof roll_number != 'string' || typeof password != 'string') {
            return NextResponse.json({status: 400, message: "Invalid data type!"});
        }

        roll_number = roll_number.trim();
        password = password.trim();

        const user = await prisma.user.findUnique({where: {roll_number: Number(roll_number)}});
        if (!user) {
            return NextResponse.json({status: 400, message: "User not registered!"});
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({status: 400, message: "Invalid password!"});
        }

        if (process.env.JWT_SECRET === undefined) {
            return NextResponse.json({status: 500, message: "Internal server error! JWT_SECRET not found!"});
        }

        const token = jwt.sign({id: user.id, roll_number: roll_number}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return NextResponse.json({status: 200, token: token});
    }
    catch (e) {
        return NextResponse.json({status: 500, message: "Internal server error!"});
    }
}
