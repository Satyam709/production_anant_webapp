/*
  Warnings:

  - You are about to drop the `_participant_team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_participant_team" DROP CONSTRAINT "_participant_team_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_participant_team" DROP CONSTRAINT "_participant_team_B_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "competition_id" TEXT,
ADD COLUMN     "is_registered" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."_participant_team";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "Competitions"("competition_id") ON DELETE SET NULL ON UPDATE CASCADE;
