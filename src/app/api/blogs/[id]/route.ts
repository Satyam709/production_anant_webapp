import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import isAdmin from "@/lib/actions/Admin";
import { getSession } from "@/lib/actions/Sessions";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}){
    try{
        const {id} = await params;
        const authorized = await isAdmin();
        const session = await getSession();


        const blog = await prisma.blog.findUnique({
            where:{
                id: id
            }
        });

        if(!blog){
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        // for unverified blogs visitors can only see the blog if they are the author of the blog or an admin
        if(blog.isVerified && !authorized && blog.userID !== session?.user.id){
            console.log("Authorized: "+authorized);
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { blog: blog },{status:200}
        )

    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }>}){
    try{

        const {id} = await params;
        const authorized = await isAdmin();
        const session = await getSession();

        const blog = await prisma.blog.findUnique({
            where:{
                id: id
            }
        });

        if(!blog){
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        if(!authorized && blog.userID !== session?.user.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        
        await prisma.blog.delete({
            where:{
                id: id
            }
        });

        return NextResponse.json(
            { message: "Blog deleted" },{status:200}
        )

    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}