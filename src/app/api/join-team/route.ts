import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import {getSession} from "@/lib/actions/Sessions";

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const {request_id, joinTeam} = body;
        const session = await getSession();

        if(!request_id){
            return NextResponse.json({error: "Invitation id is required"},{status:400});
        }

        if(!session?.user){
            return NextResponse.json({error: "Login first"},{status: 401});
        }
        const userId = session.user.id;
        
        if(joinTeam){

            // fetch the invitation
            const invitation = await prisma.pending_requests.findUnique({
                where: {
                    request_id: request_id
                }
            });

            if(!invitation){
                return NextResponse.json({error: "Invitation not found!"},{status: 404});
            }

            if (invitation?.user_id !== userId) {
                console.log(userId);
                console.log(invitation?.user_id);
                return NextResponse.json({error: "You are not the invitee!"},{status: 403});
            }
            
            // add code to check request expiry

            // fetch the team
            const team = await prisma.team.findUnique({
                where: {
                    team_id: invitation.team_id
                },
                include:{
                    team_members: true
                }
            });

            if(!team){
                return NextResponse.json({error: "Team no longer exist!"},{status: 404});
            }

            let team_members: String[] = [];
            team.team_members.forEach((member) => {
                team_members.push(member.id);
            });

            if(team_members.includes(userId)){
                return NextResponse.json({error: "You are already in the team!"},{status: 400});
            }

            // update the team
            const updatedTeam = await prisma.team.update({
                where: {
                    team_id: invitation.team_id
                },
                data: {
                    team_members: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            
            if(!updatedTeam){
                return NextResponse.json({error: "Failed to join team"},{status: 500});
            }

        }

        // delete the request   
        const deletedRequest = await prisma.pending_requests.delete({
            where: {
                request_id: request_id
            }
        });

        if(!deletedRequest){
            return NextResponse.json({error: "Failed to delete pending request"},{status:500});
        }

        return NextResponse.json({status: 200, message: "Action taken successfully!"});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({error: "Internal server error"},{status: 500});
    }
}
