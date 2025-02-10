import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest) {
    try{
        const size = 5;
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const pageNumber = parseInt(searchParams.get("page") || "1", 10);
        const time = searchParams.get("time");
        
        let upcoming_comp, past_comp;

        if(!time || time=='upcoming'){
            console.log("here");
            upcoming_comp = await prisma.competitions.findMany({
                where: {
                    conductedOn: {
                        gte: new Date()
                    }
                },
                take: size,
                skip: (pageNumber - 1) * size,
                orderBy: {
                    registration_deadline: "desc"
                },
                select:{
                    competition_id: true,
                    competitionName: true,
                    conductedOn: true,
                    registration_deadline: true,
                    prize: true,
                    imageURL: true,
                    venue: true
                }
            });
        }
        if(!time || time=='past'){
            console.log("back");
            past_comp = await prisma.competitions.findMany({
                where: {
                    conductedOn: {
                        lt: new Date()
                    }
                },
                take: size,
                skip: (pageNumber - 1) * size,
                orderBy: {
                    registration_deadline: "desc"
                },
                select:{
                    competition_id: true,
                    competitionName: true,
                    conductedOn: true,
                    registration_deadline: true,
                    prize: true,
                    imageURL: true,
                    venue: true
                }
            });
        }


        if (!upcoming_comp && !past_comp) {
            return NextResponse.json({status: 404, message:"No competitions found"});
        }
        if(!upcoming_comp){
            return NextResponse.json({ staus:200, past_comp: past_comp });
        }
        if(!past_comp){
            return NextResponse.json({ status: 200, upcoming_comp: upcoming_comp });
        }

        return NextResponse.json({ status:200, upcoming_comp:upcoming_comp, past_comp: past_comp });

    }
    catch(err){
        return NextResponse.json({status: 500, message:"Internal Server Error"});
    }
}