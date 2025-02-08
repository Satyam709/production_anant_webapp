import prisma from "@/lib/PrismaClient/db";
import { NextRequest, NextResponse } from "next/server";
import {notice_cat} from "@prisma/client";


export async function GET(req: NextRequest) {
    try{
        const size = 3;
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const pageNumber = parseInt(searchParams.get("page") || "1", 10);
        let noticeCat = searchParams.get("category");
        
        if (noticeCat && !Object.values(notice_cat).includes(noticeCat as notice_cat)){
            noticeCat = null;
        }
        let allNotices;

        if (!noticeCat){

            allNotices = await prisma.notice.findMany({
                take: size,
                skip: (pageNumber - 1) * size,
                orderBy: {
                    postedOn: "desc"
                }
            });
        }
        else{
            const cat = notice_cat[noticeCat as notice_cat];
            allNotices = await prisma.notice.findMany({
                take: size,
                skip: (pageNumber - 1) * size,
                where: {
                    category: cat
                },
                orderBy: {
                    postedOn: "desc"
                }
            });
        }

        return NextResponse.json({ notices: allNotices });
    }
    catch(error){
        console.error("Error fetching notices: ", error);
        return NextResponse.json(
            { error: "Failed to fetch notices" },
            { status: 500 }
        );
    }
}