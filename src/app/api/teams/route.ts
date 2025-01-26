import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest) {
    try{
        const session = await getSession();
        if(!session?.user){
            return NextResponse.json({status: 400, message: "User not logged in!"});
        }
        const userId = session.user.id;
        
        const teams_leaded = await prisma.team.findMany({
            where: { team_leader_id: userId },
            select: { team_name: true, team_id: true },
        });

        const teams_member = await prisma.team.findMany({
            where: { team_members: { some: { id: userId } } },
            select: { team_name: true, team_id: true },
        });

        return NextResponse.json({status: 200, teams_leaded, teams_member});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}