import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;          // compititon id
        const session = await getSession();
            
        if(!session?.user){
            return NextResponse.json({error:"User not logged in!"},{status: 401});
        }

        const userId = session.user.id; 

        const teams = await prisma.team.findMany({
            where: {team_leader_id: userId},
            select: {
                team_id: true, 
                team_name: true,
                team_members: {
                    select: {id: true}
                }
            }
        })


        const comp = await prisma.competitions.findUnique({
            where: {competition_id: id},
            select: {
                registration_deadline: true,
                min_team_size: true,
                max_team_size: true,
                users_participated:{
                    select: {id: true}
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

        const comp_user_set = new Set(comp.users_participated.map((user) => user.id));
        console.log(teams[0].team_members[0]);
        const valid_teams = teams.filter((team) => team.team_members.length+1>=comp.min_team_size && team.team_members.length+1<=comp.max_team_size && check_registration(comp_user_set,team.team_members));

        return NextResponse.json({valid_teams},{status: 200});
    }
    catch(e){
        console.log(e);
    }
}

function check_registration(compUserSet: any, team_members: any){
    return !team_members.some(obj => compUserSet.has(obj.id));
}