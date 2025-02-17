import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try{
        const {id} = await params;          // compititon id
        const session = await getSession();
            
        if(!session?.user){
            return NextResponse.json({error:"User not logged in!"},{status: 401});
        }

        const userId = session.user.id; 

        const my_teams = await prisma.team.findMany({
            where: {
              OR: [
                { team_leader_id: userId }, // Teams where you are the leader
                { team_members: { some: { id: userId } } }, // Teams where you are a member
              ],
            },
            select:{
                team_id: true,
                team_name: true
            }
        });


        const comp = await prisma.competitions.findUnique({
            where: {competition_id: id},
            select: {
                users_participated: {
                    select: {id: true}
                },
                teams_participated:{
                    select: {
                        team_id: true,
                        team_name: true
                    }
                }
            }
        });

        if(!comp){
            return NextResponse.json({error:"Compitition not found!"},{status: 404});
        }

        const registered = await comp.users_participated;
        const teams_registered = await comp.teams_participated;
        const users_registered = registered.map(obj=>obj.id);
        
        if (users_registered.find((id) => id === userId)){
            const matches = teams_registered.filter(team =>
                my_teams.some(myTeam => myTeam.team_id === team.team_id)
            );
            return NextResponse.json({registered: true, team_registered: matches[0]},{status: 200});
        }
        
        return NextResponse.json({registered: false},{status: 200});
    }
    catch(e){
        return NextResponse.json({error: "Internal Server Error!"},{status: 500});
    }
}
