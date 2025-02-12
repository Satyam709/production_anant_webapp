import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";
import { error } from "console";

export async function POST(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;          // compititon id
        const body = await req.json();
        const {team_id} = body;
        const session = await getSession();
            
        if(!team_id){
            return NextResponse.json({error: "Team_ID missing"},{status: 400});
        }
        if(!session?.user){
            return NextResponse.json({error:"User not logged in!"},{status: 401});
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
            return NextResponse.json({error: "Invalid Team_ID / No team found"},{status: 404});
        }
        if(team.team_leader_id != userId){
            return NextResponse.json({error: "You are not the team leader. "},{status: 400});
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
            return NextResponse.json({error:"Compitition not found!"},{status: 404});
        }
        const dt_now = new Date();
        if (dt_now>comp.registration_deadline){
            return NextResponse.json({error: "Registrations are closed now!"},{status: 400});
        }

        const team_size = team.team_members.length+1;    // leader + members
        if(team_size<comp.min_team_size){
            return NextResponse.json({error: `Minimum of ${comp.min_team_size} required!`},{status: 400});
        }
        if(team_size>comp.max_team_size){
            return NextResponse.json({error: `Maximum of ${comp.max_team_size} required!`}, {status: 400});
        }

        const is_team_registered = comp.teams_participated.some((team) => team.team_id == team_id);
        if(is_team_registered){
            return NextResponse.json({error: "Team already registered!"},{status: 400});
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
            return NextResponse.json({error: "Some members already registered!", users_registered: users_registered},{status: 400});
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
            return NextResponse.json({error: "Failed to register"},{status: 500});
        }

        return NextResponse.json({status: 200, message: `Team ${team.team_name} successfully registered to ${comp.competitionName}`});
    }
    catch(e){
        return NextResponse.json({error: "Internal Server Error"},{status: 500});
    }
}