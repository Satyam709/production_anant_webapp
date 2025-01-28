/*
  Warnings:

  - Added the required column `creator_id` to the `Competitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competitions" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
