/*
  Warnings:

  - You are about to drop the `Workshop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Workshop";

-- CreateTable
CREATE TABLE "Team" (
    "team_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "team_leader_id" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "Pending_requests" (
    "request_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "request_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pending_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Competitions" (
    "competition_id" TEXT NOT NULL,
    "competition_name" TEXT NOT NULL,
    "conductedOn" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "prize" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "Competitions_pkey" PRIMARY KEY ("competition_id")
);

-- CreateTable
CREATE TABLE "_team-member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_team-member_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_participant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_participant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_team-member_B_index" ON "_team-member"("B");

-- CreateIndex
CREATE INDEX "_participant_B_index" ON "_participant"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_team_leader_id_fkey" FOREIGN KEY ("team_leader_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pending_requests" ADD CONSTRAINT "Pending_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pending_requests" ADD CONSTRAINT "Pending_requests_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_team-member" ADD CONSTRAINT "_team-member_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_team-member" ADD CONSTRAINT "_team-member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participant" ADD CONSTRAINT "_participant_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participant" ADD CONSTRAINT "_participant_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;
