"use server";
import { getSession, isAuthenticated } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";
import { rollNumberSchema } from "@/types/common";
import { branch_options, club_dept_options, position_options } from "@prisma/client";

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

export type getUserInfoType = {
    id: string | undefined;
    roll_number: number | undefined;
    name: string | undefined;
    imageURL: string | null | undefined;
    position: position_options | null | undefined;
    branch: branch_options| undefined;
    club_dept: club_dept_options[] | undefined;
    joined: Date | undefined;
    batch: string | undefined;
} | null

export async function getUserInfo() : Promise<getUserInfoType>{
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
      branch: user?.branch || undefined,
      club_dept: user?.club_dept,
      joined: user?.joined,
      batch: user?.batch || undefined,
    }
  } catch (error) {
    console.log("error while getting user info", error);
    return null;
  }
}

export async function getUserInfoById(roll_number:string) : Promise<getUserInfoType>{
  try {

    const data = rollNumberSchema.safeParse(roll_number)

    if(!data.success){
      console.log(data.error.message);
      return null;
    }

    const rollNo = data.data
    const user = await prisma.user.findUnique({
      where: {
        roll_number:Number(rollNo)
      },
    });
    // remove pass 
    return {
      id: user?.id,
      roll_number: user?.roll_number,
      name: user?.name,
      imageURL: user?.imageURL,
      position: user?.position,
      branch: user?.branch || undefined,
      club_dept: user?.club_dept,
      joined: user?.joined,
      batch: user?.batch || undefined,
    }
  } catch (error) {
    console.log("error while getting user info", error);
    return null;
  }
}