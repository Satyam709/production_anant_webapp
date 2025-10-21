'use server';
import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export async function getAttendies(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return [];
    }

    // Check if competition exists
    const attendies = await prisma.meeting.findUnique({
      where: { meeting_id: id },
      select: {
        attendees: {
          select: {
            name: true,
            batch: true,
            roll_number: true,
            id: true,
            branch: true,
          },
        },
      },
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

// Function to delete a meeting by its ID
export async function deleteMeeting(id: string): Promise<boolean> {
  try {
    const session = await getSession();

    // Check if the user is an admin
    if (!session?.user || !(await isAdmin())) {
      return false; // Return false if not authorized
    }

    // Check if the meeting exists
    const meeting = await prisma.meeting.findUnique({
      where: { meeting_id: id },
    });

    if (!meeting) {
      return false; // Return false if meeting doesn't exist
    }

    // Delete the meeting
    await prisma.meeting.delete({
      where: { meeting_id: id },
    });

    // Return true if the meeting was successfully deleted
    return true;
  } catch (error) {
    console.error(error);
    return false; // Return false if an error occurred
  }
}
