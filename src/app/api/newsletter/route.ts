import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db"

export async function GET(req:NextRequest){
    try{
        const size = 10;
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const pageNumber = parseInt(searchParams.get("page") || "1", 10);
     
        if (pageNumber < 1) {
            return NextResponse.json(
              { message: "Invalid page number" },
              { status: 400 }
            );
        }

        const newsletter = await prisma.newsLetter.findMany({
            take: size,
            skip: (pageNumber-1)*size,
            orderBy:{
                createdAt: "desc"
            }
        });

        return NextResponse.json(
            {newletters: newsletter},{status:200}
        )

    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}