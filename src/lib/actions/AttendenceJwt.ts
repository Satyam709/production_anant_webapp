"use server";
import { attendanceData } from "@/types/meet_data";
import jwt from "jsonwebtoken";

export async function decodeAttendanceJwt(token: string) {
  const secret = process.env.AttendenceSecret;
  if (!secret) {
    throw new Error("cannot load secret to decode jwt");
  }
  const decoded = jwt.verify(token, secret);
  if (!decoded) {
    throw new Error("failed to verify!");
  }
  return decoded;
}

export async function encodeMeetingattendance(data: object) {
  const secret = process.env.AttendenceSecret;

  if (!secret) {
    throw new Error("cannot load secret to encode jwt");
  }
  try {
    const token = jwt.sign(data, secret);
    return token;
  } catch (err) {
    throw err;
  }
}
