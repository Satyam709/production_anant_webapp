"use server";

import prisma from "@/lib/PrismaClient/db";

export async function getAnantTeamMembers(year?: string) {
  // check if year is not provided, fetch the latest year entries
  // this should remain consistent with the frontend logic
  if (!year) {
    const latestMember = await prisma.anantTeamMember.findFirst({
      orderBy: {
        year: "desc",
      },
    });
    year = latestMember?.year || new Date().getFullYear().toString();
  }

  // validate year is a number string
  if (!/^\d{4}$/.test(year)) {
    throw new Error("Invalid year format");
  }

  try {
    const teamMembers = await prisma.anantTeamMember.findMany({
      where: {
        year: year,
      },
      include: {
        user: true,
      },
    });
    return teamMembers;
  } catch (error) {
    console.error("Error fetching Anant Team members:", error);
    throw new Error("Failed to fetch Anant Team members");
  }
}
