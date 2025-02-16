import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";

const meetSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  starts: z.string().refine((date)=>!isNaN(Date.parse(date)),{message:"not a iso date format"}),
  duration: z.number().int().nullable().optional(),
  topic_of_discussion: z.string().nullable().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const input = await req.json();
  const { id } = await params; // Meeting ID from params
  console.log(input);

  const session = await getSession();
  if (!session?.user || !await isAdmin()) {
    return NextResponse.json(
      { error: "Failed to update meeting! Unauthenticated" },
      { status: 400 }
    );
  }

  const schema = meetSchema.safeParse(input);
  if (!schema.success) {
    return NextResponse.json(
      { error: "Invalid schema", "resolve:": { "issues": schema.error.issues } },
      { status: 400 }
    );
  }
  
  const meet = schema.data;
  
  try {
    // Check if meeting exists
    const existingMeet = await prisma.meeting.findUnique({
      where: { meeting_id: id },
    });

    if (!existingMeet) {
      return NextResponse.json(
        { error: "Meeting not found" },
        { status: 404 }
      );
    }

    // Update meeting details
    const updatedMeet = await prisma.meeting.update({
      where: { meeting_id: id },
      data: {
        ...meet,
        hostID: session.user.id, // Optionally ensure the host is still the same
      },
    });

    return NextResponse.json({ response: "Meeting updated!", meet: updatedMeet });
  } catch (err) {
    console.error("Error updating meeting: ", err);
    return NextResponse.json(
      { error: "Failed to update meeting! Check meeting details" },
      { status: 500 }
    );
  }
}
