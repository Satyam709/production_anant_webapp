-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "issuesFor" TEXT NOT NULL,
    "issuedTo" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "roll_number" TEXT,
    "branch" TEXT,
    "ranking" INTEGER,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);
