-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_first_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_second_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_third_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "_participant" DROP CONSTRAINT "_participant_B_fkey";

-- CreateTable
CREATE TABLE "_first_prize_comp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_first_prize_comp_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_second_prize_comp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_second_prize_comp_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_third_prize_comp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_third_prize_comp_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_first_prize_comp_B_index" ON "_first_prize_comp"("B");

-- CreateIndex
CREATE INDEX "_second_prize_comp_B_index" ON "_second_prize_comp"("B");

-- CreateIndex
CREATE INDEX "_third_prize_comp_B_index" ON "_third_prize_comp"("B");

-- AddForeignKey
ALTER TABLE "_participant" ADD CONSTRAINT "_participant_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_first_prize_comp" ADD CONSTRAINT "_first_prize_comp_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_first_prize_comp" ADD CONSTRAINT "_first_prize_comp_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_second_prize_comp" ADD CONSTRAINT "_second_prize_comp_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_second_prize_comp" ADD CONSTRAINT "_second_prize_comp_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_third_prize_comp" ADD CONSTRAINT "_third_prize_comp_A_fkey" FOREIGN KEY ("A") REFERENCES "Competitions"("competition_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_third_prize_comp" ADD CONSTRAINT "_third_prize_comp_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
