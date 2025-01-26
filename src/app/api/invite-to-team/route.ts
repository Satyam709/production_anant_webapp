import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import {getSession} from "@/lib/actions/Sessions";
import z from "zod";

const inviteSchema = z.object({
    team_id: z.string(),
    invitee_roll_number: z
        .string()
        .min(1, "Roll number is required")
        .regex(/^\d+$/, "Roll number must be a number"),
});

export async function GET(req: NextRequest){
    try{
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({status: 400, message: "User not logged in!"});
        }
        const userId = session.user.id;

        const teams = await prisma.team.findMany({
            where: { team_leader_id: userId },
        });

        if (teams.length > 0) {
            const teamIds = teams.map(team => team.team_id);
            const invitations = await prisma.pending_requests.findMany({
                where: { 
                    team_id: {
                        in: teamIds, 
                    },
                },
                include: {
                    team: true,
                },
            });

            const response = invitations.map((invite) => {
                return {
                    invitation_id: invite.request_id,
                    team_id: invite.team_id,
                    team_name: invite.team.team_name,
                    invitee_id: invite.user_id,
                    timestamp: invite.request_time,
                };
            });

            return NextResponse.json({status: 200, data: response});
        }

        return NextResponse.json({status: 200, data: []});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const result = inviteSchema.safeParse(body);

        if(!result.success){
            const errorMessages = result.error.errors.map((err) => err.message);
            return NextResponse.json({status: 400, message: errorMessages.join(", ")});
        }

        const { team_id, invitee_roll_number} = body;
    
        const session = await getSession();
        

        if(!session?.user){
            return NextResponse.json({status: 400, message: "User not logged in!"});
        }

        const userId = session.user.id;
        
        if (userId == invitee_roll_number) {
            return NextResponse.json({status: 400, message: "You cannot invite yourself!"});
        }
        
        const team = await prisma.team.findUnique({
            where: { team_id: team_id },
        });
        if (team?.team_leader_id !== userId) {
            return NextResponse.json({status: 403, message: "You are not the team leader!"});
        }
        console.log("1");
        const invitee = await prisma.user.findUnique({
            where: { roll_number: Number(invitee_roll_number) },
        });

        if(!invitee){
            return NextResponse.json({status: 404, message: "Invitee not found!"});
        }

        const invitation = await prisma.pending_requests.create({
            data: {
                team_id: team_id,
                user_id: invitee.id,
            },
        });

        if(!invitation){
            return NextResponse.json({status: 500, message: "Failed to send invitation!"});
        }

        return NextResponse.json({status: 200, message: `Invitation sent to ${invitee.name}!`});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}

// delete request here
// add [id] to the path to get also