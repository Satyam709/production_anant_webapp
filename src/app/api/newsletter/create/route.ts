import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";
import { getSession } from "@/lib/actions/Sessions";

const newsLetterSchema = z.object({
    title: z.string().min(1, "NewsLetter Title is required"),
    content: z.string().min(1, "NewsLetter Content Cannot Be Empty"),
    cover_picture: z.string().optional(),
    description: z.string().optional(),
});

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const schema = newsLetterSchema.safeParse(body);
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({error: "User not logged in!"},{status: 400});
        }

        if(!schema.success){
            const errorMessages = schema.error.errors.map((err) => err.message);
            return NextResponse.json({error: "Invalid Body Format", messages: errorMessages},{status: 400});
        }
        
        const {title, content, cover_picture, description} = schema.data;

        const newsLetter = await prisma.newsLetter.create({
            data:{
                title,
                cover_picture,
                body: content,
                description: description,  
                writtenBy:{
                    connect:{
                        id: session.user.id
                    }
                }
            }
        });

        if(!newsLetter){
            return NextResponse.json({status: 400, message: "Failed to create NewsLetter"});
        }

        return NextResponse.json({status: 200, message: "NewsLetter successfully created"});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}