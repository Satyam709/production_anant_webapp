'use server';
import jwt from 'jsonwebtoken';

export async function decodeAttendanceJwt(token: string) {
  const secret = process.env.AttendenceSecret || 'itsasecret';
  if (!secret) {
    throw new Error('cannot load secret to decode jwt');
  }
  const decoded = jwt.verify(token, secret);
  if (!decoded) {
    throw new Error('failed to verify!');
  }
  return decoded;
}

export async function encodeMeetingattendance(data: object) {
  // to be removed
  const secret = process.env.AttendenceSecret || 'itsasecret';

  if (!secret) {
    throw new Error('cannot load secret to encode jwt');
  }
  try {
    const token = jwt.sign(data, secret);
    return token;
  } catch (err) {
    throw err;
  }
}
