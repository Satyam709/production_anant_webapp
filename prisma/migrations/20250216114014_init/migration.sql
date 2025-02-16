-- CreateTable
CREATE TABLE "_event_participant_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_event_participant_member_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_event_participant_member_B_index" ON "_event_participant_member"("B");

-- AddForeignKey
ALTER TABLE "_event_participant_member" ADD CONSTRAINT "_event_participant_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_event_participant_member" ADD CONSTRAINT "_event_participant_member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
