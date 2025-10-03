"use server";

import prisma from "@/lib/PrismaClient/db";
import { AnantTeamMember } from "@prisma/client";

// Type for team member data (now directly from AnantTeamMember)
export type TeamMember = AnantTeamMember;

export async function getAnantTeamMembers(
  year?: string
): Promise<TeamMember[]> {
  // check if year is not provided, fetch the latest year entries
  // this should remain consistent with the frontend logic
  if (!year) {
    const latestMember = await prisma.anantTeamMember.findFirst({
      orderBy: {
        year: "desc",
      },
    });
    year =
      latestMember?.year ||
      `${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(-2)}`;
  }

  // validate year format is either YYYY or YYYY-YY
  if (!/^\d{4}(-\d{2})?$/.test(year)) {
    throw new Error("Invalid year format. Expected YYYY or YYYY-YY format");
  }

  try {
    const teamMembers = await prisma.anantTeamMember.findMany({
      where: {
        year: year,
      },
    });

    return teamMembers;
  } catch (error) {
    console.error("Error fetching Anant Team members:", error);
    throw new Error("Failed to fetch Anant Team members");
  }
}

export async function getAvailableTeamYears(): Promise<string[]> {
  try {
    const years = await prisma.anantTeamMember.findMany({
      select: {
        year: true,
      },
      distinct: ["year"],
      orderBy: {
        year: "desc",
      },
    });

    return years
      .map((y) => y.year)
      .filter((year): year is string => year !== null);
  } catch (error) {
    console.error("Error fetching available team years:", error);
    throw new Error("Failed to fetch available team years");
  }
}

export async function getAllTeamDataByYears(): Promise<
  Record<string, TeamMember[]>
> {
  try {
    const years = await getAvailableTeamYears();
    const teamData: Record<string, TeamMember[]> = {};

    for (const year of years) {
      teamData[year] = await getAnantTeamMembers(year);
    }

    return teamData;
  } catch (error) {
    console.error("Error fetching all team data:", error);
    throw new Error("Failed to fetch all team data");
  }
}
