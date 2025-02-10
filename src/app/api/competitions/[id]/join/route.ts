import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function POST(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;          // compititon id
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
            include: {
                team_members: {
                    select: {id: true}
                }
            }
        });

        if(!team){
            return NextResponse.json({status:400, message: "Invalid Team_ID / No team found"});
        }
        if(team.team_leader_id != userId){
            return NextResponse.json({status:400, message: "You are not the team leader. "});
        }

        const comp = await prisma.competitions.findUnique({
            where: {competition_id: id},
            include:{
                users_participated: {
                    select: {id: true}
                },
                teams_participated: {
                    select: {team_id: true}
                }
            }
        });

        if(!comp){
            return NextResponse.json({status: 400, message:"Compitition not found!"});
        }
        const dt_now = new Date();
        if (dt_now>comp.registration_deadline){
            return NextResponse.json({status: 400, message: "Registrations are closed now!"});
        }

        const team_size = team.team_members.length+1;    // leader + members
        if(team_size<comp.min_team_size){
            return NextResponse.json({status: 400, message: `Minimum of ${comp.min_team_size} required!`});
        }
        if(team_size>comp.max_team_size){
            return NextResponse.json({status: 400, message: `Maximum of ${comp.max_team_size} required!`});
        }

        const is_team_registered = comp.teams_participated.some((team) => team.team_id == team_id);
        if(is_team_registered){
            return NextResponse.json({status: 400, message: "Team already registered!"});
        }

        let users_registered = [];
        if(comp.users_participated)
        {
            for (let el of comp.users_participated){
                if (team?.team_members.some(member => member.id === el.id) || false){
                    users_registered.push(el.id);
                }
                if (el.id === team.team_leader_id){
                    users_registered.push(el.id);
                }
            }
        }

        if(users_registered.length>0){
            return NextResponse.json({status: 400, message: "Some members already registered!", users_registered: users_registered});
        }

        let members = team.team_members.map(member => member.id);
        members.push(team.team_leader_id); 

        const register_team = await prisma.competitions.update({
            where: {competition_id: id},
            data:{
                teams_participated:{
                    connect: {team_id: team_id}
                },
                users_participated: {
                    connect: members.map(userId => ({ id: userId }))
                }        
            }
        });
        
        if(!register_team){
            return NextResponse.json({status: 500, message: "Failed to register"});
        }

        return NextResponse.json({status: 200, message: `Team ${team.team_name} successfully registered to ${comp.competitionName}`});
    }
    catch(e){
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}