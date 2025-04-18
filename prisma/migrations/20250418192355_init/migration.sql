/*
  Warnings:

  - You are about to drop the column `body` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `cover_picture` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `NewsLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsLetter" DROP COLUMN "body",
DROP COLUMN "cover_picture",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "updatedAt",
ADD COLUMN     "publisedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
