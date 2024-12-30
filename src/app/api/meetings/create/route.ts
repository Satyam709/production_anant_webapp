import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/PrismaClient/db";
import z from "zod";

const meetSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  starts: z.string().refine((date)=>!isNaN(Date.parse(date)),{message:"not a iso date fomat"}),
  duration: z.number().int().nullable().optional(),
  topic_of_discussion: z.string().nullable().optional(),
  hostID: z.string().min(1, "Host ID is required"),
});

export async function POST(req: NextRequest) {
  const input = await req.json();
  console.log(input);

  const schema = meetSchema.safeParse(input);
  if (!schema.success) {
    return NextResponse.json(
      { error: "invalid schema", "resolve:": {"issues":schema.error.issues }},
      { status: 400 }
    );
  }
  const meet = schema.data;
  try {
    const result =await prisma.meeting.create({
      data: meet,
    });
    return NextResponse.json({ response: "meeting created!", meet: result });
  } catch (err) {
    console.error("error in creating ");
    return NextResponse.json(
      { error: "Failed to create meeting! check meet details" },
      { status: 500 }
    );
  }
}
