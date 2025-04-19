-- CreateEnum
CREATE TYPE "blog_cat" AS ENUM ('Mathematics', 'Trading', 'Ancient_Mathematics', 'Algebra', 'Probabilty_and_Games', 'Application_Of_Differential_Equations', 'Mathematics_in_Nature', 'Others');

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "blog_cat" NOT NULL,
    "cover_picture" TEXT,
    "body" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
