-- AlterEnum
ALTER TYPE "club_dept_options" ADD VALUE 'Sponsorship';

-- CreateTable
CREATE TABLE "AnantTeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "roll_number" INTEGER,
    "year" TEXT,
    "club_dept" "club_dept_options"[],
    "role" TEXT,
    "position" "position_options",
    "description" TEXT,
    "imageURL" TEXT,
    "linkedIn" TEXT,
    "github" TEXT,
    "instagram" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "branch" "branch_options",
    "batch" TEXT,
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnantTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnantTeamMember_id_key" ON "AnantTeamMember"("id");
