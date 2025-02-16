"use server";
import qr from "qrcode";
import { encodeMeetingattendance } from "@/lib/actions/AttendenceJwt";

import { attendanceData } from "@/types/meet_data";
import prisma from "../PrismaClient/db";

export default async function generateQr(meetingId: string, duration: number) {
  const data: attendanceData = {
    meeting_id: meetingId,
    duration: duration,
    generated_time: new Date().toISOString(),
  };
  let token: string;
  try {
    const isExist = await prisma.meeting.findUnique({
      where: {
        meeting_id: meetingId,
      },
    });
    if (!isExist) {
      throw new Error("meeting not exist");
    }

    token = await encodeMeetingattendance(data);

    // console.log("token for qr -> ",token);
    const siteurl = process.env.SiteURL || "http://localhost:3000";
    const apiUrl = siteurl + "/api/meetings/attend?token=" + token;
    return qr.toDataURL(apiUrl);
  } catch (err) {
    console.log("error while token generation !", err);
  }
}
