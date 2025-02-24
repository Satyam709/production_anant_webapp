"use server";
import { getSession, isAuthenticated } from "@/lib/actions/Sessions";
import prisma from "@/lib/PrismaClient/db";
import { rollNumberSchema } from "@/types/common";
import { branch_options, club_dept_options, position_options } from "@prisma/client";
import { uploadServerSideFile } from "@/lib/actions/uploadthing";
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
    first_prize_comp: {
      conductedOn: Date;
      competitionName: string 
}[] | undefined;
    second_prize_comp: {
      conductedOn: Date; 
      competitionName: string 
}[] | undefined;
    third_prize_comp: {
      conductedOn: Date;
      competitionName: string 
}[] | undefined;
    first_prize: {
      conductedOn: Date; 
      eventName: string 
}[] | undefined;
    second_prize: {
      conductedOn: Date; 
      eventName: string 
}[] | undefined;
    third_prize: {
      conductedOn: Date; 
      eventName: string 
}[] | undefined;
    compititions_participated: { competitionName: string, conductedOn: Date }[] | undefined;
    events_participated: { eventName: string, conductedOn: Date }[] | undefined;
    meetings_attended: { meeting_id: string, starts: Date }[] | undefined;
} | null

export async function getUserInfo() : Promise<getUserInfoType>{
  try {
    if (!(await isAuthenticated())) return null;
    const userId = (await getSession())?.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include:{
        first_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        second_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        third_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        first_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        second_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        third_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        compititions_participated:{
          select:{
            competitionName: true,
            conductedOn: true
          }
        },
        events_participated:{
          select:{
            eventName: true,
            conductedOn: true
          }
        },
        meetings_attended:{
          select:{
            meeting_id: true,
            starts: true
          }
        }
      }
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
      first_prize_comp: user?.first_prize_comp,
      second_prize_comp: user?.second_prize_comp,
      third_prize_comp: user?.third_prize_comp,
      first_prize: user?.first_prize,
      second_prize: user?.second_prize,
      third_prize: user?.third_prize,
      compititions_participated: user?.compititions_participated,
      events_participated: user?.events_participated,
      meetings_attended: user?.meetings_attended
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
      include:{
        first_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        second_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        third_prize_comp:{
          select: {
            competitionName: true,
            conductedOn: true
          }
        },
        first_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        second_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        third_prize:{
          select: {
            eventName: true,
            conductedOn: true
          }
        },
        compititions_participated:{
          select:{
            competitionName: true,
            conductedOn: true
          }
        },
        events_participated:{
          select:{
            eventName: true,
            conductedOn: true
          }
        },
        meetings_attended:{
          select:{
            meeting_id: true,
            starts: true
          }
        }
      }
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
      first_prize_comp: user?.first_prize_comp,
      second_prize_comp: user?.second_prize_comp,
      third_prize_comp: user?.third_prize_comp,
      first_prize: user?.first_prize,
      second_prize: user?.second_prize,
      third_prize: user?.third_prize,
      compititions_participated: user?.compititions_participated,
      events_participated: user?.events_participated,
      meetings_attended: user?.meetings_attended
    }
  } catch (error) {
    console.log("error while getting user info", error);
    return null;
  }
}

export async function UpdateProfileImage(file: File) {
  try {
    if (!(await isAuthenticated())) return null;

    const userId = (await getSession())?.user.id;

    // Check if the user already has an image URL
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.imageURL) {
      console.log("User already has an image URL.  Update not allowed.");
      return null; // Or throw an error, depending on your desired behavior
    }

    // Upload the image
    const uploadResult = await uploadServerSideFile(file);

    if (!uploadResult) {
      console.error("Failed to upload image.");
      return null;
    }

    const imageURL = uploadResult.ufsUrl;

    // Update the user's profile with the new image URL
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        imageURL: imageURL,
      },
    });

    if (updatedUser) {
      console.log("Profile image updated successfully.");
      return updatedUser.imageURL;
    } else {
      console.log("Failed to update profile image.");
      return null;
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
    return null;
  }
}