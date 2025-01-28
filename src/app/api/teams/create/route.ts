import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";

const teamSchema = z.object({
    team_name: z.string(),
});

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const result = teamSchema.safeParse(body);

        if(!result.success){
            const errorMessages = result.error.errors.map((err) => err.message);
            return NextResponse.json({status: 400, message: errorMessages.join(", ")});
        }

        const { team_name } = body;
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({status: 400, message: "User not logged in!"});
        }

        const userId = session.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({status: 400, message: "User not found!"});
        }

        const findName = await prisma.team.findUnique({
            where: { team_name: team_name },
        });

        if(findName){
            return NextResponse.json({status: 400, message: "Team name already exists!"});
        }

        const team = await prisma.team.create({
            data: {
                team_name: team_name,
                team_leader_id: userId,
            },
        });

        if(!team){
            return NextResponse.json({status: 500, message: "Failed to create team!"});
        }

        return NextResponse.json({status: 200, message: `Team ${team_name} created successfully!`});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }
}