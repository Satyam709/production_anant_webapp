/*
  Warnings:

  - You are about to drop the `AnantTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnantTeam" DROP CONSTRAINT "AnantTeam_userID_fkey";

-- DropTable
DROP TABLE "AnantTeam";

-- CreateTable
CREATE TABLE "AnantTeamMember" (
    "id" TEXT NOT NULL,
    "year" TEXT,
    "position" TEXT,
    "club_dept" "club_dept_options"[],
    "role" TEXT,
    "description" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "AnantTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnantTeamMember_id_key" ON "AnantTeamMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AnantTeamMember_userID_key" ON "AnantTeamMember"("userID");

-- AddForeignKey
ALTER TABLE "AnantTeamMember" ADD CONSTRAINT "AnantTeamMember_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
