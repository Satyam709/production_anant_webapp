/*
  Warnings:

  - Added the required column `first_prize_id` to the `Competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_prize_id` to the `Competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `third_prize_id` to the `Competitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "branch_options" ADD VALUE 'ECE';
ALTER TYPE "branch_options" ADD VALUE 'EE';
ALTER TYPE "branch_options" ADD VALUE 'ME';
ALTER TYPE "branch_options" ADD VALUE 'CE';
ALTER TYPE "branch_options" ADD VALUE 'IIOT';

-- AlterEnum
ALTER TYPE "club_dept_options" ADD VALUE 'Design';

-- AlterTable
ALTER TABLE "Competitions" ADD COLUMN     "first_prize_id" TEXT NOT NULL,
ADD COLUMN     "second_prize_id" TEXT NOT NULL,
ADD COLUMN     "third_prize_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_first_prize_id_fkey" FOREIGN KEY ("first_prize_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_second_prize_id_fkey" FOREIGN KEY ("second_prize_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_third_prize_id_fkey" FOREIGN KEY ("third_prize_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;
