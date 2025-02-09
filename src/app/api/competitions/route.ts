import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest) {
    try{
        const size = 5;
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const pageNumber = parseInt(searchParams.get("page") || "1", 10);
        
        const allcomp = await prisma.competitions.findMany({
            take: size,
            skip: (pageNumber - 1) * size,
            orderBy: {
                conductedOn: "desc"
            }
        });


        return NextResponse.json({ competitions: allcomp });

    }
    catch(err){
        return NextResponse.json({status: 500, message:"Internal Server Error"});
    }
}