import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(request: NextRequest) {
    try{
        const all_categories = await prisma.certificate.findMany({
            distinct: ['issuedFor'],
            select: {
                issuedFor: true
            }
        });
        if(!all_categories){
            return NextResponse.json({error: "No certificates found"}, {status: 404});
        }
        return NextResponse.json(all_categories, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}