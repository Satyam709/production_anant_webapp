"use server";
import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";

export async function getAttendies(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return [];
    }

    // Check if competition exists
    const attendies = await prisma.meeting.findUnique({
      where: { meeting_id: id },
      select:{
        attendees:{
            select:{
                name:true,
                batch:true,
                roll_number:true,
                id:true,
                branch:true,
            }
        }
      }
    });

    if (!attendies) {
      return [];
    }

    return attendies?.attendees;
  } catch (error) {
    console.error(error);
    return [];
  }
}
