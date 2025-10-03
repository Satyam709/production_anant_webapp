-- AlterEnum
ALTER TYPE "club_dept_options" ADD VALUE 'Sponsorship';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "AnantTeam" (
    "id" TEXT NOT NULL,
    "year" TEXT,
    "position" TEXT,
    "club_dept" "club_dept_options"[],
    "role" TEXT,
    "description" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "AnantTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnantTeam_id_key" ON "AnantTeam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AnantTeam_userID_key" ON "AnantTeam"("userID");

-- AddForeignKey
ALTER TABLE "AnantTeam" ADD CONSTRAINT "AnantTeam_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
