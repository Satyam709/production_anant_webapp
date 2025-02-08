import prisma from "@/lib/PrismaClient/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } } ) {
    try{
        const {id} = await params;
        const event = await prisma.events.findUnique({
            where: {
                event_id: id
            }
        });

        if(!event){
            return NextResponse.json({status: 404, message: "Event not found"});
        }

        return NextResponse.json({status: 200, data: event});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}