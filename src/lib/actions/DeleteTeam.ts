"use server"
import prisma from "@/lib/PrismaClient/db";

export async function DeleteTeam(team_id_delete: string) {
    try{
      await prisma.team.delete({
        where: {
          team_id: team_id_delete, 
        },
      });
      return { success: true, message: "Deleted"};
    } 
    catch(err){
      return { success: false, message: "Failed to delete team" };
    } 
}