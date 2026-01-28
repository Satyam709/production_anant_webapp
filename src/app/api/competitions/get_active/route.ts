import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/PrismaClient/db';

export async function GET(req: NextRequest) {
    try {
        const activeCompetitions = await prisma.competitions.findMany({
            where: {
                conductedOn: {
                    gte: new Date(),
                },
            },
            select:{
                competition_id: true,
                competitionName: true,
            }
        });

        return NextResponse.json({
            status: 200,
            activeCompetitions
        });
    } catch (err) {
    return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
    );
    }
}
