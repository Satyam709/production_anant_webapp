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

        const teams = await prisma.team.findMany({
            where: {team_leader_id: userId},
            select: {
                team_id: true, 
                team_members: {
                    select: {id: true}
                }
            }
        })


        const comp = await prisma.competitions.findUnique({
            where: {competition_id: id},
            select: {
                users_participated: {
                    select: {id: true}
                }
            }
        });

        if(!comp){
            return NextResponse.json({error:"Compitition not found!"},{status: 404});
        }

        const registered = await comp.users_participated;
        const users_registered = registered.map(obj=>obj.id);

        if (userId in registered){
            return NextResponse.json({registered: true},{status: 200});
        }
        
        return NextResponse.json({registered: false},{status: 200});
    }
    catch(e){
        return NextResponse.json({error: "Internal Server Error!"},{status: 500});
    }
}
