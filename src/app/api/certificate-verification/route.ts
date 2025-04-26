import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(request: NextRequest) {
    try{
        const all_certificates = await prisma.certificate.findMany({
            orderBy:{
                issuedDate: "desc"
            }
        });
        if(!all_certificates){
            return NextResponse.json({error: "No certificates found"}, {status: 404});
        }
        return NextResponse.json(all_certificates, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}