/*
  Warnings:

  - The values [InCharge] on the enum `position_options` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "branch_options" ADD VALUE 'PIE';
ALTER TYPE "branch_options" ADD VALUE 'VLSI';
ALTER TYPE "branch_options" ADD VALUE 'RA';
ALTER TYPE "branch_options" ADD VALUE 'SET';

-- AlterEnum
BEGIN;
CREATE TYPE "position_options_new" AS ENUM ('Member', 'President', 'VicePresident', 'Secretary', 'Coordinator', 'Executive_Head', 'Website_Developer');
ALTER TABLE "User" ALTER COLUMN "position" TYPE "position_options_new" USING ("position"::text::"position_options_new");
ALTER TYPE "position_options" RENAME TO "position_options_old";
ALTER TYPE "position_options_new" RENAME TO "position_options";
DROP TYPE "position_options_old";
COMMIT;
