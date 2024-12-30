"use server"
import { getServerSession } from "next-auth";
import authOptions from "../NextAuth/authOptions";

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    console.error("unauthenticated!!");
  }
  return session;
}

export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }
  return true;
}