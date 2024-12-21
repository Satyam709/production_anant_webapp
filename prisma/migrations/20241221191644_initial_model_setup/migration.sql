-- CreateEnum
CREATE TYPE "branch_options" AS ENUM ('AIML', 'MNC', 'MSC', 'CSE', 'IT');

-- CreateEnum
CREATE TYPE "position_options" AS ENUM ('Member', 'Coordinator', 'Secretary', 'InCharge', 'President');

-- CreateEnum
CREATE TYPE "club_dept_options" AS ENUM ('General', 'Tech', 'PR');

-- CreateEnum
CREATE TYPE "notice_cat" AS ENUM ('General', 'Technical', 'Sponsorship');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "roll_number" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "branch" "branch_options" NOT NULL,
    "batch" TEXT,
    "position" "position_options",
    "club_dept" "club_dept_options"[],
    "joined" TIMESTAMP(3) NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "notice_id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "postedOn" TIMESTAMP(3) NOT NULL,
    "category" "notice_cat" NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("notice_id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "meeting_id" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "starts" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "topic_of_discussion" TEXT,
    "hostID" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("meeting_id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "workshop_id" TEXT NOT NULL,
    "guests" TEXT[],
    "dates" TIMESTAMP(3)[],
    "fee" INTEGER,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("workshop_id")
);

-- CreateTable
CREATE TABLE "_workshops-conducted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_workshops-conducted_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_workshops-attended" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_workshops-attended_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_meeting-attended" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_meeting-attended_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_roll_number_key" ON "User"("roll_number");

-- CreateIndex
CREATE INDEX "_workshops-conducted_B_index" ON "_workshops-conducted"("B");

-- CreateIndex
CREATE INDEX "_workshops-attended_B_index" ON "_workshops-attended"("B");

-- CreateIndex
CREATE INDEX "_meeting-attended_B_index" ON "_meeting-attended"("B");

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_hostID_fkey" FOREIGN KEY ("hostID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_workshops-conducted" ADD CONSTRAINT "_workshops-conducted_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_workshops-conducted" ADD CONSTRAINT "_workshops-conducted_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("workshop_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_workshops-attended" ADD CONSTRAINT "_workshops-attended_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_workshops-attended" ADD CONSTRAINT "_workshops-attended_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("workshop_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_meeting-attended" ADD CONSTRAINT "_meeting-attended_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("meeting_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_meeting-attended" ADD CONSTRAINT "_meeting-attended_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
