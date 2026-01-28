-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "branch_options" ADD VALUE 'MSCMath';
ALTER TYPE "branch_options" ADD VALUE 'MSCPhy';
ALTER TYPE "branch_options" ADD VALUE 'MSCChem';
ALTER TYPE "branch_options" ADD VALUE 'AD';
ALTER TYPE "branch_options" ADD VALUE 'BArch';
