import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";

export async function GET(req: NextRequest) {
  try {
    // const size = 5;
    // for now allow unlimited events
    const size = 1000;

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const pageNumber = parseInt(searchParams.get("page") || "1", 10);
    const time = searchParams.get("time");

    if (pageNumber < 1) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: 400 }
      );
    }

    let upcomingEvents, pastEvents;

    if (!time || time === "upcoming") {
      upcomingEvents = await prisma.events.findMany({
        where: {
          conductedOn: {
            gte: new Date(),
          },
        },
        take: size,
        skip: (pageNumber - 1) * size,
        orderBy: {
          registration_deadline: "asc",
        },
      });
    }

    if (!time || time === "past") {
      pastEvents = await prisma.events.findMany({
        where: {
          conductedOn: {
            lt: new Date(),
          },
        },
        take: size,
        skip: (pageNumber - 1) * size,
        orderBy: {
          registration_deadline: "asc",
        },
      });
    }

    if (!upcomingEvents && !pastEvents) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }

    if (!upcomingEvents) {
      return NextResponse.json({ events: pastEvents }, { status: 200 });
    }

    if (!pastEvents) {
      return NextResponse.json({ events: upcomingEvents }, { status: 200 });
    }

    return NextResponse.json(
      { upcomingEvents: upcomingEvents, pastEvents: pastEvents },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
