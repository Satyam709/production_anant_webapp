"use server";
import { getSession, isAuthenticated } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";
import { branch_options, club_dept_options } from "@prisma/client";

export async function UpdateProfile(
  name: string | undefined,
  branch: branch_options | undefined,
  batch: string | undefined,
  club_dept: club_dept_options[] | undefined
) {
  // currently updated that are allowed are name, branch, batch, club_dept,
  try {
    if (!(await isAuthenticated())) return false;

    // update db
    const user = await prisma.user.update({
      where: {
        id: (await getSession())?.user.id,
      },
      data: {
        name: name,
        branch: branch,
        batch: batch,
        club_dept: club_dept,
      },
    });
    console.log("user updated", user);
    if (user) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}


export async function getUserInfo(){
  try {
    if (!(await isAuthenticated())) return null;
    const userId = (await getSession())?.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // remove pass 
    return {
      id: user?.id,
      roll_number: user?.roll_number,
      name: user?.name,
      imageURL: user?.imageURL,
      position: user?.position,
      branch: user?.branch,
      club_dept: user?.club_dept,
      joined: user?.joined,
      batch: user?.batch,
    }
  } catch (error) {
    console.log("error while getting user info", error);
    return null;
  }
}