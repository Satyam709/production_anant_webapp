/*
  Warnings:

  - You are about to drop the column `dates` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the `_workshops-attended` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_workshops-conducted` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `details` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_workshops-attended" DROP CONSTRAINT "_workshops-attended_A_fkey";

-- DropForeignKey
ALTER TABLE "_workshops-attended" DROP CONSTRAINT "_workshops-attended_B_fkey";

-- DropForeignKey
ALTER TABLE "_workshops-conducted" DROP CONSTRAINT "_workshops-conducted_A_fkey";

-- DropForeignKey
ALTER TABLE "_workshops-conducted" DROP CONSTRAINT "_workshops-conducted_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "branch" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "dates",
DROP COLUMN "guests",
ADD COLUMN     "conductors" TEXT[],
ADD COLUMN     "details" TEXT NOT NULL;

-- DropTable
DROP TABLE "_workshops-attended";

-- DropTable
DROP TABLE "_workshops-conducted";
