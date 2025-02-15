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
            return NextResponse.json({error: errorMessages.join(", ")},{status: 400});
        }

        const { team_name } = body;
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({error: "User not logged in!"},{status: 401});
        }

        const userId = session.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({error: "User not found!"},{status: 400});
        }

        const findName = await prisma.team.findUnique({
            where: { team_name: team_name },
        });

        if(findName){
            return NextResponse.json({error: "Team name already exists!"},{status: 409});
        }

        const team = await prisma.team.create({
            data: {
                team_name: team_name,
                team_leader_id: userId,
            },
        });

        if(!team){
            return NextResponse.json({error: "Failed to create team!"},{status: 500});
        }

        return NextResponse.json({status: 201, message: `Team ${team_name} created successfully!`, data: team});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({error: "Internal Server Error"},{status:500});
    }
}