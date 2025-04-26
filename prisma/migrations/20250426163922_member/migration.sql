-- CreateTable
CREATE TABLE "Members" (
    "roll_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PostHolders" (
    "roll_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_roll_number_key" ON "Members"("roll_number");

-- CreateIndex
CREATE UNIQUE INDEX "PostHolders_roll_number_key" ON "PostHolders"("roll_number");
