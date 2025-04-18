import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db"
import {getSession} from "@/lib/actions/Sessions"

export async function GET(req:NextRequest){
    try{
        const session = await getSession();

        if(!session){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
     
        const blogs = await prisma.blog.findMany({
            orderBy:{
                createdAt: "asc"
            }
        });

        return NextResponse.json(
            {blogs: blogs},{status:200}
        )

    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}