/*
  Warnings:

  - The values [Design] on the enum `club_dept_options` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "newsletter_cat" AS ENUM ('Indian_Mathematicians', 'Foreign_Mathematicians');

-- AlterEnum
BEGIN;
CREATE TYPE "club_dept_options_new" AS ENUM ('General', 'Tech', 'PR', 'Management', 'Content', 'Education_Outreach');
ALTER TABLE "User" ALTER COLUMN "club_dept" TYPE "club_dept_options_new"[] USING ("club_dept"::text::"club_dept_options_new"[]);
ALTER TYPE "club_dept_options" RENAME TO "club_dept_options_old";
ALTER TYPE "club_dept_options_new" RENAME TO "club_dept_options";
DROP TYPE "club_dept_options_old";
COMMIT;

-- AlterTable
ALTER TABLE "Competitions" ADD COLUMN     "first_prize_name" TEXT,
ADD COLUMN     "second_prize_name" TEXT,
ADD COLUMN     "third_prize_name" TEXT;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "first_prize_name" TEXT,
ADD COLUMN     "second_prize_name" TEXT,
ADD COLUMN     "third_prize_name" TEXT;

-- AlterTable
ALTER TABLE "NewsLetter" ADD COLUMN     "category" "newsletter_cat";
