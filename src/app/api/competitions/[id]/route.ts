import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try{
        const {id} = await params;
        const competition = await prisma.competitions.findUnique({
            where: {
                competition_id: id
            }
        });

        if(!competition){
            return NextResponse.json({status: 404, message:"Not Found"});
        }
        return NextResponse.json({ competition });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message:"Internal Server Error"});
    }
}