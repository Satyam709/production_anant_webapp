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

        const blogs = await prisma.blog.findMany({
            where:{
                isVerified: true
            },
            take: size,
            skip: (pageNumber-1)-size,
            orderBy:{
                createdAt: "asc"
            }
        });

        return NextResponse.json(
            {blogs: blogs},{status:200}
        )

    }
    catch(err){
        console.log(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}