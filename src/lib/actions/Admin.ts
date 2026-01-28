'use server';
import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';

export default async function isAdmin() {
  const session = await getSession();

  // Check if user is authenticated
  if (!session?.user) {
    return false;
  }

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    // Verify user position
    if (!user?.position || user.position === 'Member') {
      return false;
    }
  } catch (err) {
    console.log('cannot get the position of user ', err);
    return false;
  }

  return true;
}

export async function isSuperAdmin() {
  const session = await getSession();

  // Check if user is authenticated
  if (!session?.user) {
    return false;
  }

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    // Verify user position
    if (!user?.position) {
      return false;
    }

    if (
      user.position === 'President' ||
      user.position === 'VicePresident' ||
      user.position === 'Secretary' ||
      user.position === 'Website_Developer' ||
      user.position === 'Coordinator' ||
      user.position === 'Executive_Head'
    ) {
      return true;
    }

    return false;
  } catch (err) {
    console.log('cannot get the position of user ', err);
    return false;
  }

  return true;
}
