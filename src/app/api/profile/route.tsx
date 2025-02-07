import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";

export async function GET(
    req: NextRequest
){
    try{
        const session = await getSession();
        if(!session?.user){
            return NextResponse.json({status:400, message: "User not logged in!"});
        }

        const userId = session.user.id;

        const profile = await prisma.user.findUnique({
            where:{
               id: userId
            },
            select: {
                id: true,
                name: true,
                roll_number: true,
                branch: true,
                batch: true,
                position: true,
                club_dept: true,
                joined: true,
                notices: true,
                imageURL: true,
                meetings_attended: true,
                meetings_conducted: true,
                compititions_created: true
            }
        });
        if(!profile)
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        return NextResponse.json({ profile }, { status: 200 });
    }
    catch(error){
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}