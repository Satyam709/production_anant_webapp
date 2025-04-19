-- CreateTable
CREATE TABLE "DepartmentAchievements" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "description" TEXT,
    "imageURL" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DepartmentAchievements_pkey" PRIMARY KEY ("id")
);
