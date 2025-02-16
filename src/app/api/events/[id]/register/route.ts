import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";

export async function POST(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;          // event id
        const session =  await getSession();

        if(!session?.user){
            return NextResponse.json({error: "User not logged in!"},{status: 401});
        }

        const userId = session.user.id;
        const registerUser = await prisma.events.update({
            where: {event_id: id},
            data: {
                users_participated: {
                    connect: {id: userId}
                }
            }
        });

        if(!registerUser){
            return NextResponse.json({error: "User not registered!"},{status: 500});
        }

        return NextResponse.json({message: "User registered successfully!"},{status: 200});

    }
    catch(e){
        return NextResponse.json({error: "Internal Server Error"},{status: 500});
    }

}