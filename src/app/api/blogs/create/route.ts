import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";
import { blog_cat } from "@prisma/client";
import { getSession } from "@/lib/actions/Sessions";

const blogSchema = z.object({
    title: z.string().min(1, "Blog Title is required"),
    category: z.nativeEnum(blog_cat),
    content: z.string().min(1, "Blog Content Cannot Be Empty"),
    cover_picture: z.string().optional(),
    description: z.string().optional(),
});

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const schema = blogSchema.safeParse(body);
        const session = await getSession();

        if(!session?.user){
            return NextResponse.json({error: "User not logged in!"},{status: 400});
        }

        if(!schema.success){
            const errorMessages = schema.error.errors.map((err) => err.message);
            console.log(schema.error);
            
            return NextResponse.json({error: "Invalid Body Format", messages: errorMessages},{status: 400});
        }
        
        const {title, category, content, cover_picture, description} = schema.data;

        // Create blog with content field mapped to body
        const blog = await prisma.blog.create({
            data:{
                title,
                category,
                cover_picture,
                body: content, // Map content to body field
                isVerified: false,
                description,
                writtenBy:{
                    connect:{
                        id: session.user.id
                    }
                }
            }
        });

        console.log("Created blog:", blog);

        if(!blog){
            return NextResponse.json({status: 400, message: "Failed to create blog"});
        }

        return NextResponse.json({status: 200, message: "Blog successfully created"});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}
