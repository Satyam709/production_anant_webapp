-- CreateEnum
CREATE TYPE "InternshipDepartment" AS ENUM ('Mathematics');

-- CreateEnum
CREATE TYPE "InternshipClass" AS ENUM ('MSc', 'BtechMNC');

-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT,
    "department" "InternshipDepartment" NOT NULL,
    "class" "InternshipClass" NOT NULL,
    "company_name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
