"use server"
import prisma from "@/lib/PrismaClient/db";

export async function DeleteNotice(id: string) {
    try{
      await prisma.notice.delete({
        where:{
          notice_id: id
        }
      })
      return { success: true, message: "Deleted"};
    } 
    catch(err){
      console.log(err);
      return { success: false, message: "Failed to delete team" };
    } 
}