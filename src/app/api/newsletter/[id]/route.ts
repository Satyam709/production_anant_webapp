import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import isAdmin from "@/lib/actions/Admin";
import { getSession } from "@/lib/actions/Sessions";

export async function GET(req: NextRequest, { params }: { params: { id: string }}){
    try{
        const {id} = await params;

        const newsletter = await prisma.newsLetter.findUnique({
            where:{
                id: id
            }
        });

        if(!newsletter){
            return NextResponse.json(
                { message: "Newsletter not found" },
                { status: 404 }
            );
        }

        const fileUrl = newsletter.fileUrl;
        const fileResponse = await fetch(fileUrl);

        if (!fileResponse.ok) {
            throw new Error("Failed to fetch file from source");
        }

        const blob = await fileResponse.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());

        return new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="${newsletter.title}.pdf"`,
            },
        });
        
    }
    catch(err){
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// export async function DELETE(req: NextRequest, { params }: { params: { id: string }}){
//     try{
//         const {id} = await params;
//         let authorized = await isAdmin();
//         const session = await getSession();

//         const blog = await prisma.blog.findUnique({
//             where:{
//                 id: id
//             }
//         });

//         if(!blog){
//             return NextResponse.json(
//                 { message: "Blog not found" },
//                 { status: 404 }
//             );
//         }

//         if(!authorized && blog.userID !== session?.user.id){
//             return NextResponse.json(
//                 { message: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

        
//         await prisma.blog.delete({
//             where:{
//                 id: id
//             }
//         });

//         return NextResponse.json(
//             { message: "Blog deleted" },{status:200}
//         )

//     }
//     catch(err){
//         return NextResponse.json(
//             { message: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }