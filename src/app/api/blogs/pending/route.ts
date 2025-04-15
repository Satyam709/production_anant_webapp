import { NextRequest, NextResponse } from "next/server";
import isAdmin from "@/lib/actions/Admin";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";

const blogid = z.object({
    blogId: z.string().min(1, "Blog ID is required")
});

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const schema = blogid.safeParse(body);
        
        const admin = await isAdmin();

        if(!admin){
            return NextResponse.json({error: "You are not an admin"},{status: 400});
        }

        if(!schema.success){
            return NextResponse.json({error: "Invalid Body Format"},{status: 400});
        }

        const {blogId} = schema.data;

        const blog = await prisma.blog.update({
            where:{
                id: blogId
            },
            data:{
                isVerified: true
            }
        });

        if(!blog){
            return NextResponse.json({status: 400, message: "Failed to authorize blog"});
        }

        return NextResponse.json({status: 200, message: "Blog successfully authorized"});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}