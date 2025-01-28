/*
  Warnings:

  - You are about to drop the column `competition_name` on the `Competitions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[competitionName]` on the table `Competitions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[team_name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionName` to the `Competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conductedBy` to the `Competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_team_size` to the `Competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_team_size` to the `Competitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competitions" DROP COLUMN "competition_name",
ADD COLUMN     "competitionName" TEXT NOT NULL,
ADD COLUMN     "conductedBy" TEXT NOT NULL,
ADD COLUMN     "max_team_size" INTEGER NOT NULL,
ADD COLUMN     "min_team_size" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Competitions_competitionName_key" ON "Competitions"("competitionName");

-- CreateIndex
CREATE UNIQUE INDEX "Team_team_name_key" ON "Team"("team_name");
