"use server";

import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";

export async function deleteEvent(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return { error: "Unauthorized", status: 403 };
    }

    // Check if competition exists
    const events = await prisma.events.findUnique({
      where: { event_id: id },
    });

    if (!events) {
      return { error: "Competition not found", status: 404 };
    }

    // Delete the competition
    await prisma.events.delete({
      where: { event_id: id },
    });

    return { message: "Competition deleted successfully", status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function getAllParticipants(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return [];
    }

    // Check if competition exists
    const events = await prisma.events.findUnique({
      where: { event_id: id },
    });

    if (!events) {
      return [];
    }

    // Get all participants
    const participants = await prisma.events.findUnique({
      where: { event_id: id },
      select: {
        users_participated: {
          select: {
            id: true,
            name: true,
            roll_number: true,
            branch: true,
            batch: true,
            position: true,
          },
        },
      },
    });
    if (!participants) {
      return [];
    }
    return participants.users_participated;
  } catch (error) {
    console.error(error);
    return [];
  }
}
