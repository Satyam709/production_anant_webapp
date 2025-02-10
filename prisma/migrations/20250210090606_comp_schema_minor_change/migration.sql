/*
  Warnings:

  - You are about to drop the `_participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_participant" DROP CONSTRAINT "_participant_A_fkey";

-- DropForeignKey
ALTER TABLE "_participant" DROP CONSTRAINT "_participant_B_fkey";

-- DropTable
DROP TABLE "_participant";

-- CreateTable
CREATE TABLE "_participant_team" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_participant_team_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_participant_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_participant_member_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_participant_team_B_index" ON "_participant_team"("B");

-- CreateIndex
CREATE INDEX "_participant_member_B_index" ON "_participant_member"("B");

-- AddForeignKey
ALTER TABLE "_participant_team" ADD CONSTRAINT "_participant_team_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participant_team" ADD CONSTRAINT "_participant_team_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participant_member" ADD CONSTRAINT "_participant_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participant_member" ADD CONSTRAINT "_participant_member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
