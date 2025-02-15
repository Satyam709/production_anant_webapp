"use server";

import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import isAdmin from "@/lib/actions/Admin";

export async function deleteCompetition(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return { error: "Unauthorized", status: 403 };
    }

    // Check if competition exists
    const competition = await prisma.competitions.findUnique({
      where: { competition_id: id },
    });

    if (!competition) {
      return { error: "Competition not found", status: 404 };
    }

    // Delete the competition
    await prisma.competitions.delete({
      where: { competition_id: id },
    });

    return { message: "Competition deleted successfully", status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error", status: 500 };
  }
}
