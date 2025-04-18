/*
  Warnings:

  - Added the required column `fileUrl` to the `NewsLetter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewsLetter" ADD COLUMN     "fileUrl" TEXT NOT NULL;
