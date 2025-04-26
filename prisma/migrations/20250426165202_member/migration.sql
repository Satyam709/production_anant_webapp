-- AlterTable
ALTER TABLE "PostHolders" ADD COLUMN     "batch" TEXT,
ADD COLUMN     "branch" "branch_options",
ADD COLUMN     "club_dept" "club_dept_options"[];
