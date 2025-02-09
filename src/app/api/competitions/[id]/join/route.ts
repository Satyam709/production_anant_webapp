import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function POST(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;

        const body = await req.json();
        const {team_id} = body;
        const session = await getSession();

        if(!team_id){
            return NextResponse.json({status: 400, message: "Team_ID missing"});
        }
        if(!session?.user){
            return NextResponse.json({status: 400, message:"User not logged in!"});
        }

        const userId = session.user.id; 

        const team = await prisma.team.findUnique({
            where: {team_id: team_id},
            include: {team_members: true}
        });

        if(!team){
            return NextResponse.json({status:400, message: "Invalid Team_ID / No team found"});
        }
        if(team.team_leader_id != userId){
            return NextResponse.json({status:400, message: "You are not the team leader. "});
        }

        const comp = await prisma.competitions.findUnique({
            where: {competition_id: id}
        });

        if(!comp){
            return NextResponse.json({status: 400, message:"Compitition not found!"});
        }
        const dt_now = new Date();
        if (dt_now>comp.registration_deadline){
            return NextResponse.json({status: 400, message: "Registrations are closed now!"});
        }

        const team_size = team.team_members.length;
        if(team_size<comp.min_team_size){
            return NextResponse.json({status: 400, message: `Minimum of ${comp.min_team_size} required!`});
        }
        if(team_size>comp.max_team_size){
            return NextResponse.json({status: 400, message: `Maximum of ${comp.max_team_size} required!`});
        }

        const regsiter_team = await prisma.competitions.update({
            where: {competition_id: id},
            data: {
                participants: {
                    connect: {team_id: team_id}
                }
            }
        });

        if(!regsiter_team){
            return NextResponse.json({status: 500, message: "Failed to register"});
        }

        return NextResponse.json({status: 200, message: `Team ${team.team_name} successfully registered to ${comp.competitionName}`});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}