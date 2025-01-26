import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try{
        const { id } = await params;
        const team = await prisma.team.findUnique({
            where: {
                team_id:id
            },
            include:{
                team_members: true
            }
        });
        if(!team)
            return NextResponse.json({status: 404, message: "Team not found"});
        
        return NextResponse.json({status: 200, team});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}