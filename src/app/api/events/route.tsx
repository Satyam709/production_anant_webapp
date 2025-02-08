import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest) {
    try{
        const size = 5;
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const pageNumber = parseInt(searchParams.get("page") || "1", 10);

        if (pageNumber < 1){
            return NextResponse.json({status: 400, message: "Invalid page number"});
        }

        const allEvents = await prisma.events.findMany({
            take: size,
            skip: (pageNumber - 1) * size,
            orderBy:{
                registration_deadline: "asc"
            },
            select:{
                event_id: true,
                eventName: true,
                registration_deadline: true,
                conductedBy: true, 
                conductedOn: true,
                imageURL: true,
                prize: true
            }
        });

        if(!allEvents){
            return NextResponse.json({status: 404, message: "No events found"});
        }

        return NextResponse.json({status: 200, events: allEvents});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status:500, message: "Internal Server Error"});
    }
}