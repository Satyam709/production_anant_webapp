import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try{
        const {id} = await params;
        const session = await getSession();

        const competition = await prisma.competitions.findUnique({
            where: {
                competition_id: id
            },
            include:{
                users_participated: true
            }
        });

        if(!competition){
            return NextResponse.json({status: 404, message:"Not Found"});
        }

        const user = session?.user;
        if (user){        // if logged in

            const participants = competition.users_participated;
            if (user.id in participants){
                return NextResponse.json({status: 200, competition: competition, is_registered: true});
            }

            const teams_leaded = await prisma.team.findMany({
                where: {
                    team_leader_id: user.id
                },
                select:{
                    team_name: true,
                    team_id: true,
                    team_members:{
                        select: {id: true}
                    }
                }
            });

            const min_team_size = competition?.min_team_size || 1;
            const max_team_size = competition?.max_team_size || 10;

            const valid_teams = teams_leaded.filter((team) => team.team_members.length >= min_team_size && team.team_members.length < max_team_size);

            return NextResponse.json({ status:200, competition: competition, valid_teams: valid_teams, is_registered: false });
        }

        return NextResponse.json({ status:200, competition: competition });
    }
    catch(e){
        return NextResponse.json({status: 500, message:"Internal Server Error"});
    }
}