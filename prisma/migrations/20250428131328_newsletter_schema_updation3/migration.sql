/*
  Warnings:

  - The `category` column on the `NewsLetter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "NewsLetter" DROP COLUMN "category",
ADD COLUMN     "category" TEXT;
ALTER TABLE "Notice" ADD COLUMN     "link" TEXT;
-- DropEnum
DROP TYPE "newsletter_cat";
