import TmpAttUi from "@/components/testing/tmp_/meeting_att";
import prisma from "@/lib/PrismaClient/db";
import React from "react";
export async function page() {
  let meets;
  try {
    meets = await prisma.meeting.findMany({
      select: {
        meeting_id: true,
      },
    });
  } catch (err) {
    return <>Cant fetch meetings</>;
  }
  
  return (
    <div className="flex h-screen bg-black text-white justify-center items-center">
      <div className="flex flex-col gap-3 justify-between h-[400px]">
        <h1 className="text-2xl">Attendance</h1>
        <TmpAttUi meets = {meets}></TmpAttUi>
      </div>
    </div>
  );
}

export default page;
