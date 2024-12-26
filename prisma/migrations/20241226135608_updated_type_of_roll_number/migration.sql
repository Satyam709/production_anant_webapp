/*
  Warnings:

  - You are about to alter the column `roll_number` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roll_number" SET DATA TYPE INTEGER,
ALTER COLUMN "joined" SET DEFAULT CURRENT_TIMESTAMP;
