-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_first_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_second_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "Competitions" DROP CONSTRAINT "Competitions_third_prize_id_fkey";

-- AlterTable
ALTER TABLE "Competitions" ALTER COLUMN "prize" DROP NOT NULL,
ALTER COLUMN "first_prize_id" DROP NOT NULL,
ALTER COLUMN "second_prize_id" DROP NOT NULL,
ALTER COLUMN "third_prize_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedIn" TEXT;

-- CreateTable
CREATE TABLE "Events" (
    "event_id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "conductedBy" TEXT NOT NULL,
    "conductedOn" TIMESTAMP(3) NOT NULL,
    "registration_deadline" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prize" TEXT,
    "imageURL" TEXT,
    "creator_id" TEXT NOT NULL,
    "first_prize_id" TEXT,
    "second_prize_id" TEXT,
    "third_prize_id" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_eventName_key" ON "Events"("eventName");

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_first_prize_id_fkey" FOREIGN KEY ("first_prize_id") REFERENCES "Team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_second_prize_id_fkey" FOREIGN KEY ("second_prize_id") REFERENCES "Team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitions" ADD CONSTRAINT "Competitions_third_prize_id_fkey" FOREIGN KEY ("third_prize_id") REFERENCES "Team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_first_prize_id_fkey" FOREIGN KEY ("first_prize_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_second_prize_id_fkey" FOREIGN KEY ("second_prize_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_third_prize_id_fkey" FOREIGN KEY ("third_prize_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
