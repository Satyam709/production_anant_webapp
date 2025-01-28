/*
  Warnings:

  - Added the required column `registration_deadline` to the `Competitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competitions" ADD COLUMN     "registration_deadline" TIMESTAMP(3) NOT NULL;
