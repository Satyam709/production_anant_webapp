'use server';

import isAdmin from '@/lib/actions/Admin';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

/**
 * Fetch all sponsors from the database.
 * Publicly accessible.
 */
export async function getSponsors() {
  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!sponsors) {
      return [];
    }

    return sponsors;
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return [];
  }
}

/**
 * Fetch a single sponsor by ID.
 * Publicly accessible.
 */
export async function getSponsorById(id: string) {
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: { id },
    });

    return sponsor;
  } catch (error) {
    console.error(`Error fetching sponsor with id ${id}:`, error);
    return null;
  }
}

/**
 * Delete a sponsor.
 * Protected: Only Admins can perform this.
 */
export async function deleteSponsor(id: string) {
  try {
    const session = await getSession();

    if (!session?.user || !(await isAdmin())) {
      return { error: 'Unauthorized', status: 403 };
    }

    const sponsor = await prisma.sponsor.findUnique({
      where: { id },
    });

    if (!sponsor) {
      return { error: 'Sponsor not found', status: 404 };
    }

    await prisma.sponsor.delete({
      where: { id },
    });

    return { message: 'Sponsor deleted successfully', status: 200 };
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    return { error: 'Internal Server Error', status: 500 };
  }
}