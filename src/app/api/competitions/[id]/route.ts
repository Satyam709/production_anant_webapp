import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try{
        const {id} = await params;
        const session = await getSession();
        const { searchParams } = new URL(req.url); 
        const participant = searchParams.get("participant");

        let competition;
        if(participant === "true"){
            competition = await prisma.competitions.findUnique({
                where: {
                    competition_id: id
                },
                include:{
                    users_participated: {
                        select: {id: true, roll_number: true, name: true}
                    }
                }
            });
        }
        else{
            competition = await prisma.competitions.findUnique({
                where: {
                    competition_id: id
                }
            });
        }

        if(!competition){
            return NextResponse.json({error:"Compitition not Found!"},{status: 404});
        }

        return NextResponse.json({ status:200, competition: competition });
    }
    catch(e){
        return NextResponse.json({error:"Internal Server Error"},{status: 500});
    }
}