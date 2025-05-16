import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";

// Validation Schema
const eventSchema = z.object({
  eventName: z.string(),
  conductedOn: z.string(),
  conductedBy: z.string(),
  registration_deadline: z.string(),
  venue: z.string(),
  description: z.string(),
  prize: z.string(),
  imageURL: z.string(),
  external_registration_link: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } =await params;
    const body = await req.json();

    // Validate input data
    const schema = eventSchema.safeParse(body);
    if (!schema.success) {
        console.log(schema.error);
        
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const {
      eventName,
      conductedOn,
      conductedBy,
      registration_deadline,
      venue,
      description,
      prize,
      imageURL,
      external_registration_link,
    } = schema.data;

    if (
      isNaN(Date.parse(conductedOn)) ||
      isNaN(Date.parse(registration_deadline))
    ) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Check if event exists
    const existingEvent = await prisma.events.findUnique({
      where: { event_id: id },
    });
    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Update event
    const updatedEvent = await prisma.events.update({
      where: { event_id: id },
      data: {
        eventName,
        conductedOn: new Date(conductedOn),
        conductedBy,
        registration_deadline: new Date(registration_deadline),
        venue,
        description,
        prize,
        imageURL,
        external_registration_link
      },
    });

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
