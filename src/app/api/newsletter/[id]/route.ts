import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;

        const newsletter = await prisma.newsLetter.findUnique({
            where:{
                id: id
            }
        });

        if(!newsletter){
            return NextResponse.json(
                { message: "Newsletter not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { newsletter: newsletter },{status:200}
        )

    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}