/*
  Warnings:

  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostHolders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Members";

-- DropTable
DROP TABLE "PostHolders";

-- CreateTable
CREATE TABLE "GDriveGallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GDriveGallery_pkey" PRIMARY KEY ("id")
);
