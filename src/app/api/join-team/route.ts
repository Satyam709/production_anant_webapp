import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import {getSession} from "@/lib/actions/Sessions";

// get all invitations
export async function GET(req: NextRequest){
    try{
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({status: 401, message: "Login first"});
        }   
        const userId = session.user.id;

        // fetch all invitations
        const invitations = await prisma.pending_requests.findMany({
            where: {
                user_id: userId
            },
            include:{
                team: true
            }
        });

        return NextResponse.json({status: 200, data: invitations});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}

// join an invitation
export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const {request_id} = body;
        const session = await getSession();

        if(!request_id){
            return NextResponse.json({status: 400, message: "Invitation id is required"});
        }

        if(!session?.user){
            return NextResponse.json({status: 401, message: "Login first"});
        }
        const userId = session.user.id;
        
        // fetch the invitation
        const invitation = await prisma.pending_requests.findUnique({
            where: {
                request_id: request_id
            }
        });

        if(!invitation){
            return NextResponse.json({status: 404, message: "Invitation not found!"});
        }

        if (invitation?.user_id !== userId) {
            return NextResponse.json({status: 403, message: "You are not the invitee!"});
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
            return NextResponse.json({status: 404, message: "Team no longer exist!"});
        }

        let team_members: String[] = [];
        team.team_members.forEach((member) => {
            team_members.push(member.id);
        });

        if(team_members.includes(userId)){
            return NextResponse.json({status: 400, message: "You are already in the team!"});
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
            return NextResponse.json({status: 500, message: "Failed to join team"});
        }

        // delete the request   
        const deletedRequest = await prisma.pending_requests.delete({
            where: {
                request_id: request_id
            }
        });

        return NextResponse.json({status: 200, message: "Joined team successfully!"});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal server error"});
    }
}

// Delete route here